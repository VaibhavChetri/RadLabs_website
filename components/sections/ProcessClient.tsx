'use client';

import { useRef, ReactNode, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export function ProcessClient({ children, header }: { children: ReactNode; header?: ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion || !timelineRef.current || !containerRef.current) return;

        const ctx = gsap.context(() => {
            const strip = timelineRef.current;
            if (!strip) return;

            const nodes = strip.querySelectorAll('.process-graph-node');
            const circles = strip.querySelectorAll('.process-circle');
            const lines = strip.querySelectorAll('.process-line-progress');
            const cards = strip.querySelectorAll('.process-card');

            // Force initial CSS states
            gsap.set(circles, { scale: 0, opacity: 0 });
            gsap.set(cards, { y: 30, opacity: 0 });

            // ──────────────────────────────────────────────
            // Universal Horizontal scroll with pin (all devices)
            // ──────────────────────────────────────────────
            const getScrollAmount = () => {
                const stripWidth = strip.scrollWidth;
                const vWidth = window.innerWidth;
                return stripWidth > vWidth ? -(stripWidth - vWidth + 64) : 0;
            };

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: () => `+=${strip.scrollWidth}`,
                    scrub: 0.5,
                    pin: true,
                    invalidateOnRefresh: true,
                }
            });

            nodes.forEach((_, index) => {
                if (index === 0) {
                    gsap.to(circles[0], {
                        scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)",
                        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }
                    });
                    gsap.to(cards[0], {
                        y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.1,
                        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }
                    });

                    tl.to(lines[0], {
                        scaleX: 1,
                        duration: 1.5,
                        ease: "none"
                    }, 0);
                } else {
                    const startTime = index * 1.5 - 0.5;

                    tl.to(circles[index], {
                        scale: 1,
                        opacity: 1,
                        duration: 0.4,
                        ease: "back.out(1.7)"
                    }, startTime);

                    tl.to(cards[index], {
                        y: 0,
                        opacity: 1,
                        duration: 0.4,
                        ease: "power2.out"
                    }, startTime + 0.1);

                    if (index < nodes.length - 1) {
                        tl.to(lines[index], {
                            scaleX: 1,
                            duration: 1.5,
                            ease: "none"
                        }, startTime + 0.4);
                    }
                }
            });

            tl.to(strip, {
                x: getScrollAmount,
                ease: "none",
                duration: (nodes.length - 1) * 1.5,
            }, 0.5);

            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 100);
        }, containerRef);

        return () => ctx.revert();
    }, [prefersReducedMotion]);

    return (
        <div ref={containerRef} className="w-full flex flex-col py-16 md:py-24 relative overflow-hidden bg-[var(--color-brand-black)] border-y border-white/5 min-h-[100svh]">
            {/* Background graph grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {header && (
                <div className="max-w-[1920px] mx-auto w-full px-8 lg:px-16 z-20 flex-shrink-0">
                    {header}
                </div>
            )}

            <div className="flex flex-col justify-start w-full relative z-10 overflow-hidden outline-none mt-2 md:mt-4">
                {/* Scroll strip wrapper */}
                <div className="w-full px-8 lg:px-16 overflow-visible">
                    {/* Horizontal strip */}
                    <div
                        ref={timelineRef}
                        className="flex flex-row items-center w-max min-w-full gap-8 md:gap-16 will-change-transform"
                    >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
