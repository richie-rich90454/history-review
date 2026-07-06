import { createContext, createSignal, onMount, useContext } from "solid-js";
import type { JSX } from "solid-js";
import { useAuth } from "./ServicesContext";
import type { AuthUser } from "../services/AuthService";

interface AuthContextValue {
    user: () => AuthUser | null;
    isLoading: () => boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue>();

/**
 * AuthProvider bridges the reactive SolidJS layer with the AuthService
 * singleton from ServicesContext. It exposes the current user as a signal
 * so components (Layout, RouteGuard) can react to login/logout changes.
 *
 * On mount it derives the user from the stored JWT via
 * {@link AuthService.getCurrentUser}; login/register/logout delegate to the
 * AuthService and update the local signal.
 */
export function AuthProvider(props: { children: JSX.Element }): JSX.Element {
    const authService = useAuth();
    const [user, setUser] = createSignal<AuthUser | null>(null);
    const [isLoading, setIsLoading] = createSignal(true);

    onMount(() => {
        setUser(authService.getCurrentUser());
        setIsLoading(false);
    });

    const login = async (email: string, password: string): Promise<void> => {
        const authUser = await authService.login(email, password);
        setUser(authUser);
    };

    const register = async (
        email: string,
        password: string,
    ): Promise<void> => {
        const authUser = await authService.register(email, password);
        setUser(authUser);
    };

    const logout = (): void => {
        authService.logout();
        setUser(null);
    };

    const value: AuthContextValue = {
        user,
        isLoading,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}

export function useAuthContext(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return ctx;
}
