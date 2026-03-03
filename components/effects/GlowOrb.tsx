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
            const maxRadius = Math.min(centerX, centerY) * 0.85;

            // 7 Rings of Chakravyuha (Labyrinth)
            for (let i = 1; i <= 7; i++) {
                const r = maxRadius * (i / 7);
                if (r <= 0) continue;

                ctx.beginPath();
                // Broken arcs to simulate a complex labyrinth
                const dashLength = Math.PI * r * 0.25;
                const gapLength = Math.PI * r * 0.05;
                ctx.setLineDash([dashLength, gapLength]);
                // Alternate rotation directions for each ring
                ctx.lineDashOffset = angle * (i % 2 === 0 ? 1 : -1) * 30;
                ctx.arc(centerX, centerY, r, 0, Math.PI * 2);

                // Color gets brighter and more red towards the center
                const alpha = 0.5 - (i * 0.05);
                ctx.strokeStyle = `rgba(255, 51, 51, ${alpha})`;
                ctx.lineWidth = 1 + (7 - i) * 0.3;
                ctx.stroke();
            }
            ctx.setLineDash([]); // Reset dash for nodes

            // Define the three integrated systems: Data (Outer), Logic (Middle), AI (Core)
            const systems = [
                { label: 'DATA', level: 7, speedMultiplier: 0.8, color: '#A0A0A0' }, // Outer ring
                { label: 'LOGIC', level: 4, speedMultiplier: -1.2, color: '#FFFFFF' }, // Middle ring
                { label: 'AI', level: 1.5, speedMultiplier: 1.5, color: '#FF3333' }, // Inner core
            ];

            // Calculate current orbital positions
            const positions = systems.map((sys, idx) => {
                const r = maxRadius * (sys.level / 7);
                // Offset angles so they aren't clumped together initially
                const orbitalAngle = (angle * sys.speedMultiplier) + (idx * Math.PI * 0.6);
                return {
                    x: centerX + Math.cos(orbitalAngle) * r,
                    y: centerY + Math.sin(orbitalAngle) * r,
                    ...sys
                };
            });

            // Draw integration connection lines between Data -> Logic -> AI
            ctx.beginPath();
            ctx.moveTo(positions[0].x, positions[0].y); // Data
            ctx.lineTo(positions[1].x, positions[1].y); // Logic
            ctx.lineTo(positions[2].x, positions[2].y); // AI

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw glowing data packets traveling along the connection lines
            const travelProgress = (angle * 2) % 1; // 0 to 1 loop
            const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

            // Packet from Data to Logic
            ctx.beginPath();
            ctx.arc(lerp(positions[0].x, positions[1].x, travelProgress), lerp(positions[0].y, positions[1].y, travelProgress), 2, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            // Packet from Logic to AI
            ctx.arc(lerp(positions[1].x, positions[2].x, travelProgress), lerp(positions[1].y, positions[2].y, travelProgress), 2, 0, Math.PI * 2);
            ctx.fill();

            // Draw the System Nodes and Labels
            positions.forEach((pos) => {
                ctx.shadowBlur = 15;
                ctx.shadowColor = pos.color;

                // Glowing Node
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2);
                ctx.fillStyle = pos.color;
                ctx.fill();

                // Typography
                ctx.font = 'bold 11px monospace';
                ctx.fillStyle = pos.color;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(pos.label, pos.x, pos.y - 12); // Label above the dot

                ctx.shadowBlur = 0; // Reset shadow
            });

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
