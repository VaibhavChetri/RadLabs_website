import React from 'react';
import { cn } from '@/lib/utils';
import * as Icons from 'lucide-react';

interface CardProps {
    title: string;
    description: string;
    iconName: string;
    tags?: readonly string[];
    className?: string;
    index: number;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ title, description, iconName, tags = [], className, index }, ref) => {

        // Dynamically resolve icon from string
        const iconComponentName = iconName
            .split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('');

        // Fallback to Code2 if not found
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Icon = (Icons as any)[iconComponentName] || Icons.Code2;

        return (
            <div
                ref={ref}
                className={cn(
                    "group relative flex flex-col p-8 md:p-10",
                    "bg-[#1A1A1A] border border-[var(--color-border-subtle)] overflow-hidden",
                    "hover:border-[var(--color-border-red)] transition-all duration-500",
                    "hover:-translate-y-1 hover:shadow-[0_10px_40px_-15px_rgba(255,51,51,0.2)]",
                    "bento-card", // class for stagger targeting
                    className
                )}
            >
                {/* Subtle hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-fire-deep)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />

                {/* Icon Circle */}
                <div className="relative mb-8 w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[var(--color-fire-deep)]/20 group-hover:border-[var(--color-border-red)] transition-colors duration-300">
                    <Icon className="w-6 h-6 text-[var(--color-text-secondary)] group-hover:text-[var(--color-fire-neon)] transition-colors duration-300 transform group-hover:rotate-12 group-hover:scale-110" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1">
                    <div className="font-mono text-[10px] text-[var(--color-text-muted)] tracking-widest mb-3">0{index + 1} //</div>
                    <h3 className="text-2xl font-serif text-[var(--color-text-primary)] mb-4">{title}</h3>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm max-w-sm mb-8">
                        {description}
                    </p>
                </div>

                {/* Tags */}
                <div className="relative z-10 flex flex-wrap gap-2 mt-auto pt-6 border-t border-[var(--color-border-subtle)] group-hover:border-white/10 transition-colors">
                    {tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className="text-[10px] uppercase tracking-wider font-mono px-3 py-1 bg-white/5 text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)] transition-colors"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        );
    }
);

Card.displayName = 'Card';
