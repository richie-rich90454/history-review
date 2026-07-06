import { For, Show, onMount, type JSX } from "solid-js";
import gsap from "gsap";
import { useAnimation } from "../contexts/ServicesContext";
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
    /** Position in the timeline list; used to stagger the entrance animation. */
    index: number;
    onEvidenceClick: (evidence: Evidence[]) => void;
    renderPerson?: (person: Person) => JSX.Element;
}

function prefersReducedMotion(): boolean {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function defaultRenderPerson(person: Person): JSX.Element {
    return (
        <span class={styles.personTrigger}>
            {person.name} ({person.birthYear || "?"}–{person.deathYear || "?"})
        </span>
    );
}

export default function TimelineCard(props: TimelineCardProps): JSX.Element {
    const animation = useAnimation();
    const renderPerson = () => props.renderPerson ?? defaultRenderPerson;
    const people = () => props.event.people ?? [];
    const evidence = () => props.event.evidence ?? [];
    let cardRef: HTMLElement | undefined;

    // Stagger entrance: each card slides up + fades in with a delay based on
    // its position in the list. Only transforms (y) and opacity are animated,
    // and the animation is skipped entirely under prefers-reduced-motion.
    onMount(() => {
        if (!cardRef || prefersReducedMotion()) return;
        gsap.fromTo(
            cardRef,
            { opacity: 0, y: 24 },
            {
                opacity: 1,
                y: 0,
                duration: 0.4,
                delay: props.index * 0.08,
                ease: "power2.out",
            },
        );
    });

    const handleHoverIn = (): void => {
        if (cardRef) animation.cardHoverIn(cardRef);
    };
    const handleHoverOut = (): void => {
        if (cardRef) animation.cardHoverOut(cardRef);
    };

    const subtitle = () => {
        const civName = props.event.civilization?.name || "Unknown";
        let text = `Civilization: ${civName}`;
        if (people().length > 0) {
            text += ` | People: ${people().map((p) => p.name).join(", ")}`;
        }
        return text;
    };

    return (
        <article
            ref={cardRef}
            class={styles.card}
            onMouseEnter={handleHoverIn}
            onMouseLeave={handleHoverOut}
        >
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
