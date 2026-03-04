'use client';

import { useEffect, useRef, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

// Register precisely once
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export function useScrollTrigger(
    ref: RefObject<HTMLElement | null>,
    animation?: gsap.TweenVars,
    options?: ScrollTrigger.Vars
) {
    const prefersReducedMotion = useReducedMotion();
    const hasFiredRef = useRef(false);

    useEffect(() => {
        if (prefersReducedMotion || !ref.current) return;

        hasFiredRef.current = false;

        // Wrap onEnter to prevent double-firing from both ScrollTrigger and IntersectionObserver
        const originalOnEnter = options?.onEnter;
        const safeOnEnter = originalOnEnter ? (self?: ScrollTrigger) => {
            if (hasFiredRef.current) return;
            hasFiredRef.current = true;
            if (self) {
                originalOnEnter(self);
            } else {
                // Fired from IntersectionObserver fallback — call with a dummy-safe pattern
                originalOnEnter({} as ScrollTrigger);
            }
        } : undefined;

        const safeOptions = safeOnEnter ? { ...options, onEnter: safeOnEnter } : options;

        // Use GSAP Context for easy cleanup
        const ctx = gsap.context(() => {
            if (animation) {
                gsap.fromTo(
                    ref.current,
                    { ...animation.from }, // Ex: { opacity: 0, y: 50 }
                    {
                        ...animation.to,   // Ex: { opacity: 1, y: 0, duration: 1 }
                        scrollTrigger: {
                            trigger: ref.current,
                            start: 'top 85%',
                            // "play none none none" = play once on enter, never reverse
                            // "play none none reverse" caused mobile issues where rapid scroll position changes
                            // would trigger a reverse, making animations disappear
                            toggleActions: 'play none none none',
                            ...safeOptions,
                        },
                    }
                );
            } else {
                // Just the ScrollTrigger without a tween (for pinning, logic, etc)
                ScrollTrigger.create({
                    trigger: ref.current,
                    ...safeOptions
                });
            }
        }, ref);

        // IntersectionObserver fallback (catches mobile cases where ScrollTrigger misses)
        let observer: IntersectionObserver | null = null;
        if (safeOnEnter && ref.current) {
            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            safeOnEnter();
                            observer?.disconnect();
                        }
                    });
                },
                { threshold: 0.05, rootMargin: '0px 0px 50px 0px' }
            );
            observer.observe(ref.current);
        }

        return () => {
            ctx.revert();
            observer?.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prefersReducedMotion]);
}
