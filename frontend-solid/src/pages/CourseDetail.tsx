import { A, useParams } from "@solidjs/router";
import { createResource, For, Show, type JSX } from "solid-js";
import { useApi } from "../contexts/ServicesContext";
import styles from "./CourseDetail.module.css";

interface Period {
    id: number;
    title: string;
    startYear: number;
    endYear: number;
    overview: string;
}

export default function CourseDetail(): JSX.Element {
    const params = useParams();
    const api = useApi();
    const [periods] = createResource(
        () => params.courseId,
        async (courseId): Promise<Period[]> => {
            try {
                return await api
                    .getKy()
                    .get(`public/courses/${courseId}/periods`)
                    .json<Period[]>();
            } catch {
                throw new Error("Failed to load periods");
            }
        },
    );

    return (
        <div class="container">
            <Show
                when={periods()}
                fallback={
                    <Show
                        when={!periods.error}
                        fallback={
                            <div class={styles.errorAlert}>
                                Failed to load periods
                            </div>
                        }
                    >
                        <div>Loading periods...</div>
                    </Show>
                }
            >
                <A href="/" class={styles.backLink}>
                    ← Back to Courses
                </A>
                <h2 class={styles.periodsTitle}>Historical Periods</h2>
                <div class={styles.periodsList}>
                    <For each={periods()}>
                        {(period) => (
                            <div class={styles.periodCard}>
                                <h3 class={styles.periodTitle}>
                                    {period.title}
                                </h3>
                                <p class={styles.periodYears}>
                                    {period.startYear} – {period.endYear}
                                </p>
                                <p class={styles.periodOverview}>
                                    {period.overview}
                                </p>
                                <A
                                    href={`/periods/${period.id}/events`}
                                    class={`btn btn-secondary ${styles.periodLink}`}
                                >
                                    View Events →
                                </A>
                            </div>
                        )}
                    </For>
                    <Show when={periods()?.length === 0}>
                        <p class="text-secondary">
                            No periods available for this course.
                        </p>
                    </Show>
                </div>
            </Show>
        </div>
    );
}
