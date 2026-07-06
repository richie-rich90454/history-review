import { createResource, createSignal, For, Show, type JSX } from "solid-js";
import { useApi, useEntity } from "../../contexts/ServicesContext";
import type { Course, Period } from "../../types";
import styles from "../../pages/Admin.module.css";

export default function PeriodsTab(): JSX.Element {
    const api = useApi();
    const periodService = useEntity<Period>("admin/periods");

    const [periods, { refetch }] = createResource(
        async (): Promise<Period[]> =>
            api.getKy().get("admin/periods/all").json<Period[]>(),
    );
    const [courses] = createResource(
        async (): Promise<Course[]> =>
            api.getKy().get("public/courses").json<Course[]>(),
    );

    const [title, setTitle] = createSignal("");
    const [startYear, setStartYear] = createSignal("");
    const [endYear, setEndYear] = createSignal("");
    const [overview, setOverview] = createSignal("");
    const [courseId, setCourseId] = createSignal("");
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal("");

    const handleSubmit = async (e: SubmitEvent): Promise<void> => {
        e.preventDefault();
        const parsedCourseId = parseInt(courseId());
        if (!courseId() || isNaN(parsedCourseId)) {
            setError("Please select a course");
            return;
        }
        setLoading(true);
        setError("");
        const payload: Record<string, unknown> = {
            title: title(),
            startYear: startYear() ? parseInt(startYear()) : null,
            endYear: endYear() ? parseInt(endYear()) : null,
            overview: overview(),
            courseId: parsedCourseId,
        };
        try {
            await periodService.create(payload as unknown as Partial<Period>);
            setTitle("");
            setStartYear("");
            setEndYear("");
            setOverview("");
            setCourseId("");
            refetch();
        } catch {
            setError("Failed to create period");
        }
        setLoading(false);
    };

    const handleDelete = async (id: number): Promise<void> => {
        if (!confirm("Delete this period?")) return;
        setError("");
        try {
            await periodService.remove(id);
            refetch();
        } catch {
            setError("Delete failed");
        }
    };

    return (
        <div>
            <div class={styles.adminCreateSection}>
                <h3>Create New Period</h3>
                <form onSubmit={handleSubmit} class={styles.createForm}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title()}
                        onInput={(e) => setTitle(e.currentTarget.value)}
                        required
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
                    <textarea
                        placeholder="Overview"
                        value={overview()}
                        onInput={(e) => setOverview(e.currentTarget.value)}
                    />
                    <select
                        value={courseId()}
                        onChange={(e) => setCourseId(e.currentTarget.value)}
                        required
                    >
                        <option value="">Select Course</option>
                        <For each={courses() ?? []}>
                            {(c) => <option value={c.id}>{c.name}</option>}
                        </For>
                    </select>
                    <button
                        type="submit"
                        class="btn btn-primary"
                        disabled={loading()}
                    >
                        Create Period
                    </button>
                </form>
            </div>
            <h3>Existing Periods</h3>
            <Show when={error()}>
                <div class="text-danger mb-4">{error()}</div>
            </Show>
            <Show when={periods()} fallback={<div>Loading...</div>}>
                <table class={styles.adminTable}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Years</th>
                            <th>Course ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <For each={periods()}>
                            {(p) => (
                                <tr>
                                    <td>{p.id}</td>
                                    <td>{p.title}</td>
                                    <td>
                                        {p.startYear}–{p.endYear}
                                    </td>
                                    <td>{p.course?.id}</td>
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
