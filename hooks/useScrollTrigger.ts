'use client';

import { useEffect, RefObject } from 'react';
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

    useEffect(() => {
        if (prefersReducedMotion || !ref.current) return;

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
                            toggleActions: 'play none none reverse',
                            ...options,
                        },
                    }
                );
            } else {
                // Just the ScrollTrigger without a tween (for pinning, logic, etc)
                ScrollTrigger.create({
                    trigger: ref.current,
                    ...options
                });
            }
        }, ref);

        return () => ctx.revert();
    }, [ref, prefersReducedMotion, JSON.stringify(animation), JSON.stringify(options)]);
}
