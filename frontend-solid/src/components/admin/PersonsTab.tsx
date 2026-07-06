import { createResource, createSignal, For, Show, type JSX } from "solid-js";
import { useApi, useEntity } from "../../contexts/ServicesContext";
import type { Civilization, Person } from "../../types";
import styles from "../../pages/Admin.module.css";

export default function PersonsTab(): JSX.Element {
    const api = useApi();
    const personService = useEntity<Person>("admin/people");

    const [people, { refetch }] = createResource(
        async (): Promise<Person[]> =>
            api.getKy().get("admin/people/all").json<Person[]>(),
    );
    const [civilizations] = createResource(
        async (): Promise<Civilization[]> =>
            api.getKy().get("admin/civilizations/all").json<Civilization[]>(),
    );

    const [name, setName] = createSignal("");
    const [birthYear, setBirthYear] = createSignal("");
    const [deathYear, setDeathYear] = createSignal("");
    const [biography, setBiography] = createSignal("");
    const [civilizationId, setCivilizationId] = createSignal("");
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal("");

    const handleSubmit = async (e: SubmitEvent): Promise<void> => {
        e.preventDefault();
        const parsedCivId = parseInt(civilizationId());
        if (!civilizationId() || isNaN(parsedCivId)) {
            setError("Please select a civilization");
            return;
        }
        setLoading(true);
        setError("");
        const payload: Record<string, unknown> = {
            name: name(),
            birthYear: birthYear() ? parseInt(birthYear()) : null,
            deathYear: deathYear() ? parseInt(deathYear()) : null,
            biography: biography(),
            civilizationId: parsedCivId,
        };
        try {
            await personService.create(payload as unknown as Partial<Person>);
            setName("");
            setBirthYear("");
            setDeathYear("");
            setBiography("");
            setCivilizationId("");
            refetch();
        } catch {
            setError("Failed to create person");
        }
        setLoading(false);
    };

    const handleDelete = async (id: number): Promise<void> => {
        if (!confirm("Delete this person?")) return;
        setError("");
        try {
            await personService.remove(id);
            refetch();
        } catch {
            setError("Delete failed");
        }
    };

    return (
        <div>
            <div class={styles.adminCreateSection}>
                <h3>Create New Person</h3>
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
                        placeholder="Birth Year"
                        value={birthYear()}
                        onInput={(e) => setBirthYear(e.currentTarget.value)}
                    />
                    <input
                        type="number"
                        placeholder="Death Year"
                        value={deathYear()}
                        onInput={(e) => setDeathYear(e.currentTarget.value)}
                    />
                    <textarea
                        placeholder="Biography"
                        value={biography()}
                        onInput={(e) => setBiography(e.currentTarget.value)}
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
                    <button
                        type="submit"
                        class="btn btn-primary"
                        disabled={loading()}
                    >
                        Create Person
                    </button>
                </form>
            </div>
            <h3>Existing People</h3>
            <Show when={error()}>
                <div class="text-danger mb-4">{error()}</div>
            </Show>
            <Show when={people()} fallback={<div>Loading...</div>}>
                <table class={styles.adminTable}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Birth–Death</th>
                            <th>Civilization ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <For each={people()}>
                            {(p) => (
                                <tr>
                                    <td>{p.id}</td>
                                    <td>{p.name}</td>
                                    <td>
                                        {p.birthYear}–{p.deathYear}
                                    </td>
                                    <td>{p.civilization?.id}</td>
                                    <td>
                                        <button
                                            class={`btn btn-danger ${styles.tableDeleteBtn}`}
                                            onClick={() => handleDelete(p.id)}
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
