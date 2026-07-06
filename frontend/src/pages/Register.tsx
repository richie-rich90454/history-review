import { A, useNavigate } from "@solidjs/router";
import { createSignal, Show, type JSX } from "solid-js";
import { useAuthContext } from "../contexts/AuthContext";
import styles from "./Login.module.css";

export default function Register(): JSX.Element {
    const [email, setEmail] = createSignal("");
    const [password, setPassword] = createSignal("");
    const [confirmPassword, setConfirmPassword] = createSignal("");
    const [error, setError] = createSignal("");
    const [loading, setLoading] = createSignal(false);
    const { register } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async (e: SubmitEvent): Promise<void> => {
        e.preventDefault();
        setError("");
        if (password() !== confirmPassword()) {
            setError("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            await register(email(), password());
            navigate("/");
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            setError(message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div class={styles.authContainer}>
            <div class={styles.authCard}>
                <h2 class={styles.authTitle}>Create an Account</h2>
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
                    <div class="form-group">
                        <label for="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            class="form-control"
                            value={confirmPassword()}
                            onInput={(e) =>
                                setConfirmPassword(e.currentTarget.value)
                            }
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        class={`btn btn-primary ${styles.authSubmit}`}
                        disabled={loading()}
                    >
                        {loading() ? "Loading..." : "Register"}
                    </button>
                </form>
                <p class={styles.authFooter}>
                    Already have an account?{" "}
                    <A href="/login" class={styles.authLink}>
                        Login
                    </A>
                </p>
            </div>
        </div>
    );
}
