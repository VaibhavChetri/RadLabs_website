'use client';

import React from 'react';
import * as Icons from 'lucide-react';

interface CoreServiceCardProps {
    label: string;
    iconName: string;
    index: number;
}

export function CoreServiceCard({ label, iconName, index }: CoreServiceCardProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Icon = (Icons as any)[
        iconName.split('-').map((part: string) => part.charAt(0).toUpperCase() + part.slice(1)).join('')
    ] || Icons.Cpu;

    return (
        <div
            className="core-service-card group relative w-full [perspective:1000px] cursor-pointer"
        >
            {/* Animated Glowing Border (Conic Gradient) */}
            <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-transparent via-[var(--color-fire-neon)] to-transparent opacity-0 group-hover:opacity-100 blur-[2px] transform-gpu group-hover:animate-background-pan transition-opacity duration-500" />

            {/* Glassmorphic Panel Core */}
            <div className="relative h-full flex flex-col items-center justify-center p-8 lg:p-12 gap-6 bg-[#0A0A0A] border border-[var(--color-border-subtle)] group-hover:bg-[#0F0F0F] rounded-xl backdrop-blur-xl overflow-hidden transition-all duration-500">

                {/* Background Tech Diagram overlay (fades in on hover) */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(255,51,51,0.2)_0%,transparent_100%)]" />
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500"
                    style={{
                        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}
                />

                {/* Floating Icon with reflection */}
                <div className="relative">
                    <div className="absolute inset-0 bg-[var(--color-fire-neon)] blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-full" />
                    <Icon className="relative w-10 h-10 lg:w-12 lg:h-12 text-[var(--color-text-secondary)] group-hover:text-[var(--color-fire-neon)] transform group-hover:-translate-y-2 group-hover:scale-110 transition-all duration-500 z-10" />
                </div>

                {/* Typography */}
                <h4 className="font-serif text-lg lg:text-xl text-center tracking-wide text-white group-hover:text-[var(--color-fire-neon)] transition-colors duration-300 z-10">
                    {label}
                </h4>

                {/* Data stream dots at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-fire-neon)] to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
            </div>
        </div>
    );
}
