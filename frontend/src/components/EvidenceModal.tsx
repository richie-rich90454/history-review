import { For, onCleanup, onMount, type JSX } from "solid-js";
import { useAnimation } from "../contexts/ServicesContext";
import type { Evidence } from "./TimelineCard";
import styles from "./EvidenceModal.module.css";

/* ---------------------------------------------------------------------------
   EvidenceModal — ports the React Radix Dialog. Controlled by the parent:
   mount it (via <Show>) to open, and `onClose` is called after the exit
   animation finishes. Enter/exit use the AnimationService wrappers, which
   honor prefers-reduced-motion and animate only opacity + scale.
   --------------------------------------------------------------------------- */

interface EvidenceModalProps {
    evidence: Evidence[];
    onClose: () => void;
}

export default function EvidenceModal(props: EvidenceModalProps): JSX.Element {
    const animation = useAnimation();
    let contentRef: HTMLDivElement | undefined;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;

    onMount(() => {
        if (contentRef) animation.modalEnter(contentRef);
    });

    onCleanup(() => {
        if (exitTimer) clearTimeout(exitTimer);
    });

    const handleClose = (): void => {
        if (contentRef) animation.modalExit(contentRef);
        // Match AnimationService.modalExit duration (0.2s) before unmounting.
        exitTimer = setTimeout(() => props.onClose(), 200);
    };

    return (
        <div
            class={styles.overlay}
            onClick={handleClose}
            role="presentation"
        >
            <div
                ref={contentRef}
                class={styles.content}
                role="dialog"
                aria-modal="true"
                aria-label="Related evidence"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 class={styles.title}>Related Evidence</h3>
                <div class={styles.tableWrapper}>
                    <table class={styles.table}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Theme</th>
                                <th>Description</th>
                                <th>Source</th>
                            </tr>
                        </thead>
                        <tbody>
                            <For each={props.evidence}>
                                {(item) => (
                                    <tr>
                                        <td>
                                            <strong>{item.title}</strong>
                                        </td>
                                        <td>{item.type || "—"}</td>
                                        <td>{item.theme?.name || "—"}</td>
                                        <td>{item.description}</td>
                                        <td>{item.source || "—"}</td>
                                    </tr>
                                )}
                            </For>
                        </tbody>
                    </table>
                </div>
                <button
                    type="button"
                    class={styles.closeBtn}
                    onClick={handleClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}
