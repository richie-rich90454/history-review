import { createResource, createSignal, For, Show, type JSX } from "solid-js";
import { useApi, useEntity } from "../../contexts/ServicesContext";
import type { Theme } from "../../types";
import styles from "../../pages/Admin.module.css";

export default function ThemesTab(): JSX.Element {
    const api = useApi();
    const themeService = useEntity<Theme>("admin/themes");

    const [themes, { refetch }] = createResource(
        async (): Promise<Theme[]> =>
            api.getKy().get("public/themes").json<Theme[]>(),
    );

    const [name, setName] = createSignal("");
    const [description, setDescription] = createSignal("");
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal("");

    const handleSubmit = async (e: SubmitEvent): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const payload = {
            name: name(),
            description: description(),
        };
        try {
            await themeService.create(payload as unknown as Partial<Theme>);
            setName("");
            setDescription("");
            refetch();
        } catch {
            setError("Failed to create theme");
        }
        setLoading(false);
    };

    const handleDelete = async (id: number): Promise<void> => {
        if (!confirm("Delete this theme?")) return;
        setError("");
        try {
            await themeService.remove(id);
            refetch();
        } catch {
            setError("Delete failed");
        }
    };

    return (
        <div>
            <div class={styles.adminCreateSection}>
                <h3>Create New Theme</h3>
                <form onSubmit={handleSubmit} class={styles.createForm}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name()}
                        onInput={(e) => setName(e.currentTarget.value)}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={description()}
                        onInput={(e) => setDescription(e.currentTarget.value)}
                    />
                    <button
                        type="submit"
                        class="btn btn-primary"
                        disabled={loading()}
                    >
                        Create Theme
                    </button>
                </form>
            </div>
            <h3>Existing Themes</h3>
            <Show when={error()}>
                <div class="text-danger mb-4">{error()}</div>
            </Show>
            <Show when={themes()} fallback={<div>Loading...</div>}>
                <table class={styles.adminTable}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <For each={themes()}>
                            {(t) => (
                                <tr>
                                    <td>{t.id}</td>
                                    <td>{t.name}</td>
                                    <td>{t.description}</td>
                                    <td>
                                        <button
                                            class={`btn btn-danger ${styles.tableDeleteBtn}`}
                                            onClick={() => handleDelete(t.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </For>
                    </tbody>
                </table>
            </Show>
        </div>
    );
}
