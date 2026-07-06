import { createResource, createSignal, For, Show, type JSX } from "solid-js";
import { useApi } from "../../contexts/ServicesContext";
import type { Civilization, Evidence, Theme } from "../../types";
import styles from "../../pages/Admin.module.css";

export default function EvidenceTab(): JSX.Element {
    const api = useApi();
    const ky = api.getKy();

    const [evidence, { refetch }] = createResource(
        async (): Promise<Evidence[]> =>
            ky.get("admin/evidence/all").json<Evidence[]>(),
    );
    const [civilizations] = createResource(
        async (): Promise<Civilization[]> =>
            ky.get("admin/civilizations/all").json<Civilization[]>(),
    );
    const [themes] = createResource(
        async (): Promise<Theme[]> =>
            ky.get("public/themes").json<Theme[]>(),
    );

    const [title, setTitle] = createSignal("");
    const [description, setDescription] = createSignal("");
    const [type, setType] = createSignal("");
    const [source, setSource] = createSignal("");
    const [significance, setSignificance] = createSignal("");
    const [civilizationId, setCivilizationId] = createSignal("");
    const [themeId, setThemeId] = createSignal("");
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal("");

    const handleSubmit = async (e: SubmitEvent): Promise<void> => {
        e.preventDefault();
        const parsedCivId = parseInt(civilizationId());
        const parsedThemeId = parseInt(themeId());
        if (
            !civilizationId() ||
            isNaN(parsedCivId) ||
            !themeId() ||
            isNaN(parsedThemeId)
        ) {
            setError("Please select civilization and theme");
            return;
        }
        setLoading(true);
        setError("");
        const payload = {
            title: title(),
            description: description(),
            type: type(),
            source: source(),
            significance: significance(),
            civilizationId: parsedCivId,
            themeId: parsedThemeId,
        };
        try {
            await ky.post("evidence/admin", { json: payload });
            setTitle("");
            setDescription("");
            setType("");
            setSource("");
            setSignificance("");
            setCivilizationId("");
            setThemeId("");
            refetch();
        } catch {
            setError("Failed to create evidence");
        }
        setLoading(false);
    };

    const handleDelete = async (id: number): Promise<void> => {
        if (!confirm("Delete this evidence?")) return;
        setError("");
        try {
            await ky.delete(`admin/evidence/${id}`);
            refetch();
        } catch {
            setError("Delete failed");
        }
    };

    return (
        <div>
            <div class={styles.adminCreateSection}>
                <h3>Create New Evidence</h3>
                <form onSubmit={handleSubmit} class={styles.createForm}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title()}
                        onInput={(e) => setTitle(e.currentTarget.value)}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={description()}
                        onInput={(e) => setDescription(e.currentTarget.value)}
                    />
                    <input
                        type="text"
                        placeholder="Type (e.g., LEQ)"
                        value={type()}
                        onInput={(e) => setType(e.currentTarget.value)}
                    />
                    <input
                        type="text"
                        placeholder="Source"
                        value={source()}
                        onInput={(e) => setSource(e.currentTarget.value)}
                    />
                    <input
                        type="text"
                        placeholder="Significance"
                        value={significance()}
                        onInput={(e) => setSignificance(e.currentTarget.value)}
                    />
                    <select
                        value={civilizationId()}
                        onChange={(e) => setCivilizationId(e.currentTarget.value)}
                        required
                    >
                        <option value="">Select Civilization</option>
                        <For each={civilizations() ?? []}>
                            {(c) => <option value={c.id}>{c.name}</option>}
                        </For>
                    </select>
                    <select
                        value={themeId()}
                        onChange={(e) => setThemeId(e.currentTarget.value)}
                        required
                    >
                        <option value="">Select Theme</option>
                        <For each={themes() ?? []}>
                            {(t) => <option value={t.id}>{t.name}</option>}
                        </For>
                    </select>
                    <button
                        type="submit"
                        class="btn btn-primary"
                        disabled={loading()}
                    >
                        Create Evidence
                    </button>
                </form>
            </div>
            <h3>Existing Evidence</h3>
            <Show when={error()}>
                <div class="text-danger mb-4">{error()}</div>
            </Show>
            <Show when={evidence()} fallback={<div>Loading...</div>}>
                <table class={styles.adminTable}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Theme ID</th>
                            <th>Civilization ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <For each={evidence()}>
                            {(e) => (
                                <tr>
                                    <td>{e.id}</td>
                                    <td>{e.title}</td>
                                    <td>{e.type}</td>
                                    <td>{e.theme?.id}</td>
                                    <td>{e.civilization?.id}</td>
                                    <td>
                                        <button
                                            class={`btn btn-danger ${styles.tableDeleteBtn}`}
                                            onClick={() => handleDelete(e.id)}
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
