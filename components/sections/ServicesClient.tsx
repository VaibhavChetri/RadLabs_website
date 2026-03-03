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

            // The Dashboard Landing effect
            gsap.fromTo(gridRef.current,
                {
                    opacity: 0,
                    rotationX: 15,
                    y: 100,
                    scale: 0.95,
                    transformPerspective: 1000
                },
                {
                    opacity: 1,
                    rotationX: 0,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: 'expo.out',
                    overwrite: "auto"
                }
            );

            // Stagger the individual cards slightly after the container starts moving
            const cards = gridRef.current.querySelectorAll('.bento-card');
            gsap.fromTo(cards,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    delay: 0.2
                }
            );
        },
        once: true,
        start: "top 80%"
    });

    return (
        <div ref={gridRef} className="w-full opacity-0" style={{ transformStyle: 'preserve-3d' }}>
            {children}
        </div>
    );
}
