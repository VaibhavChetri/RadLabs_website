import React from 'react';

export function FlameLogo({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 120"
            fill="none"
            className={className}
        >
            <path
                d="M50 0C50 0 20 20 10 50C0 80 20 110 50 120C80 110 100 80 90 50C80 20 50 0 50 0Z"
                fill="currentColor"
            />
            <path
                d="M50 30C50 30 35 45 30 65C25 85 40 105 50 110C60 105 75 85 70 65C65 45 50 30 50 30Z"
                fill="var(--color-brand-black)"
            />
            <path
                d="M50 60C50 60 45 70 42 80C40 90 45 100 50 102C55 100 60 90 58 80C55 70 50 60 50 60Z"
                fill="currentColor"
            />
        </svg>
    );
}
