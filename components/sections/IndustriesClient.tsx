'use client';

import { useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function IndustriesClient({ children }: { children: ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useScrollTrigger(containerRef, undefined, {
        onEnter: () => {
            if (prefersReducedMotion || !containerRef.current) return;

            const cards = containerRef.current.querySelectorAll('.industry-card');

            gsap.fromTo(cards,
                {
                    opacity: 0,
                    y: 60
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.15,
                    ease: 'power4.out',
                    overwrite: "auto",
                }
            );
        },
        once: true // Animate only once per distinct section load
    });

    return (
        <div ref={containerRef} className="w-full">
            {children}
        </div>
    );
}
