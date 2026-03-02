'use client';

import { useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function TechStackClient({ children }: { children: ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useScrollTrigger(containerRef, undefined, {
        onEnter: () => {
            if (prefersReducedMotion || !containerRef.current) return;

            const cards = containerRef.current.querySelectorAll('.tech-card');

            gsap.fromTo(cards,
                {
                    opacity: 0,
                    scale: 0.95,
                    y: 20
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'back.out(1.2)',
                    overwrite: "auto",
                }
            );

            // Fast matrix-like reveal for pills inside cards
            const pills = containerRef.current.querySelectorAll('.tech-pill');
            gsap.fromTo(pills,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.05,
                    stagger: {
                        amount: 1.5,
                        from: "random"
                    },
                    delay: 0.4
                }
            );
        },
        once: true
    });

    return (
        <div ref={containerRef} className="w-full">
            {children}
        </div>
    );
}
