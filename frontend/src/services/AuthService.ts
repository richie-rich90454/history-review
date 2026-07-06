import type { ApiService } from "./ApiService";

export interface AuthUser {
    email: string;
    role: string;
}

interface JwtPayload {
    sub: string;
    role: string;
}

interface AuthResponseBody {
    token: string;
}

/**
 * AuthService handles login/register/logout and derives user info from the
 * JWT payload.
 *
 * Token storage policy: the token is persisted exclusively through
 * {@link ApiService.setToken} / {@link ApiService.getToken} so that the ky
 * beforeRequest hook and AuthService stay in sync via a single source of
 * truth (localStorage key "token").
 */
export class AuthService {
    private readonly api: ApiService;

    constructor(api: ApiService) {
        this.api = api;
    }

    async login(email: string, password: string): Promise<AuthUser> {
        const response = await this.api
            .getKy()
            .post("auth/login", { json: { email, password } })
            .json<AuthResponseBody>();
        this.api.setToken(response.token);
        return this.userFromToken(response.token);
    }

    async register(email: string, password: string): Promise<AuthUser> {
        const response = await this.api
            .getKy()
            .post("auth/register", { json: { email, password } })
            .json<AuthResponseBody>();
        this.api.setToken(response.token);
        return this.userFromToken(response.token);
    }

    logout(): void {
        this.api.setToken(null);
    }

    /** Returns the current user derived from the stored JWT, or `null`. */
    getCurrentUser(): AuthUser | null {
        const token = this.api.getToken();
        if (!token) {
            return null;
        }
        try {
            return this.userFromToken(token);
        } catch {
            // Malformed/expired token — treat as logged out.
            this.api.setToken(null);
            return null;
        }
    }

    /** Decodes the JWT payload (middle segment) without verifying signature. */
    decodeJwt(token: string): JwtPayload {
        return JSON.parse(atob(token.split(".")[1])) as JwtPayload;
    }

    private userFromToken(token: string): AuthUser {
        const payload = this.decodeJwt(token);
        return { email: payload.sub, role: payload.role };
    }
}
