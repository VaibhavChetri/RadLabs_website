'use client';

import React, { useRef, useState, MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import { TechCategory } from '@/types';

interface TechCategoryCardProps {
    category: TechCategory;
    className?: string;
}

export function TechCategoryCard({ category, className }: TechCategoryCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });

        // Calculate 3D rotation
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg rotation
        const rotateY = ((x - centerX) / centerX) * 10;

        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (!cardRef.current) return;
        cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            onTouchStart={(e) => {
                const touch = e.touches[0];
                if (!touch || !cardRef.current) return;
                setIsHovered(true);
                const rect = cardRef.current.getBoundingClientRect();
                setMousePosition({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
            }}
            onTouchEnd={() => {
                setIsHovered(false);
                if (cardRef.current) {
                    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                }
            }}
            className={cn(
                "tech-card group relative flex flex-col p-6 md:p-8 rounded-xl border border-white/5 bg-[#050505] overflow-hidden transition-all duration-300 ease-out",
                className
            )}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Spotlight that follows mouse */}
            <div
                className="pointer-events-none absolute -inset-px rounded-xl transition duration-300"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,51,51,0.15), transparent 40%)`
                }}
            />

            {/* Glowing Border Spotlight masking */}
            <div
                className="pointer-events-none absolute inset-0 rounded-xl border border-transparent transition duration-300"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,51,51,0.8), transparent 40%) border-box`,
                    WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                }}
            />

            {/* Content Container (lifted up in 3D perspective) */}
            <div className="relative z-10 flex flex-col h-full transform-gpu" style={{ transform: 'translateZ(30px)' }}>
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/5 relative">
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-md bg-[var(--color-fire-core)]/20 border border-[var(--color-fire-neon)]/30 shadow-[0_0_15px_rgba(255,51,51,0.2)] group-hover:bg-[var(--color-fire-neon)] transition-colors duration-500">
                        <div className="absolute w-full h-full rounded-md bg-[var(--color-fire-neon)] opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300" />
                        <div className="absolute w-2 h-2 rounded-full bg-[var(--color-fire-neon)] group-hover:bg-white animate-ping opacity-75 transition-colors" />
                        <div className="relative w-2 h-2 rounded-full bg-[var(--color-fire-neon)] group-hover:bg-white transition-colors" />
                    </div>
                    <h4 className="font-mono text-sm md:text-base font-bold tracking-widest text-white uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_10px_rgba(255,51,51,0.5)] group-hover:text-white transition-all duration-300">
                        {category.category}
                    </h4>
                </div>

                <div className="flex flex-wrap gap-2 md:gap-3 mt-auto transform-gpu" style={{ transform: 'translateZ(20px)' }}>
                    {category.technologies.map((tech, idx) => (
                        <span
                            key={tech.id}
                            className="tech-pill relative px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-mono text-[var(--color-text-secondary)] bg-white/5 border border-white/10 rounded-md overflow-hidden transition-all hover:delay-0 hover:text-white hover:border-[var(--color-fire-neon)] hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,51,51,0.5)] hover:bg-[var(--color-fire-core)]/20 cursor-crosshair z-10 hover:z-20"
                            style={{
                                transitionDuration: '400ms',
                                transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                            }}
                        >
                            {tech.name}
                        </span>
                    ))}
                </div>
            </div>

            {/* Background Tech Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] group-hover:opacity-10 transition-opacity bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:24px_24px] z-0" />
        </div>
    );
}
