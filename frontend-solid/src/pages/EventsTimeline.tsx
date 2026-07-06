import { A, useParams } from "@solidjs/router";
import { createResource, createSignal, For, Show, type JSX } from "solid-js";
import { useApi } from "../contexts/ServicesContext";
import TimelineCard, {
    type Evidence,
    type Person,
    type TimelineEvent,
} from "../components/TimelineCard";
import PersonTooltip from "../components/PersonTooltip";
import EvidenceModal from "../components/EvidenceModal";
import styles from "./EventsTimeline.module.css";

/* ---------------------------------------------------------------------------
   EventsTimeline — SolidJS port of frontend/src/pages/EventsTimeline.tsx.
   The React version used react-chrono (VERTICAL_ALTERNATING); react-chrono is
   React-only, so the timeline is rendered as a native vertical rail of
   TimelineCard components. Person tooltips and the evidence modal are wired
   up here: the page injects PersonTooltip via the card's `renderPerson` prop
   and owns the EvidenceModal open state.
   --------------------------------------------------------------------------- */

export default function EventsTimeline(): JSX.Element {
    const params = useParams();
    const api = useApi();

    const [events] = createResource(
        () => params.periodId,
        async (periodId): Promise<TimelineEvent[]> => {
            try {
                return await api
                    .getKy()
                    .get(`public/periods/${periodId}/timeline`)
                    .json<TimelineEvent[]>();
            } catch {
                throw new Error("Failed to load timeline events");
            }
        },
    );

    const [selectedEvidence, setSelectedEvidence] = createSignal<Evidence[]>([]);

    const courseId = () => events()?.[0]?.courseId ?? null;
    const backHref = () => (courseId() ? `/courses/${courseId()}` : "/");

    const renderPerson = (person: Person): JSX.Element => (
        <PersonTooltip person={person}>
            <span class={styles.personTrigger}>
                {person.name} ({person.birthYear || "?"}–{person.deathYear || "?"})
            </span>
        </PersonTooltip>
    );

    return (
        <div class={`container ${styles.eventsPage}`}>
            <A href={backHref()} class={styles.backLink}>
                ← Back to Course
            </A>
            <h2 class={styles.eventsTitle}>Historical Timeline</h2>

            <Show
                when={events()}
                fallback={
                    <Show
                        when={!events.error}
                        fallback={
                            <div class={styles.errorAlert}>
                                Failed to load timeline events
                            </div>
                        }
                    >
                        <div>Loading timeline...</div>
                    </Show>
                }
            >
                <div class={styles.timelineWrapper}>
                    <Show when={events()!.length > 0}>
                        <div class={styles.timeline}>
                            <For each={events()}>
                                {(event, index) => (
                                    <div class={styles.timelineItem}>
                                        <div class={styles.timelineMarker} />
                                        <TimelineCard
                                            event={event}
                                            index={index()}
                                            onEvidenceClick={(ev) =>
                                                setSelectedEvidence(ev)
                                            }
                                            renderPerson={renderPerson}
                                        />
                                    </div>
                                )}
                            </For>
                        </div>
                    </Show>
                    <Show when={events()!.length === 0}>
                        <p class="text-secondary text-center">
                            No timeline events available for this period.
                        </p>
                    </Show>
                </div>
            </Show>

            <Show when={selectedEvidence().length > 0}>
                <EvidenceModal
                    evidence={selectedEvidence()}
                    onClose={() => setSelectedEvidence([])}
                />
            </Show>
        </div>
    );
}
