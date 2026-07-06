import { A } from "@solidjs/router";
import { createResource, For, Show, type JSX } from "solid-js";
import { useEntity } from "../contexts/ServicesContext";
import styles from "./Home.module.css";

interface Course {
    id: number;
    name: string;
    description: string;
}

export default function Home(): JSX.Element {
    const coursesService = useEntity<Course>("public/courses");
    const [courses] = createResource(() => coursesService.list());

    return (
        <div class="container">
            <Show
                when={courses()}
                fallback={
                    <Show
                        when={!courses.error}
                        fallback={
                            <div class={styles.errorAlert}>
                                Failed to load courses
                            </div>
                        }
                    >
                        <div>Loading courses...</div>
                    </Show>
                }
            >
                <h1 class={styles.homeTitle}>AP History Courses</h1>
                <div class={styles.courseGrid}>
                    <For each={courses()}>
                        {(course) => (
                            <A
                                href={`/courses/${course.id}`}
                                class={styles.courseCard}
                            >
                                <h2 class={styles.courseName}>
                                    {course.name}
                                </h2>
                                <p class={styles.courseDescription}>
                                    {course.description}
                                </p>
                            </A>
                        )}
                    </For>
                    <Show when={courses()?.length === 0}>
                        <p
                            class="text-secondary text-center"
                            style={{ "grid-column": "1/-1" }}
                        >
                            No courses available yet.
                        </p>
                    </Show>
                </div>
            </Show>
        </div>
    );
}
