import { createResource, createSignal, For, Show, type JSX } from "solid-js";
import { useApi, useEntity } from "../../contexts/ServicesContext";
import type { Civilization, HistoricalEvent, Period } from "../../types";
import styles from "../../pages/Admin.module.css";

export default function EventsTab(): JSX.Element {
    const api = useApi();
    const eventService = useEntity<HistoricalEvent>("admin/events");

    const [events, { refetch }] = createResource(
        async (): Promise<HistoricalEvent[]> =>
            api.getKy().get("admin/events/all").json<HistoricalEvent[]>(),
    );
    const [periods] = createResource(
        async (): Promise<Period[]> =>
            api.getKy().get("admin/periods/all").json<Period[]>(),
    );
    const [civilizations] = createResource(
        async (): Promise<Civilization[]> =>
            api.getKy().get("admin/civilizations/all").json<Civilization[]>(),
    );

    const [name, setName] = createSignal("");
    const [year, setYear] = createSignal("");
    const [description, setDescription] = createSignal("");
    const [significance, setSignificance] = createSignal("");
    const [periodId, setPeriodId] = createSignal("");
    const [civilizationId, setCivilizationId] = createSignal("");
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal("");

    const handleSubmit = async (e: SubmitEvent): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const payload: Record<string, unknown> = {
            name: name(),
            year: year() ? parseInt(year()) : null,
            description: description(),
            significance: significance(),
        };
        if (periodId()) payload.periodId = parseInt(periodId());
        if (civilizationId()) payload.civilizationId = parseInt(civilizationId());
        try {
            await eventService.create(
                payload as unknown as Partial<HistoricalEvent>,
            );
            setName("");
            setYear("");
            setDescription("");
            setSignificance("");
            setPeriodId("");
            setCivilizationId("");
            refetch();
        } catch {
            setError("Failed to create event");
        }
        setLoading(false);
    };

    const handleDelete = async (id: number): Promise<void> => {
        if (!confirm("Delete this event?")) return;
        setError("");
        try {
            await eventService.remove(id);
            refetch();
        } catch {
            setError("Delete failed");
        }
    };

    return (
        <div>
            <div class={styles.adminCreateSection}>
                <h3>Create New Event</h3>
                <form onSubmit={handleSubmit} class={styles.createForm}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name()}
                        onInput={(e) => setName(e.currentTarget.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Year"
                        value={year()}
                        onInput={(e) => setYear(e.currentTarget.value)}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={description()}
                        onInput={(e) => setDescription(e.currentTarget.value)}
                    />
                    <input
                        type="text"
                        placeholder="Significance"
                        value={significance()}
                        onInput={(e) => setSignificance(e.currentTarget.value)}
                    />
                    <select
                        value={periodId()}
                        onChange={(e) => setPeriodId(e.currentTarget.value)}
                    >
                        <option value="">Select Period (optional)</option>
                        <For each={periods() ?? []}>
                            {(p) => <option value={p.id}>{p.title}</option>}
                        </For>
                    </select>
                    <select
                        value={civilizationId()}
                        onChange={(e) => setCivilizationId(e.currentTarget.value)}
                    >
                        <option value="">Select Civilization (optional)</option>
                        <For each={civilizations() ?? []}>
                            {(c) => <option value={c.id}>{c.name}</option>}
                        </For>
                    </select>
                    <button
                        type="submit"
                        class="btn btn-primary"
                        disabled={loading()}
                    >
                        Create Event
                    </button>
                </form>
            </div>
            <h3>Existing Events</h3>
            <Show when={error()}>
                <div class="text-danger mb-4">{error()}</div>
            </Show>
            <Show when={events()} fallback={<div>Loading...</div>}>
                <table class={styles.adminTable}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Year</th>
                            <th>Period/Civ</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <For each={events()}>
                            {(ev) => (
                                <tr>
                                    <td>{ev.id}</td>
                                    <td>{ev.name}</td>
                                    <td>{ev.year}</td>
                                    <td>
                                        {ev.period?.id ||
                                            ev.civilization?.id ||
                                            "—"}
                                    </td>
                                    <td>
                                        <button
                                            class={`btn btn-danger ${styles.tableDeleteBtn}`}
                                            onClick={() => handleDelete(ev.id)}
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
