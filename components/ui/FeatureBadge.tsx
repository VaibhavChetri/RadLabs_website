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
        <div className="flex items-center gap-3 px-4 py-3 bg-[#121212] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-red)] transition-colors group">
            <Icon className="w-4 h-4 text-[var(--color-fire-neon)] group-hover:scale-110 transition-transform" />
            <span className="font-mono text-[10px] md:text-xs tracking-wider text-[var(--color-text-secondary)] whitespace-nowrap">
                {label}
            </span>
        </div>
    );
}
