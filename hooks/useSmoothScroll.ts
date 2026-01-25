import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export interface SmoothScrollInstance {
    lenis: Lenis | null;
    scrollTo: (target: HTMLElement | string, options?: { duration?: number; offset?: number }) => void;
}

/**
 * Custom hook to initialize and manage Lenis smooth scrolling
 * 
 * Features:
 * - Cross-browser momentum scrolling
 * - RequestAnimationFrame integration
 * - Passive event listeners
 * - Proper cleanup for SPA lifecycle
 * 
 * @returns Object containing lenis instance and scrollTo helper function
 */
export const useSmoothScroll = (): SmoothScrollInstance => {
    const lenisRef = useRef<Lenis | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        // Initialize Lenis with optimized settings
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        // RequestAnimationFrame loop for smooth updates
        const raf = (time: number) => {
            lenis.raf(time);
            rafRef.current = requestAnimationFrame(raf);
        };

        rafRef.current = requestAnimationFrame(raf);

        // Cleanup function to prevent memory leaks
        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    // Helper function to scroll to a target element
    const scrollTo = (target: HTMLElement | string, options?: { duration?: number; offset?: number }) => {
        if (!lenisRef.current) return;

        lenisRef.current.scrollTo(target, {
            duration: options?.duration ?? 1.2,
            offset: options?.offset ?? 0,
        });
    };

    return {
        lenis: lenisRef.current,
        scrollTo,
    };
};
