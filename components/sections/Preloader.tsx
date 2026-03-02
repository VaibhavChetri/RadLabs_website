'use client';

import { useEffect, useState, useRef } from 'react';
import { FlameLogo } from '@/components/ui/FlameLogo';
import { gsap } from 'gsap';

export function Preloader() {
    const [shouldShow, setShouldShow] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Session check to only show once per session
        const hasLoaded = sessionStorage.getItem('radlabs-loaded');

        // Check reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (hasLoaded === 'true' || prefersReducedMotion) {
            setShouldShow(false);
            return;
        }

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    sessionStorage.setItem('radlabs-loaded', 'true');
                    setShouldShow(false);
                }
            });

            // 0.0s Logo glow pulse
            tl.to(logoRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: 'power3.out'
            }, 0);

            // Split text reveal
            if (textRef.current) {
                const letters = textRef.current.querySelectorAll('span');
                tl.to(letters, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.08,
                    ease: 'power2.out'
                }, 0.3);
            }

            // Progress bar growing
            tl.to(progressRef.current, {
                width: '100%',
                duration: 1.5,
                ease: 'power2.inOut'
            }, 0);

            // Screen wipes up
            tl.to(containerRef.current, {
                yPercent: -100,
                duration: 0.8,
                ease: 'power4.inOut',
                delay: 0.3
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    if (!shouldShow) return null;

    const brandName = "RADLABS";

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--color-brand-black)]"
        >
            <div className="flex flex-col items-center gap-8">
                <div
                    ref={logoRef}
                    className="w-24 h-24 text-[var(--color-fire-neon)] opacity-0 scale-90"
                    style={{ filter: 'drop-shadow(0 0 30px rgba(255,51,51,0.5))' }}
                >
                    <FlameLogo />
                </div>

                <div ref={textRef} className="font-mono text-2xl tracking-[0.3em] text-white flex overflow-hidden">
                    {brandName.split('').map((char, index) => (
                        <span
                            key={index}
                            className="opacity-0 translate-y-4 inline-block"
                        >
                            {char}
                        </span>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--color-border-subtle)]">
                <div
                    ref={progressRef}
                    className="h-full bg-[var(--color-fire-neon)] w-0 shadow-[0_0_20px_var(--color-fire-neon)]"
                />
            </div>
        </div>
    );
}
