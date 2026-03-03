'use client';

import { useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function FeatureBadgeContainer({ children }: { children: ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useScrollTrigger(containerRef, undefined, {
        onEnter: () => {
            if (prefersReducedMotion || !containerRef.current) return;

            const badges = containerRef.current.querySelectorAll('.feature-badge-item');

            gsap.fromTo(badges,
                {
                    opacity: 0,
                    y: 20,
                    scale: 0.95
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'back.out(1.2)'
                }
            );
        }
    });

    return (
        <div ref={containerRef} className="flex flex-wrap gap-4 justify-center md:justify-start hover-float-container w-full">
            {children}
        </div>
    );
}
