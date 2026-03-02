import React from 'react';

export function GridLines() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.03]">
            {/* Background ruling */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
            linear-gradient(to right, #FFFFFF 1px, transparent 1px),
            linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)
          `,
                    backgroundSize: '100px 100px'
                }}
            />

            {/* Subtle glowing scan line sweeping top to bottom infinitely */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-[var(--color-fire-neon)] shadow-[0_0_10px_var(--color-fire-neon)] animate-[scan_8s_linear_infinite]" />
        </div>
    );
}
