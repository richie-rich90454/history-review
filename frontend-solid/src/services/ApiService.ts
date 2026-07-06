import ky, { type KyInstance } from "ky";

const TOKEN_KEY = "token";

/**
 * ApiService wraps a `ky` instance and centralizes JWT handling:
 *  - injects `Authorization: Bearer <token>` on every request
 *  - on a 401 response, clears the token and redirects to `/login`
 *
 * Other services (EntityService, AuthService) build on top of the exposed
 * ky instance and use {@link getToken}/{@link setToken} for token state.
 */
export class ApiService {
    private readonly kyInstance: KyInstance;

    constructor() {
        this.kyInstance = ky.create({
            // ky 2.0.2 exposes the URL prefix as `prefix` (there is no
            // `prefixUrl` option in this version — that name belonged to older
            // ky releases). An empty prefix leaves request URLs untouched.
            prefix: import.meta.env.VITE_API_BASE_URL || "",
            hooks: {
                beforeRequest: [
                    ({ request }) => {
                        const token = this.getToken();
                        if (token) {
                            request.headers.set(
                                "Authorization",
                                `Bearer ${token}`,
                            );
                        }
                    },
                ],
                afterResponse: [
                    ({ response }) => {
                        if (response.status === 401) {
                            this.setToken(null);
                            window.location.href = "/login";
                        }
                        return response;
                    },
                ],
            },
        });
    }

    /** The underlying ky instance, for use by EntityService / AuthService. */
    public getKy(): KyInstance {
        return this.kyInstance;
    }

    public getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    }

    /** Stores the token; pass `null` to clear it (used by AuthService.logout). */
    public setToken(token: string | null): void {
        if (token === null) {
            localStorage.removeItem(TOKEN_KEY);
        } else {
            localStorage.setItem(TOKEN_KEY, token);
        }
    }
}
