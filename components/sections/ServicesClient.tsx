'use client';

import { useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function ServicesClient({ children }: { children: ReactNode }) {
    const gridRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useScrollTrigger(gridRef, undefined, {
        onEnter: () => {
            if (prefersReducedMotion || !gridRef.current) return;

            const cards = gridRef.current.querySelectorAll('.bento-card');

            gsap.fromTo(cards,
                {
                    opacity: 0,
                    y: 50,
                    scale: 0.95
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    overwrite: "auto"
                }
            );
        },
        once: true // only animate in once
    });

    return (
        <div ref={gridRef} className="w-full">
            {children}
        </div>
    );
}
