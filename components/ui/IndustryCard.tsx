import React from 'react';
import { cn } from '@/lib/utils';
import { IndustryItem } from '@/types';
import * as Icons from 'lucide-react';

interface IndustryCardProps {
    industry: IndustryItem;
    index: number;
    className?: string;
}

export function IndustryCard({ industry, index, className }: IndustryCardProps) {
    // Resolve icon
    const iconComponentName = industry.icon
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Icon = (Icons as any)[iconComponentName] || Icons.Box;

    // Next.js Image component not strictly required if we want to use generic CSS background images 
    // for atmospheric placeholders, but we'll use a semantic img tag with error handling for now.

    return (
        <div
            className={cn(
                "industry-card group relative h-[400px] md:h-[500px] overflow-hidden border border-[var(--color-border-subtle)] bg-[#0A0A0A]",
                className
            )}
        >
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
                <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 saturate-0 contrast-125 opacity-30 group-hover:opacity-100"
                    style={{ backgroundImage: `url(${industry.imageUrl})` }}
                />
                {/* Red Overlay on Hover */}
                <div className="absolute inset-0 bg-[var(--color-fire-core)]/40 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col p-8 md:p-10 justify-end transform transition-transform duration-500 group-hover:-translate-y-4">

                <div className="w-12 h-12 mb-6 border border-white/10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
                    <Icon className="w-5 h-5 text-white group-hover:text-[var(--color-fire-neon)] transition-colors" />
                </div>

                <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">
                    {industry.title}
                </h3>

                {/* The description is hidden until hover via opacity/transform */}
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed max-w-sm h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                    {industry.description}
                </p>

                <div className="absolute top-8 right-8 font-mono text-xs text-[var(--color-text-muted)] group-hover:text-[var(--color-fire-neon)] transition-colors">
                    0{index + 1} //
                </div>
            </div>
        </div>
    );
}
