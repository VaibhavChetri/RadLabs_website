import React from 'react';
import { cn } from '@/lib/utils';
import { TechCategory } from '@/types';

interface TechCategoryCardProps {
    category: TechCategory;
    className?: string;
}

export function TechCategoryCard({ category, className }: TechCategoryCardProps) {
    return (
        <div
            className={cn(
                "tech-card group flex flex-col p-6 md:p-8 border border-[var(--color-border-subtle)] bg-[#0A0A0A]",
                "hover:border-[var(--color-fire-neon)]/50 transition-colors duration-500",
                className
            )}
        >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--color-border-subtle)]">
                <div className="w-2 h-2 rounded-full bg-[var(--color-fire-neon)] animate-pulse" />
                <h4 className="font-mono text-sm tracking-wider text-[var(--color-text-primary)] uppercase">
                    {category.category}
                </h4>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto">
                {category.technologies.map((tech) => (
                    <span
                        key={tech.id}
                        className="tech-pill px-3 py-1.5 text-xs font-mono text-[var(--color-text-secondary)] bg-white/5 border border-white/10 group-hover:bg-[var(--color-fire-core)]/20 group-hover:text-white group-hover:border-[var(--color-fire-neon)]/30 transition-all duration-300"
                    >
                        {tech.name}
                    </span>
                ))}
            </div>
        </div>
    );
}
