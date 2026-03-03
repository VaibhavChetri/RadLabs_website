'use client';

import { useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function CoreServicesGrid({ children }: { children: ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useScrollTrigger(containerRef, undefined, {
        onEnter: () => {
            if (prefersReducedMotion || !containerRef.current) return;

            const cards = containerRef.current.querySelectorAll('.core-service-card');

            gsap.fromTo(cards,
                {
                    opacity: 0,
                    y: 40,
                    rotateX: 10,
                    scale: 0.95
                },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'expo.out',
                    clearProps: 'all' // Cleanup transforms so hover CSS works perfectly
                }
            );
        },
        toggleActions: 'play none none none' // DO NOT reverse the animation when scrolling up, stay visible!
    });

    return (
        <div
            ref={containerRef}
            className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 [perspective:1000px]"
        >
            {children}
        </div>
    );
}
