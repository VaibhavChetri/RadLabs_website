'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MOCK_HERO_CONTENT } from '@/data/mock/navigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Button } from '@/components/ui/Button';
import { DraggableNode } from '../ui/DraggableNode';
import { Database, Zap, ShieldAlert, GitBranch } from 'lucide-react';

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

            // Hide the actual inner content temporarily while we drop in
            gsap.fromTo(contentInnerRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, delay: 0.8, duration: 1.5, ease: "power3.out" }
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

            // The scale math (Scale up to safe threshold, pan into the 'O')
            tl.to(zoomTextRef.current, {
                scale: 60, // Large enough to zoom through
                xPercent: -300,
                yPercent: 80,
                transformOrigin: "center center",
                force3D: false, // CRITICAL: false prevents Massive VRAM texture crashes which cause ghosting
                ease: "power2.in",
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

    // Handle floating node positioning state (client-side only to prevent hydration mismatch errors)
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

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
                    <span className="text-[var(--color-fire-neon)]">NEURAL</span>
                    <span>INNOVATION</span>
                    <span className="text-[var(--color-text-secondary)] italic font-serif lowercase mt-[-2vw]">Engine</span>
                </div>
            </div>

            {/* Draggable Nodes & Standard UI Interface (These disappear as we zoom) */}
            <div ref={contentHiderRef} className="absolute inset-0 z-20 pointer-events-none">
                <div ref={contentInnerRef} className="absolute inset-0">
                    {/* Center align standard CTA box so the user has immediate primary actions */}
                    <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-auto">
                        <p className="max-w-xl text-center text-white/70 mb-8 font-mono text-sm uppercase tracking-widest backdrop-blur-md p-4 bg-black/40 rounded-xl border border-white/10">
                            {MOCK_HERO_CONTENT.headline.replace(/\n/g, ' ')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 items-center group">
                            <div className="absolute inset-0 bg-[var(--color-fire-neon)] opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-1000" />
                            <Button cta={MOCK_HERO_CONTENT.primaryCta} className="shadow-[0_0_20px_rgba(255,51,51,0.4)] scale-110 !px-8" />
                        </div>
                    </div>

                    {/* Physics Interactive Draggable Nodes - Only render on client to safely use window coords */}
                    {mounted && (
                        <div className="pointer-events-auto">
                            <DraggableNode
                                id="n1" title="Data Ingestion"
                                description="Real-time multi-channel unstructured data pipeline."
                                icon={<Database />}
                                initialPosition={{ x: window.innerWidth * 0.1, y: window.innerHeight * 0.2 }}
                            />
                            <DraggableNode
                                id="n2" title="Logic Gateway"
                                description="A/B routing protocol for transformer models."
                                icon={<GitBranch />}
                                initialPosition={{ x: window.innerWidth * 0.7, y: window.innerHeight * 0.15 }}
                            />
                            <DraggableNode
                                id="n3" title="Execution Engine"
                                description="Automated business logic triggering and API firing."
                                icon={<Zap />}
                                initialPosition={{ x: window.innerWidth * 0.75, y: window.innerHeight * 0.7 }}
                            />
                            <DraggableNode
                                id="n4" title="Governance"
                                description="Safety railguards and token-limit enforcement."
                                icon={<ShieldAlert />}
                                initialPosition={{ x: window.innerWidth * 0.15, y: window.innerHeight * 0.75 }}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Scroll Indicator Box */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-30 pointer-events-none">
                <span className="font-mono text-[10px] text-[var(--color-fire-neon)] tracking-[0.3em] mb-4">DRAG NODES / SCROLL DEEP</span>
                <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-[var(--color-fire-neon)] animate-[verticalScan_2s_ease-in-out_infinite]" />
                </div>
            </div>

        </section>
    );
}
