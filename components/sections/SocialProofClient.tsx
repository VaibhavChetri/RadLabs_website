'use client';

import { useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function SocialProofClient({ children }: { children: ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useScrollTrigger(containerRef, undefined, {
        onEnter: () => {
            if (prefersReducedMotion || !containerRef.current) return;

            // The Laser Reveal effect
            gsap.fromTo(containerRef.current,
                {
                    opacity: 0,
                    filter: 'brightness(3) blur(10px)',
                    y: 20
                },
                {
                    opacity: 1,
                    filter: 'brightness(1) blur(0px)',
                    y: 0,
                    duration: 0.6,
                    ease: 'power4.out',
                    overwrite: "auto"
                }
            );
        },
        once: true,
        start: "top 85%"
    });

    return (
        <div ref={containerRef} className="opacity-0 w-full relative">
            {children}
        </div>
    );
}
