import gsap from "gsap";

/**
 * AnimationService centralizes GSAP-driven micro-interactions.
 *
 * Every method honors the user's `prefers-reduced-motion` setting and returns
 * immediately without animating when reduced motion is requested. All animations
 * use only transforms (x, y, scale, rotate) and opacity — never layout
 * properties (width, height, margin, padding, top, left).
 */
export class AnimationService {
    private prefersReducedMotion(): boolean {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    /** Fade + slide up a freshly mounted page element. */
    pageTransition(element: Element): void {
        if (this.prefersReducedMotion()) return;
        gsap.fromTo(
            element,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        );
    }

    /** Scale a card up slightly on hover enter. */
    cardHoverIn(element: Element): void {
        if (this.prefersReducedMotion()) return;
        gsap.to(element, { scale: 1.04, duration: 0.2, ease: "power2.out" });
    }

    /** Restore a card to its resting scale on hover exit. */
    cardHoverOut(element: Element): void {
        if (this.prefersReducedMotion()) return;
        gsap.to(element, { scale: 1, duration: 0.2, ease: "power2.out" });
    }

    /** Fade + scale in a modal on enter. */
    modalEnter(element: Element): void {
        if (this.prefersReducedMotion()) return;
        gsap.fromTo(
            element,
            { opacity: 0, scale: 0.92 },
            { opacity: 1, scale: 1, duration: 0.25, ease: "power2.out" },
        );
    }

    /** Fade + scale out a modal on exit. */
    modalExit(element: Element): void {
        if (this.prefersReducedMotion()) return;
        gsap.to(element, {
            opacity: 0,
            scale: 0.92,
            duration: 0.2,
            ease: "power2.in",
        });
    }
}
