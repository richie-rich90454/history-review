import { createSignal, Show, type JSX } from "solid-js";
import type { Person } from "./TimelineCard";
import styles from "./PersonTooltip.module.css";

/* ---------------------------------------------------------------------------
   PersonTooltip — ports the React HoverCard (desktop) / Popover (mobile)
   behavior. Wraps a trigger (the person's name) and reveals a details card
   on hover. Open/close delays mirror the React defaults (200ms / 100ms).
   --------------------------------------------------------------------------- */

interface PersonTooltipProps {
    person: Person;
    children: JSX.Element;
}

export default function PersonTooltip(props: PersonTooltipProps): JSX.Element {
    const [open, setOpen] = createSignal(false);
    let enterTimer: ReturnType<typeof setTimeout> | undefined;
    let leaveTimer: ReturnType<typeof setTimeout> | undefined;

    const handleEnter = (): void => {
        if (leaveTimer) {
            clearTimeout(leaveTimer);
            leaveTimer = undefined;
        }
        enterTimer = setTimeout(() => setOpen(true), 200);
    };

    const handleLeave = (): void => {
        if (enterTimer) {
            clearTimeout(enterTimer);
            enterTimer = undefined;
        }
        leaveTimer = setTimeout(() => setOpen(false), 100);
    };

    return (
        <span
            class={styles.wrapper}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onFocus={handleEnter}
            onBlur={handleLeave}
        >
            {props.children}
            <Show when={open()}>
                <span class={styles.tooltip} role="tooltip">
                    <h4 class={styles.name}>{props.person.name}</h4>
                    <p class={styles.years}>
                        {props.person.birthYear || "?"} –{" "}
                        {props.person.deathYear || "?"}
                    </p>
                    <p class={styles.bio}>
                        {props.person.biography || "No biography available."}
                    </p>
                </span>
            </Show>
        </span>
    );
}
