'use client';

import { useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function CapabilitiesClient({ children }: { children: ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textColumnRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    // Scroll scrub animation for the capability items
    useScrollTrigger(containerRef, undefined, {
        onEnter: () => {
            if (prefersReducedMotion || !textColumnRef.current) return;

            const items = textColumnRef.current.querySelectorAll('.capability-item');

            // We want to fade them in sequentially as you scroll
            // Using ScrollTrigger directly for the scrub effect

            gsap.fromTo(items,
                {
                    opacity: 0.2,
                    x: 20
                },
                {
                    opacity: 1,
                    x: 0,
                    stagger: 0.5,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top center',
                        end: 'bottom 80%',
                        scrub: true,
                    }
                }
            );
        }
    });

    return (
        <div ref={containerRef} className="w-full flex flex-col md:flex-row gap-16 md:gap-24 relative">
            {children}
        </div>
    );
}
