import { useNavigate } from "@solidjs/router";
import {
    createEffect,
    createSignal,
    For,
    onMount,
    Show,
    type JSX,
} from "solid-js";
import { useApi } from "../contexts/ServicesContext";
import styles from "./Submit.module.css";

interface Course {
    id: number;
    name: string;
}

interface Period {
    id: number;
    title: string;
}

interface Theme {
    id: number;
    name: string;
}

type ContentType = "civilization" | "event" | "evidence" | "person";

export default function Submit(): JSX.Element {
    const api = useApi();
    const navigate = useNavigate();

    const [courses, setCourses] = createSignal<Course[]>([]);
    const [periods, setPeriods] = createSignal<Period[]>([]);
    const [themes, setThemes] = createSignal<Theme[]>([]);
    const [selectedCourse, setSelectedCourse] = createSignal<number | "">("");
    const [selectedPeriod, setSelectedPeriod] = createSignal<number | "">("");
    const [contentType, setContentType] = createSignal<ContentType>(
        "civilization",
    );
    const [formData, setFormData] = createSignal<Record<string, any>>({});
    const [message, setMessage] = createSignal("");

    onMount(() => {
        api.getKy()
            .get("public/courses")
            .json<Course[]>()
            .then(setCourses);
        api.getKy()
            .get("public/themes")
            .json<Theme[]>()
            .then(setThemes);
    });

    createEffect(() => {
        const course = selectedCourse();
        if (course) {
            api.getKy()
                .get(`public/courses/${course}/periods`)
                .json<Period[]>()
                .then(setPeriods);
        } else {
            setPeriods([]);
        }
    });

    const updateField = (field: string, value: unknown): void => {
        setFormData({ ...formData(), [field]: value });
    };

    const handleSubmit = async (e: SubmitEvent): Promise<void> => {
        e.preventDefault();
        const data = formData();
        const payload: Record<string, any> = { ...data };
        if (selectedPeriod()) {
            payload.period = { id: selectedPeriod() };
        }
        if (contentType() === "evidence" && data.themeId) {
            payload.theme = { id: data.themeId };
        }
        try {
            let endpoint = "";
            const type = contentType();
            if (type === "civilization") endpoint = "admin/civilizations";
            else if (type === "event") endpoint = "admin/events";
            else if (type === "evidence") endpoint = "evidence/admin";
            else if (type === "person") endpoint = "admin/people";
            await api.getKy().post(endpoint, { json: payload });
            setMessage("Submitted for approval!");
            setTimeout(() => navigate("/"), 1500);
        } catch {
            setMessage("Submission failed");
        }
    };

    return (
        <div class={`container ${styles.submitContainer}`}>
            <h2 class={styles.submitTitle}>Submit New Content</h2>
            <Show when={message()}>
                <div class={styles.message}>{message()}</div>
            </Show>
            <form onSubmit={handleSubmit} class={styles.submitForm}>
                <div class="form-group">
                    <label for="submit-course">Course</label>
                    <select
                        id="submit-course"
                        aria-label="Select a course"
                        value={String(selectedCourse())}
                        onChange={(e) =>
                            setSelectedCourse(
                                Number(e.currentTarget.value),
                            )
                        }
                        required
                    >
                        <option value="">Select a course</option>
                        <For each={courses()}>
                            {(c) => <option value={c.id}>{c.name}</option>}
                        </For>
                    </select>
                </div>
                <div class="form-group">
                    <label for="submit-period">Period</label>
                    <select
                        id="submit-period"
                        aria-label="Select a period"
                        value={String(selectedPeriod())}
                        onChange={(e) =>
                            setSelectedPeriod(
                                Number(e.currentTarget.value),
                            )
                        }
                        required
                    >
                        <option value="">Select a period</option>
                        <For each={periods()}>
                            {(p) => <option value={p.id}>{p.title}</option>}
                        </For>
                    </select>
                </div>
                <div class="form-group">
                    <label for="submit-content-type">Content Type</label>
                    <select
                        id="submit-content-type"
                        aria-label="Select a content type"
                        value={contentType()}
                        onChange={(e) =>
                            setContentType(
                                e.currentTarget.value as ContentType,
                            )
                        }
                    >
                        <option value="civilization">Civilization</option>
                        <option value="event">Event</option>
                        <option value="evidence">Evidence (SPICE-T)</option>
                        <option value="person">Person</option>
                    </select>
                </div>
                <Show when={contentType() === "civilization"}>
                    <input
                        type="text"
                        placeholder="Name"
                        onInput={(e) =>
                            updateField("name", e.currentTarget.value)
                        }
                        required
                    />
                    <textarea
                        placeholder="Overview"
                        onInput={(e) =>
                            updateField("overview", e.currentTarget.value)
                        }
                    />
                    <input
                        type="number"
                        placeholder="Start Year"
                        onInput={(e) =>
                            updateField(
                                "startYear",
                                parseInt(e.currentTarget.value),
                            )
                        }
                    />
                    <input
                        type="number"
                        placeholder="End Year"
                        onInput={(e) =>
                            updateField(
                                "endYear",
                                parseInt(e.currentTarget.value),
                            )
                        }
                    />
                </Show>
                <Show when={contentType() === "event"}>
                    <input
                        type="text"
                        placeholder="Event Name"
                        onInput={(e) =>
                            updateField("name", e.currentTarget.value)
                        }
                        required
                    />
                    <input
                        type="number"
                        placeholder="Year"
                        onInput={(e) =>
                            updateField(
                                "year",
                                parseInt(e.currentTarget.value),
                            )
                        }
                    />
                    <textarea
                        placeholder="Description"
                        onInput={(e) =>
                            updateField(
                                "description",
                                e.currentTarget.value,
                            )
                        }
                    />
                    <input
                        type="text"
                        placeholder="Significance"
                        onInput={(e) =>
                            updateField(
                                "significance",
                                e.currentTarget.value,
                            )
                        }
                    />
                </Show>
                <Show when={contentType() === "evidence"}>
                    <input
                        type="text"
                        placeholder="Title"
                        onInput={(e) =>
                            updateField("title", e.currentTarget.value)
                        }
                        required
                    />
                    <textarea
                        placeholder="Description"
                        onInput={(e) =>
                            updateField(
                                "description",
                                e.currentTarget.value,
                            )
                        }
                    />
                    <select
                        aria-label="Select a theme"
                        onChange={(e) =>
                            updateField("themeId", e.currentTarget.value)
                        }
                        required
                    >
                        <option value="">Select Theme</option>
                        <For each={themes()}>
                            {(t) => <option value={t.id}>{t.name}</option>}
                        </For>
                    </select>
                    <input
                        type="text"
                        placeholder="Type (e.g., LEQ)"
                        onInput={(e) =>
                            updateField("type", e.currentTarget.value)
                        }
                    />
                    <input
                        type="text"
                        placeholder="Source"
                        onInput={(e) =>
                            updateField("source", e.currentTarget.value)
                        }
                    />
                </Show>
                <Show when={contentType() === "person"}>
                    <input
                        type="text"
                        placeholder="Name"
                        onInput={(e) =>
                            updateField("name", e.currentTarget.value)
                        }
                        required
                    />
                    <input
                        type="number"
                        placeholder="Birth Year"
                        onInput={(e) =>
                            updateField(
                                "birthYear",
                                parseInt(e.currentTarget.value),
                            )
                        }
                    />
                    <input
                        type="number"
                        placeholder="Death Year"
                        onInput={(e) =>
                            updateField(
                                "deathYear",
                                parseInt(e.currentTarget.value),
                            )
                        }
                    />
                    <textarea
                        placeholder="Biography"
                        onInput={(e) =>
                            updateField(
                                "biography",
                                e.currentTarget.value,
                            )
                        }
                    />
                </Show>
                <button type="submit" class="btn btn-primary">
                    Submit for Approval
                </button>
            </form>
        </div>
    );
}
