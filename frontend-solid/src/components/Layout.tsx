import { A } from "@solidjs/router";
import type { RouteSectionProps } from "@solidjs/router";
import { Show } from "solid-js";
import type { JSX } from "solid-js";
import { useAuthContext } from "../contexts/AuthContext";
import styles from "./Layout.module.css";

export default function Layout(props: RouteSectionProps): JSX.Element {
    const { user, logout } = useAuthContext();

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
            <main class="container">{props.children}</main>
        </div>
    );
}
