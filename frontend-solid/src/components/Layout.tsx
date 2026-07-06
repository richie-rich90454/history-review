import { A, useLocation } from "@solidjs/router";
import type { RouteSectionProps } from "@solidjs/router";
import { createEffect, Show, type JSX } from "solid-js";
import { useAuthContext } from "../contexts/AuthContext";
import { useAnimation } from "../contexts/ServicesContext";
import styles from "./Layout.module.css";

export default function Layout(props: RouteSectionProps): JSX.Element {
    const { user, logout } = useAuthContext();
    const animation = useAnimation();
    const location = useLocation();
    let mainRef: HTMLElement | undefined;

    // Replay the page-enter animation whenever the route changes.
    createEffect(() => {
        location.pathname;
        if (mainRef) animation.pageTransition(mainRef);
    });

    return (
        <div class={styles.app}>
            <nav class={styles.navbar}>
                <div class={`container ${styles.navbarContent}`}>
                    <A href="/" class={styles.navbarBrand} end>
                        History Review
                    </A>
                    <div class={styles.navbarLinks}>
                        <Show
                            when={user()}
                            fallback={
                                <>
                                    <A
                                        href="/login"
                                        class={styles.navbarLink}
                                        end
                                    >
                                        Login
                                    </A>
                                    <A
                                        href="/register"
                                        class={styles.navbarLink}
                                        end
                                    >
                                        Register
                                    </A>
                                </>
                            }
                        >
                            <span class={styles.navbarUser}>
                                Welcome, {user()!.email}
                            </span>
                            <A href="/submit" class={styles.navbarLink} end>
                                Submit
                            </A>
                            <Show when={user()!.role === "admin"}>
                                <A href="/admin" class={styles.navbarLink} end>
                                    Admin
                                </A>
                                <A
                                    href="/admin/approvals"
                                    class={styles.navbarLink}
                                    end
                                >
                                    Approvals
                                </A>
                            </Show>
                            <button
                                onClick={logout}
                                class={styles.navbarLink}
                            >
                                Logout
                            </button>
                        </Show>
                    </div>
                </div>
            </nav>
            <main class="container" ref={mainRef}>
                {props.children}
            </main>
        </div>
    );
}
