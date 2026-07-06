import { For, Show, type JSX } from "solid-js";
import styles from "./TimelineCard.module.css";

/* ---------------------------------------------------------------------------
   Domain types — ported from frontend/src/pages/EventsTimeline.tsx.
   Exported so PersonTooltip / EvidenceModal / the page can share them.
   --------------------------------------------------------------------------- */

export interface Civilization {
    id: number;
    name: string;
    overview: string;
    startYear: number;
    endYear: number;
}

export interface Person {
    id: number;
    name: string;
    birthYear?: number;
    deathYear?: number;
    biography?: string;
}

export interface Theme {
    id: number;
    name: string;
}

export interface Evidence {
    id: number;
    title: string;
    description: string;
    type?: string;
    source?: string;
    theme?: Theme;
}

export interface TimelineEvent {
    id: number;
    name: string;
    year: number;
    description: string;
    significance?: string;
    civilization?: Civilization;
    people?: Person[];
    evidence?: Evidence[];
    courseId?: number;
}

/* ---------------------------------------------------------------------------
   TimelineCard — renders a single timeline event.
   `renderPerson` lets the page inject a PersonTooltip wrapper without the
   card needing to depend on that component directly.
   --------------------------------------------------------------------------- */

interface TimelineCardProps {
    event: TimelineEvent;
    onEvidenceClick: (evidence: Evidence[]) => void;
    renderPerson?: (person: Person) => JSX.Element;
}

function defaultRenderPerson(person: Person): JSX.Element {
    return (
        <span class={styles.personTrigger}>
            {person.name} ({person.birthYear || "?"}–{person.deathYear || "?"})
        </span>
    );
}

export default function TimelineCard(props: TimelineCardProps): JSX.Element {
    const renderPerson = () => props.renderPerson ?? defaultRenderPerson;
    const people = () => props.event.people ?? [];
    const evidence = () => props.event.evidence ?? [];
    const subtitle = () => {
        const civName = props.event.civilization?.name || "Unknown";
        let text = `Civilization: ${civName}`;
        if (people().length > 0) {
            text += ` | People: ${people().map((p) => p.name).join(", ")}`;
        }
        return text;
    };

    return (
        <article class={styles.card}>
            <div class={styles.cardHeader}>
                <span class={styles.cardYear}>{props.event.year}</span>
                <h3 class={styles.cardTitle}>{props.event.name}</h3>
                <p class={styles.cardSubtitle}>{subtitle()}</p>
            </div>

            <div class={styles.cardContent}>
                <p class={styles.cardDescription}>
                    <strong>Description:</strong> {props.event.description}
                </p>

                <Show when={props.event.significance}>
                    <p class={styles.cardSignificance}>
                        <strong>Significance:</strong> {props.event.significance}
                    </p>
                </Show>

                <Show when={props.event.civilization}>
                    {(civ) => (
                        <div class={styles.cardCivilization}>
                            <strong>
                                {civ().name} ({civ().startYear}–{civ().endYear})
                            </strong>
                            <p>{civ().overview}</p>
                        </div>
                    )}
                </Show>

                <Show when={people().length > 0}>
                    <div class={styles.cardPeople}>
                        <strong>People:</strong>
                        <ul>
                            <For each={people()}>
                                {(person) => (
                                    <li>{renderPerson()(person)}</li>
                                )}
                            </For>
                        </ul>
                    </div>
                </Show>

                <Show
                    when={evidence().length > 0}
                    fallback={
                        <div class={styles.noEvidence}>
                            <span>📭 No evidence available for this event.</span>
                        </div>
                    }
                >
                    <div class={styles.cardEvidence}>
                        <button
                            type="button"
                            class={styles.evidenceBtn}
                            onClick={() => onEvidenceClickSafe()}
                        >
                            <span class={styles.evidenceIcon}>📋</span>
                            VIEW EVIDENCE ({evidence().length})
                        </button>
                    </div>
                </Show>
            </div>
        </article>
    );

    function onEvidenceClickSafe(): void {
        props.onEvidenceClick(evidence());
    }
}
