'use client';

import { useRef, ReactNode, useEffect } from 'react';
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

        // Use standard GSAP context to bind to the component lifecycle
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

            // Dynamic calculation for the horizontal scroll distance
            const getScrollAmount = () => {
                const stripWidth = strip.scrollWidth;
                const vWidth = window.innerWidth;
                // Subtract screen width so the final item stops at the right edge
                // Add a small padding buffer so it doesn't hug the absolute edge
                return stripWidth > vWidth ? -(stripWidth - vWidth + 64) : 0;
            };

            // Master Scroll Scrub Timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    // The pin duration equates to the horizontal width to maintain a 1:1 scroll speed
                    end: () => `+=${strip.scrollWidth}`,
                    scrub: 1,
                    pin: true,
                    // Recalculates start/end and function-based properties on window resize
                    invalidateOnRefresh: true,
                }
            });

            // 1. Play sequenced card/node animations mapped to the timeline's progress
            // Node 0 animates from 0 -> 1.0. This makes the initial scroll feel responsive.
            nodes.forEach((_, index) => {
                const startTime = index * 1.5; // Spread out the entrance timings slightly more

                // Pop the circle in
                tl.to(circles[index], {
                    scale: 1,
                    opacity: 1,
                    duration: 0.4,
                    ease: "back.out(1.7)"
                }, startTime);

                // Slide the card up securely
                tl.to(cards[index], {
                    y: 0,
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.out"
                }, startTime + 0.1);

                // Fill the connecting line (except the final node)
                if (index < nodes.length - 1) {
                    tl.to(lines[index], {
                        scaleX: 1,
                        duration: 1.5,
                        ease: "none"
                    }, startTime + 0.4);
                }
            });

            // 2. The horizontal slide translation
            // Starts at 1.0! By starting later, the first card finishes drawing BEFORE the screen begins panning left.
            tl.to(strip, {
                x: getScrollAmount,
                ease: "none",
                // Total duration dynamically matches the entrance of the last cards
                duration: (nodes.length - 1) * 1.5,
            }, 1.0);

            // Optional: force a refresh in case layout shifts slightly after fonts load
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 100);

        }, containerRef); // Scope context queries to this container

        // Cleanup the pin and timeline when component unmounts
        return () => ctx.revert();
    }, [prefersReducedMotion]); // Empty dep array so it only mounts once

    return (
        <div ref={containerRef} className="w-full min-h-[100svh] flex flex-col py-16 md:py-24 relative overflow-hidden bg-[var(--color-brand-black)] border-y border-white/5">
            {/* Background graph grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {header && (
                <div className="max-w-[1920px] mx-auto w-full px-8 lg:px-16 z-20 flex-shrink-0">
                    {header}
                </div>
            )}

            <div className="flex flex-col justify-start w-full relative z-10 overflow-hidden outline-none mt-2 md:mt-4">
                {/* Horizontal scroll strip wrapper */}
                <div className="w-full px-8 lg:px-16 overflow-visible">
                    {/* The horizontal strip itself -- w-max ensures it takes up its true intrinsic width */}
                    <div ref={timelineRef} className="flex flex-row items-center w-max min-w-full gap-8 md:gap-16 will-change-transform">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
