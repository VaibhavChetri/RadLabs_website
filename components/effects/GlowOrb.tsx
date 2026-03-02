'use client';

import { useRef, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function GlowOrb() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let angle = 0;

        const resizeCanvas = () => {
            // Fit to container
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }
        };

        const drawOrb = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const maxRadius = Math.min(centerX, centerY) * 0.8;

            // Draw flowing data streams
            for (let i = 0; i < 5; i++) {
                const radius = maxRadius - (i * 25);
                if (radius <= 0) continue;

                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);

                // Gradient stroke
                const gradient = ctx.createLinearGradient(
                    centerX + Math.cos(angle + i) * radius,
                    centerY + Math.sin(angle + i) * radius,
                    centerX - Math.cos(angle + i) * radius,
                    centerY - Math.sin(angle + i) * radius
                );

                gradient.addColorStop(0, 'rgba(255, 51, 51, 0.8)'); // Neon Red
                gradient.addColorStop(0.5, 'rgba(255, 51, 51, 0.1)');
                gradient.addColorStop(1, 'transparent');

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2 + (i * 0.5);
                ctx.stroke();

                // Draw data 'packets' (small dots on the rings)
                const dotAngle = angle * (i % 2 === 0 ? 1.5 : -2) + i * 45;
                const dotX = centerX + Math.cos(dotAngle) * radius;
                const dotY = centerY + Math.sin(dotAngle) * radius;

                ctx.beginPath();
                ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
                ctx.fillStyle = '#FFFFFF';
                ctx.fill();
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#FF3333';
            }

            ctx.shadowBlur = 0; // reset
            angle += 0.01;
            animationFrameId = requestAnimationFrame(drawOrb);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        drawOrb();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [prefersReducedMotion]);

    // Fallback static or reduced motion visual
    if (prefersReducedMotion) {
        return (
            <div className="w-full h-full flex items-center justify-center opacity-30">
                <div className="w-64 h-64 rounded-full border-2 border-[var(--color-fire-neon)] flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full border border-white/20" />
                </div>
            </div>
        );
    }

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full mix-blend-screen opacity-80"
        />
    );
}
