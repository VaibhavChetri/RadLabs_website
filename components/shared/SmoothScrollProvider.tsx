'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {

    // Sync every Lenis scroll frame with GSAP ScrollTrigger
    useLenis(() => {
        ScrollTrigger.update();
    });

    useEffect(() => {
        // After Lenis mounts and the DOM settles, refresh all ScrollTrigger positions
        const refreshTimeout = setTimeout(() => {
            ScrollTrigger.refresh(true);
        }, 250);

        // Second refresh after fonts + images settle
        const secondRefresh = setTimeout(() => {
            ScrollTrigger.refresh(true);
        }, 1000);

        gsap.ticker.lagSmoothing(0);

        return () => {
            clearTimeout(refreshTimeout);
            clearTimeout(secondRefresh);
        };
    }, []);

    return (
        <ReactLenis root options={{
            lerp: 0.05,
            duration: 1.5,
            smoothWheel: true,
            syncTouch: false,         // false = native touch scroll (most reliable for ScrollTrigger on mobile)
            touchMultiplier: 1.5
        }}>
            {children}
        </ReactLenis>
    );
}
