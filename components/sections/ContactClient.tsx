'use client';

import { useRef, useState } from 'react';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap } from 'gsap';

export function ContactClient({ email, children }: { email: string; children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    useScrollTrigger(containerRef, undefined, {
        onEnter: () => {
            if (prefersReducedMotion || !containerRef.current) return;

            const elements = containerRef.current.querySelectorAll('.contact-animate');

            gsap.fromTo(elements,
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                }
            );
        },
        once: true
    });

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy email:', err);
        }
    };

    return (
        <div ref={containerRef} className="w-full flex flex-col items-center z-10 relative">
            {/* Background decoration elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,var(--color-fire-core)_0%,transparent_50%)] opacity-10 pointer-events-none blur-3xl z-0" />

            <div className="relative z-10 flex flex-col items-center w-full">
                {children}

                {/* The Copy Email Button is client-side interactive */}
                <div className="contact-animate flex flex-col items-center mt-12 opacity-0">
                    <button
                        onClick={handleCopyEmail}
                        className="group relative flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-white transition-colors"
                    >
                        <span className="font-mono text-sm tracking-wider border-b border-white/20 pb-1 group-hover:border-white transition-colors">
                            {email}
                        </span>
                        <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>

                        {/* Toast Notification */}
                        <div className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-black text-xs font-mono rounded opacity-0 transition-opacity duration-300 ${copied ? 'opacity-100' : ''}`}>
                            Copied!
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
