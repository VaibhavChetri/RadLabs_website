'use client';

import { useRef, ReactNode, useEffect } from 'react';
import { gsap } from 'gsap';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function WhyUsClient({ children }: { children: ReactNode }) {
    const triggerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    // GSAP Scroll Reveal
    useScrollTrigger(triggerRef, undefined, {
        onEnter: () => {
            if (prefersReducedMotion || !containerRef.current) return;
            const cards = containerRef.current.querySelectorAll('.why-card');
            gsap.fromTo(cards,
                { opacity: 0, y: 120, rotationX: 15, scale: 0.9 },
                { opacity: 1, y: 0, rotationX: 0, scale: 1, duration: 1.2, stagger: 0.2, ease: 'expo.out', overwrite: "auto" }
            );
        },
        once: true
    });

    // 3D Hover Tilt effect
    useEffect(() => {
        if (prefersReducedMotion || !containerRef.current) return;

        const cards = containerRef.current.querySelectorAll('.why-card');

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleMouseMove = (e: MouseEvent, card: any) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -12; // Max rotation 12deg
            const rotateY = ((x - centerX) / centerX) * 12;

            const inner = card.querySelector('.why-card-inner');
            const glow = card.querySelector('.glow-follower');

            if (inner) {
                gsap.to(inner, {
                    rotationX: rotateX,
                    rotationY: rotateY,
                    transformPerspective: 1200,
                    ease: 'power2.out',
                    duration: 0.4
                });
            }

            if (glow) {
                gsap.to(glow, {
                    x: x,
                    y: y,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            }
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleMouseLeave = (card: any) => {
            const inner = card.querySelector('.why-card-inner');
            if (inner) {
                gsap.to(inner, {
                    rotationX: 0,
                    rotationY: 0,
                    ease: 'elastic.out(1, 0.4)', // bouncy return
                    duration: 1.5
                });
            }
        };

        cards.forEach(card => {
            const onMove = (e: Event) => handleMouseMove(e as MouseEvent, card);
            const onLeave = () => handleMouseLeave(card);

            card.addEventListener('mousemove', onMove);
            card.addEventListener('mouseleave', onLeave);

            // attach teardown to element for cleanup
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (card as any)._cleanup = () => {
                card.removeEventListener('mousemove', onMove);
                card.removeEventListener('mouseleave', onLeave);
            };
        });

        return () => {
            cards.forEach(card => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if ((card as any)._cleanup) (card as any)._cleanup();
            });
        };
    }, [prefersReducedMotion]);

    return (
        <div ref={triggerRef} className="w-full relative z-10 flex justify-center">
            <div ref={containerRef} className="w-full flex justify-center">
                {children}
            </div>
        </div>
    );
}
