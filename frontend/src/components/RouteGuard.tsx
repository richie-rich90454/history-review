import { Show } from "solid-js";
import { Navigate } from "@solidjs/router";
import type { JSX } from "solid-js";
import { useAuthContext } from "../contexts/AuthContext";

interface RouteGuardProps {
    children: JSX.Element;
}

/**
 * RouteGuard provides declarative access-control policies for SolidJS routes.
 *
 * Each static method returns a `JSX.Element` that is fully reactive: it
 * re-evaluates when the auth signals (`user`, `isLoading`) change and
 * redirects via `<Navigate>` when access is denied.
 *
 * Usage:
 *   `<Route path="submit" component={() => RouteGuard.Protected({ children: <Submit /> })} />`
 */
export class RouteGuard {
    /**
     * Requires any authenticated user. While the auth state is loading,
     * renders nothing; once loaded, renders the children or redirects to
     * `/login` when there is no user.
     */
    static Protected(props: RouteGuardProps): JSX.Element {
        const { user, isLoading } = useAuthContext();
        return (
            <Show when={!isLoading()} fallback={null}>
                <Show when={user()} fallback={<Navigate href="/login" />}>
                    {props.children}
                </Show>
            </Show>
        );
    }

    /**
     * Requires an authenticated admin (`user.role === "admin"`). While the
     * auth state is loading, renders nothing; once loaded, renders the
     * children for admins or redirects to `/login` otherwise.
     */
    static AdminOnly(props: RouteGuardProps): JSX.Element {
        const { user, isLoading } = useAuthContext();
        return (
            <Show when={!isLoading()} fallback={null}>
                <Show
                    when={user() !== null && user()!.role === "admin"}
                    fallback={<Navigate href="/login" />}
                >
                    {props.children}
                </Show>
            </Show>
        );
    }
}
