'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MOCK_HERO_CONTENT } from '@/data/mock/navigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Button } from '@/components/ui/Button';
import { ParticleField } from '@/components/effects/ParticleField';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const zoomTextRef = useRef<HTMLDivElement>(null);
    const zoomTextInnerRef = useRef<HTMLDivElement>(null);
    const backgroundLayerRef = useRef<HTMLDivElement>(null);
    const contentHiderRef = useRef<HTMLDivElement>(null);
    const contentInnerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    // 10/10 Cinematic "Zoom Through" setup
    useEffect(() => {
        if (prefersReducedMotion || !containerRef.current || !zoomTextRef.current) return;

        const ctx = gsap.context(() => {

            // Initial chaotic drop-in for the text layer (isolated to inner ref to prevent conflict with scroll scrubbing)
            gsap.fromTo(zoomTextInnerRef.current,
                { scale: 0.5, opacity: 0, filter: 'blur(30px)' },
                { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 2, ease: "expo.out" }
            );

            // Hide the actual inner content temporarily while we drop in with a creative 3D tilt
            gsap.fromTo(contentInnerRef.current,
                { opacity: 0, y: 100, scale: 0.9, rotationX: -15, filter: 'blur(20px)' },
                { opacity: 1, y: 0, scale: 1, rotationX: 0, filter: 'blur(0px)', delay: 1.2, duration: 1.8, ease: "expo.out" }
            );

            // Pin the hero and scale the massive text incredibly huge until we "fall through" it
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=2000", // Scroll 2000px to experience the zoom
                    scrub: true, // Use strict boolean true instead of a number to prevent scrub lag sync issues
                    pin: true,
                    anticipatePin: 1
                }
            });

            // Calculate responsive scale and positioning
            const isMobile = window.innerWidth < 768;
            const targetScale = isMobile ? 150 : 200;
            // Increase targetX to push the text further right, centering the "A" of "AI" on the screen
            const targetX = isMobile ? 22 : 23;
            // Fine-tune vertical position to hit the crossbar/hole of the "A"
            const targetY = isMobile ? 5 : 4;

            // The scale math (Scale up and pan into the triangular counter/hole inside the 'A')
            tl.to(zoomTextRef.current, {
                scale: targetScale,
                xPercent: targetX,
                yPercent: targetY,
                transformOrigin: "center center",
                force3D: false, // CRITICAL: false prevents Massive VRAM texture crashes which cause ghosting
                ease: "power2.inOut",
                duration: 1
            }, 0);

            // Hide the massive text layer completely at the end to wipe it from compositor
            tl.to(zoomTextRef.current, {
                opacity: 0,
                duration: 0.1
            }, 0.9);

            // Fade out the nodes/UI so we don't zoom into them
            tl.to(contentHiderRef.current, {
                opacity: 0,
                scale: 1.5,
                duration: 0.4
            }, 0);

            // Fade the background completely to black at the end so the next section blends perfectly
            tl.to(backgroundLayerRef.current, {
                opacity: 0,
                duration: 0.3
            }, 0.7);

        }, containerRef);

        return () => ctx.revert();
    }, [prefersReducedMotion]);

    return (
        <section
            ref={containerRef}
            id="hero"
            className="relative w-full h-[100svh] flex items-center justify-center overflow-hidden bg-black"
        >
            {/* The deep background we see BEFORE zooming through */}
            <div
                ref={backgroundLayerRef}
                className="absolute inset-0 z-0 bg-black flex items-center justify-center overflow-hidden"
            >
                {/* Wacky grid and radial gradients simulating an AI neural core */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,0,0,0.8)_0%,#000000_60%)]" />
                <ParticleField />
                <div
                    className="absolute inset-[-100%] opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(#ff3333 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                        transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)'
                    }}
                />
            </div>

            {/* This layer holds our massive clipping text we will scale up */}
            <div
                ref={zoomTextRef}
                className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
            >
                {/* Massive bold font for the mask */}
                <div ref={zoomTextInnerRef} className="text-[12vw] leading-none font-bold tracking-tighter text-white font-sans text-center whitespace-nowrap flex flex-col uppercase opacity-90">
                    <span className="text-[var(--color-fire-neon)] -translate-y-8 md:translate-y-0">BESPOKE</span>
                    <span className="mt-[12vh] md:mt-[4vw]">AI</span>
                    <span className="text-[var(--color-text-secondary)] italic font-serif lowercase mt-[-2vw]">Solutions</span>
                </div>
            </div>

            {/* Draggable Nodes & Standard UI Interface (These disappear as we zoom) */}
            <div ref={contentHiderRef} className="absolute inset-0 z-20 pointer-events-none perspective-1000">
                <div ref={contentInnerRef} className="absolute inset-0">

                    {/* Position standard CTA text above the AI, completely transparent and visible via difference blend */}
                    <div className="absolute top-[20%] md:top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-4 z-50 mix-blend-difference pointer-events-auto">
                        <p className="w-full text-center text-white font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold leading-relaxed">
                            BLENDING CREATIVITY, ENGINEERING & INNOVATION TO BUILD<br />
                            INTELLIGENT AI SOLUTIONS.
                        </p>
                    </div>

                    {/* The call to action button stays below the massive AI text */}
                    <div className="absolute bottom-[10%] md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto z-40">
                        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center group relative">
                            <div className="absolute inset-0 bg-[var(--color-fire-neon)] opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-1000" />
                            <Button cta={MOCK_HERO_CONTENT.primaryCta} className="shadow-[0_0_20px_rgba(255,51,51,0.4)] scale-90 md:scale-110 !px-6 md:!px-10 py-3 md:py-4 text-[10px] md:text-sm font-bold tracking-[0.1em] hover:scale-105 md:hover:scale-125 transition-transform duration-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator Box */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-30 pointer-events-none">
                <span className="font-mono text-[10px] text-[var(--color-fire-neon)] tracking-[0.3em] mb-4">DRAG NODES / SCROLL DEEP</span>
                <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-[var(--color-fire-neon)] animate-[verticalScan_2s_ease-in-out_infinite]" />
                </div>
            </div>

        </section>
    );
}
