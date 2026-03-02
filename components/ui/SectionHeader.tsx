import React from 'react';
import { cn } from '@/lib/utils';
import { SplitText } from '@/components/ui/SplitText';

interface SectionHeaderProps {
    eyebrow: string;
    headline: string;
    highlightWords?: readonly string[];
    className?: string;
}

export const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
    ({ eyebrow, headline, highlightWords = [], className }, ref) => {
        return (
            <div ref={ref} className={cn('flex flex-col mb-16 md:mb-24', className)}>
                <div className="font-mono text-sm tracking-[0.2em] text-[var(--color-fire-neon)] font-bold mb-6 opacity-0 section-eyebrow">
                    [ {eyebrow} ]
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[var(--color-text-primary)] leading-tight section-headline">
                    <SplitText
                        text={headline}
                        highlightWords={highlightWords}
                        highlightClass="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-fire-neon)] to-[var(--color-fire-deep)] font-serif italic pr-[0.1em]"
                    />
                </h2>
            </div>
        );
    }
);

SectionHeader.displayName = 'SectionHeader';
