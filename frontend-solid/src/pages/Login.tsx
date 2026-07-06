import { A, useNavigate } from "@solidjs/router";
import { createSignal, Show, type JSX } from "solid-js";
import { useAuthContext } from "../contexts/AuthContext";
import styles from "./Login.module.css";

export default function Login(): JSX.Element {
    const [email, setEmail] = createSignal("");
    const [password, setPassword] = createSignal("");
    const [error, setError] = createSignal("");
    const [loading, setLoading] = createSignal(false);
    const { login } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async (e: SubmitEvent): Promise<void> => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(email(), password());
            navigate("/");
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            setError(message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div class={styles.authContainer}>
            <div class={styles.authCard}>
                <h2 class={styles.authTitle}>Login to AP History</h2>
                <Show when={error()}>
                    <div class={styles.errorAlert}>{error()}</div>
                </Show>
                <form onSubmit={handleSubmit}>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            class="form-control"
                            value={email()}
                            onInput={(e) => setEmail(e.currentTarget.value)}
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            class="form-control"
                            value={password()}
                            onInput={(e) =>
                                setPassword(e.currentTarget.value)
                            }
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        class={`btn btn-primary ${styles.authSubmit}`}
                        disabled={loading()}
                    >
                        {loading() ? "Loading..." : "Login"}
                    </button>
                </form>
                <p class={styles.authFooter}>
                    Don't have an account?{" "}
                    <A href="/register" class={styles.authLink}>
                        Register
                    </A>
                </p>
            </div>
        </div>
    );
}
