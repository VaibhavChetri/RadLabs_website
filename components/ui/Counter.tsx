'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

interface CounterProps {
    target: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}

export function Counter({ target, suffix = '', prefix = '', duration = 1.5, className }: CounterProps) {
    const numberRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    // We use GSAP to animate a proxy object, then update the DOM to avoid React re-render overhead during animation
    useScrollTrigger(containerRef, undefined, {
        onEnter: () => {
            if (prefersReducedMotion || !numberRef.current) {
                if (numberRef.current) {
                    numberRef.current.innerText = `${prefix}${target}${suffix}`;
                }
                return;
            }

            const formatNumber = (val: number) => {
                // If it's a whole number, keep it whole. If it has decimals, keep them.
                return val % 1 !== 0 ? val.toFixed(1) : Math.floor(val).toString();
            };

            const proxy = { val: 0 };
            gsap.to(proxy, {
                val: target,
                duration: duration,
                ease: 'power3.out',
                onUpdate: () => {
                    if (numberRef.current) {
                        numberRef.current.innerText = `${prefix}${formatNumber(proxy.val)}${suffix}`;
                    }
                },
                onComplete: () => {
                    if (numberRef.current) {
                        numberRef.current.innerText = `${prefix}${target}${suffix}`;
                    }
                }
            });
        },
        once: true
    });

    return (
        <div ref={containerRef} className={cn("inline-block", className)}>
            <span
                ref={numberRef}
                className="font-serif italic text-6xl md:text-[96px] lg:text-[120px] text-[var(--color-fire-neon)] leading-none tabular-nums"
                style={{ textShadow: '0 0 40px rgba(255, 51, 51, 0.4)' }}
            >
                {prefersReducedMotion ? `${prefix}${target}${suffix}` : `${prefix}0${suffix}`}
            </span>
        </div>
    );
}
