import React from 'react';

interface SplitTextProps {
    text: string;
    className?: string;
    highlightWords?: readonly string[];
    highlightClass?: string;
}

export function SplitText({
    text,
    className = '',
    highlightWords = [],
    highlightClass = 'text-[var(--color-fire-neon)] font-semibold'
}: SplitTextProps) {

    // Custom fallback for GSAP SplitText plugin
    // Splits lines by '\n', then words by space.

    // Normalize literal "\n" strings that might be passed incorrectly via JSX string props
    const normalizedText = text.replace(/\\n/g, '\n');
    const lines = normalizedText.split('\n');

    return (
        <div className={`split-text-container ${className}`}>
            {lines.map((line, lineIdx) => {
                const words = line.split(' ');

                return (
                    <div key={`line-${lineIdx}`} className="overflow-hidden inline-block w-full">
                        {words.map((word, wordIdx) => {
                            // Strip punctuation for matching highlight words
                            const cleanWord = word.replace(/[.,!?&]/g, '').toLowerCase();
                            const isHighlighted = highlightWords.map(w => w.toLowerCase()).includes(cleanWord);

                            return (
                                <span
                                    key={`word-${lineIdx}-${wordIdx}`}
                                    className={`inline-block mr-[0.25em] whitespace-nowrap split-word ${isHighlighted ? highlightClass : ''}`}
                                >
                                    {word}
                                </span>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}
