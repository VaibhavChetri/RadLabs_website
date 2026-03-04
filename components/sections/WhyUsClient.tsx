'use client';

import { useRef, ReactNode, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export function WhyUsClient({ children }: { children: ReactNode }) {
    const triggerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const [hasRevealed, setHasRevealed] = useState(false);

    // GSAP Scroll Reveal with fallback
    useEffect(() => {
        if (prefersReducedMotion || !containerRef.current || !triggerRef.current) return;

        const cards = containerRef.current.querySelectorAll('.why-card');

        // Set initial state
        gsap.set(cards, { opacity: 0, y: 120, rotationX: 15, scale: 0.9 });

        // Refresh ScrollTrigger to recalculate positions (important after Process pin release)
        ScrollTrigger.refresh();

        const revealCards = () => {
            if (hasRevealed) return;
            setHasRevealed(true);
            gsap.to(cards, {
                opacity: 1, y: 0, rotationX: 0, scale: 1,
                duration: 1.2, stagger: 0.2, ease: 'expo.out', overwrite: "auto"
            });
        };

        // Primary: ScrollTrigger-based reveal
        const st = ScrollTrigger.create({
            trigger: triggerRef.current,
            start: 'top 90%',
            once: true,
            onEnter: revealCards
        });

        // Fallback: IntersectionObserver as a safety net
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        revealCards();
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px 100px 0px' }
        );

        if (triggerRef.current) {
            observer.observe(triggerRef.current);
        }

        // Final fallback: timeout after 4s (in case both triggers fail)
        const fallbackTimeout = setTimeout(() => {
            if (!hasRevealed) {
                revealCards();
            }
        }, 4000);

        return () => {
            st.kill();
            observer.disconnect();
            clearTimeout(fallbackTimeout);
        };
    }, [prefersReducedMotion, hasRevealed]);

    // 3D Hover Tilt effect (desktop) + subtle scale on touch (mobile)
    useEffect(() => {
        if (prefersReducedMotion || !containerRef.current) return;

        const cards = containerRef.current.querySelectorAll('.why-card');
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        if (isTouch) {
            // Touch devices: subtle scale-up on tap
            const handlers: Array<{ el: Element; start: () => void; end: () => void }> = [];

            cards.forEach(card => {
                const inner = card.querySelector('.why-card-inner');
                const onStart = () => {
                    if (inner) {
                        gsap.to(inner, {
                            scale: 1.03,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }
                };
                const onEnd = () => {
                    if (inner) {
                        gsap.to(inner, {
                            scale: 1,
                            duration: 0.5,
                            ease: 'elastic.out(1, 0.5)'
                        });
                    }
                };

                card.addEventListener('touchstart', onStart, { passive: true });
                card.addEventListener('touchend', onEnd, { passive: true });
                handlers.push({ el: card, start: onStart, end: onEnd });
            });

            return () => {
                handlers.forEach(({ el, start, end }) => {
                    el.removeEventListener('touchstart', start);
                    el.removeEventListener('touchend', end);
                });
            };
        }

        // Desktop: full 3D tilt
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleMouseMove = (e: MouseEvent, card: any) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -12;
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
                    ease: 'elastic.out(1, 0.4)',
                    duration: 1.5
                });
            }
        };

        cards.forEach(card => {
            const onMove = (e: Event) => handleMouseMove(e as MouseEvent, card);
            const onLeave = () => handleMouseLeave(card);

            card.addEventListener('mousemove', onMove);
            card.addEventListener('mouseleave', onLeave);

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
