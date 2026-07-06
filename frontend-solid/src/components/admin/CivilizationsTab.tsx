import { createResource, createSignal, For, Show, type JSX } from "solid-js";
import { useApi, useEntity } from "../../contexts/ServicesContext";
import type { Civilization, Period } from "../../types";
import styles from "../../pages/Admin.module.css";

export default function CivilizationsTab(): JSX.Element {
    const api = useApi();
    const civService = useEntity<Civilization>("admin/civilizations");

    const [civilizations, { refetch }] = createResource(
        async (): Promise<Civilization[]> =>
            api.getKy().get("admin/civilizations/all").json<Civilization[]>(),
    );
    const [periods] = createResource(
        async (): Promise<Period[]> =>
            api.getKy().get("admin/periods/all").json<Period[]>(),
    );

    const [name, setName] = createSignal("");
    const [overview, setOverview] = createSignal("");
    const [startYear, setStartYear] = createSignal("");
    const [endYear, setEndYear] = createSignal("");
    const [periodId, setPeriodId] = createSignal("");
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal("");

    const handleSubmit = async (e: SubmitEvent): Promise<void> => {
        e.preventDefault();
        const parsedPeriodId = parseInt(periodId());
        if (!periodId() || isNaN(parsedPeriodId)) {
            setError("Please select a period");
            return;
        }
        setLoading(true);
        setError("");
        const payload: Record<string, unknown> = {
            name: name(),
            overview: overview(),
            startYear: startYear() ? parseInt(startYear()) : null,
            endYear: endYear() ? parseInt(endYear()) : null,
            periodId: parsedPeriodId,
        };
        try {
            await civService.create(payload as unknown as Partial<Civilization>);
            setName("");
            setOverview("");
            setStartYear("");
            setEndYear("");
            setPeriodId("");
            refetch();
        } catch {
            setError("Failed to create civilization");
        }
        setLoading(false);
    };

    const handleDelete = async (id: number): Promise<void> => {
        if (!confirm("Delete this civilization?")) return;
        setError("");
        try {
            await civService.remove(id);
            refetch();
        } catch {
            setError("Delete failed");
        }
    };

    return (
        <div>
            <div class={styles.adminCreateSection}>
                <h3>Create New Civilization</h3>
                <form onSubmit={handleSubmit} class={styles.createForm}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name()}
                        onInput={(e) => setName(e.currentTarget.value)}
                        required
                    />
                    <textarea
                        placeholder="Overview"
                        value={overview()}
                        onInput={(e) => setOverview(e.currentTarget.value)}
                    />
                    <input
                        type="number"
                        placeholder="Start Year"
                        value={startYear()}
                        onInput={(e) => setStartYear(e.currentTarget.value)}
                    />
                    <input
                        type="number"
                        placeholder="End Year"
                        value={endYear()}
                        onInput={(e) => setEndYear(e.currentTarget.value)}
                    />
                    <select
                        value={periodId()}
                        onChange={(e) => setPeriodId(e.currentTarget.value)}
                        required
                    >
                        <option value="">Select Period</option>
                        <For each={periods() ?? []}>
                            {(p) => <option value={p.id}>{p.title}</option>}
                        </For>
                    </select>
                    <button
                        type="submit"
                        class="btn btn-primary"
                        disabled={loading()}
                    >
                        Create Civilization
                    </button>
                </form>
            </div>
            <h3>Existing Civilizations</h3>
            <Show when={error()}>
                <div class="text-danger mb-4">{error()}</div>
            </Show>
            <Show when={civilizations()} fallback={<div>Loading...</div>}>
                <table class={styles.adminTable}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Years</th>
                            <th>Period ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <For each={civilizations()}>
                            {(c) => (
                                <tr>
                                    <td>{c.id}</td>
                                    <td>{c.name}</td>
                                    <td>
                                        {c.startYear}–{c.endYear}
                                    </td>
                                    <td>{c.period?.id}</td>
                                    <td>
                                        <button
                                            class={`btn btn-danger ${styles.tableDeleteBtn}`}
                                            onClick={() => handleDelete(c.id)}
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
