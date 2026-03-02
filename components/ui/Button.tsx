import React from 'react';
import { cn } from '@/lib/utils';
import { CtaButton } from '@/types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    cta?: CtaButton;
    variant?: 'primary' | 'secondary' | 'ghost';
    href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', cta, children, href, ...props }, ref) => {

        // Auto-map variant and children if CtaButton object is provided
        const btnVariant = cta?.variant || variant;
        const btnLabel = cta?.label || children;
        const btnHref = cta?.href || href;

        const baseStyles = 'inline-flex items-center justify-center font-mono uppercase tracking-widest text-xs px-8 py-4 transition-all duration-300 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[var(--color-fire-neon)]';

        const variants = {
            primary: 'bg-[var(--color-fire-neon)] text-white hover:bg-[var(--color-fire-deep)] shadow-[0_0_20px_rgba(255,51,51,0.4)] hover:shadow-[0_0_30px_rgba(255,51,51,0.6)] border border-transparent',
            secondary: 'bg-white/10 text-white hover:bg-white/20 border border-[var(--color-border-subtle)] backdrop-blur-sm',
            ghost: 'bg-transparent text-[var(--color-text-muted)] hover:text-white border border-transparent hover:border-[var(--color-border-subtle)]'
        };

        const content = (
            <>
                <span className="relative z-10">{btnLabel}</span>
                {btnVariant === 'primary' && (
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000" />
                )}
            </>
        );

        if (btnHref) {
            return (
                <a
                    href={btnHref}
                    className={cn(baseStyles, variants[btnVariant], className)}
                // If it's a hash link, it will hook into Lenis inherently via the browser, or we can use custom onClick scroll
                >
                    {content}
                </a>
            );
        }

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[btnVariant], className)}
                {...props}
            >
                {content}
            </button>
        );
    }
);

Button.displayName = 'Button';
