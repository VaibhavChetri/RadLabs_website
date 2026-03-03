'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {

    // Sync Lenis scroll with GSAP ScrollTrigger
    useLenis((lenis) => {
        ScrollTrigger.update();
    });

    useEffect(() => {
        // Ensure ScrollTrigger uses Lenis for its internal calculations
        gsap.ticker.add((time) => {
            // we don't need to manually call lenis.raf here because ReactLenis handles it internally,
            // but we do want to make sure GSAP ticker is synced with the browser paint.
        });

        return () => {
            gsap.ticker.remove(() => { });
        };
    }, []);

    return (
        <ReactLenis root options={{
            lerp: 0.05,
            duration: 1.5,
            smoothWheel: true,
            syncTouch: false // Crucial: false allows native mobile scroll to fire ScrollTrigger correctly
        }}>
            {children}
        </ReactLenis>
    );
}
