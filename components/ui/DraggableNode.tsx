'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/all';
import { useReducedMotion } from '@/hooks/useReducedMotion';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(Draggable);
}

export interface DraggableNodeProps {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    initialPosition: { x: number; y: number };
}

export function DraggableNode({ title, description, icon, initialPosition }: DraggableNodeProps) {
    const nodeRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (!nodeRef.current || prefersReducedMotion) return;

        // Set initial scatter position
        gsap.set(nodeRef.current, {
            x: initialPosition.x,
            y: initialPosition.y,
            opacity: 0,
            scale: 0,
            rotateZ: gsap.utils.random(-15, 15)
        });

        // Entrance animation
        gsap.to(nodeRef.current, {
            opacity: 1,
            scale: 1,
            rotateZ: 0,
            duration: 1.2,
            delay: gsap.utils.random(0.5, 1.5),
            ease: "elastic.out(1, 0.5)"
        });

        // Initialize Draggable with bouncy physics feeling
        const draggables = Draggable.create(nodeRef.current, {
            type: "x,y",
            bounds: typeof window !== 'undefined' ? window : '#hero',
            inertia: true,
            onPress: function () {
                gsap.to(this.target, { scale: 1.05, boxShadow: "0px 0px 40px rgba(255, 23, 68, 0.4)", duration: 0.2 });
            },
            onRelease: function () {
                gsap.to(this.target, { scale: 1, boxShadow: "0px 0px 0px rgba(255, 23, 68, 0)", duration: 0.4, ease: "back.out(2)" });
            }
        });

        // Add subtle floating animation loop when not dragging
        const floatTween = gsap.to(nodeRef.current, {
            y: `+=${gsap.utils.random(10, 20)}`,
            x: `+=${gsap.utils.random(-10, 10)}`,
            duration: gsap.utils.random(2, 4),
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });

        return () => {
            draggables[0]?.kill();
            floatTween.kill();
        };
    }, [initialPosition, prefersReducedMotion]);

    return (
        <div
            ref={nodeRef}
            className="absolute z-20 cursor-grab active:cursor-grabbing w-64 glass-card p-5 rounded-2xl border border-[var(--color-border-subtle)] bg-[#0a0a0a]/60 backdrop-blur-xl shadow-2xl flex flex-col gap-3 group transition-colors duration-300 hover:border-[var(--color-fire-neon)]/50"
            style={{ touchAction: 'none' }} // Crucial for mobile dragging
        >
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-fire-deep)]/20 flex items-center justify-center text-[var(--color-fire-neon)] group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                <div className="font-mono text-xs text-white/50 tracking-widest break-all">
                    NODE_{Math.random().toString(36).substring(2, 8).toUpperCase()}
                </div>
            </div>

            <h3 className="font-sans font-bold text-[var(--color-text-primary)] text-lg leading-tight">
                {title}
            </h3>

            <p className="font-sans text-xs text-[var(--color-text-secondary)] leading-relaxed">
                {description}
            </p>

            {/* Decorative connector ports */}
            <div className="absolute top-1/2 -left-2 w-4 h-4 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-brand-black)] -translate-y-1/2 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-fire-neon)] opacity-30 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="absolute top-1/2 -right-2 w-4 h-4 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-brand-black)] -translate-y-1/2 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-fire-neon)] opacity-30 group-hover:opacity-100 transition-opacity" />
            </div>
        </div>
    );
}
