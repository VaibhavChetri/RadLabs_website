import React from 'react';
import * as Icons from 'lucide-react';

interface FeatureBadgeProps {
    label: string;
    iconName: string;
}

export function FeatureBadge({ label, iconName }: FeatureBadgeProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Icon = (Icons as any)[
        iconName.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('')
    ] || Icons.CheckCircle;

    return (
        <div className="feature-badge-item opacity-0 flex items-center gap-4 px-6 md:px-8 py-4 md:py-5 bg-[#121212] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-red)] hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(255,51,51,0.2)] transition-all duration-300 group cursor-default rounded-sm">
            <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-[var(--color-fire-neon)] group-hover:scale-110 group-hover:animate-pulse transition-transform" />
            <span className="font-mono text-xs md:text-sm lg:text-base tracking-widest text-[var(--color-text-secondary)] group-hover:text-white transition-colors whitespace-nowrap">
                {label}
            </span>
        </div>
    );
}
