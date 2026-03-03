'use client';

import React, { useRef, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
}

export function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        // Disabled only if reduced motion is preferred (but we now force this to false globally)
        if (prefersReducedMotion || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            const particleCount = Math.floor(window.innerWidth / 30); // increased density for all screens
            particles = [];

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 1.5 + 0.5,
                    color: Math.random() > 0.8 ? 'rgba(255, 51, 51, 0.8)' : 'rgba(255, 255, 255, 0.4)'
                });
            }
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update positions
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off walls
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            });

            // Draw connections (Neural network aesthetic)
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        const opacity = 1 - distance / 150;
                        // slightly red tint for connections if one node is red
                        const isRedConnection = particles[i].color.includes('255, 51, 51') || particles[j].color.includes('255, 51, 51');
                        ctx.strokeStyle = isRedConnection
                            ? `rgba(255, 51, 51, ${opacity * 0.3})`
                            : `rgba(255, 255, 255, ${opacity * 0.15})`;

                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw nodes
            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(drawParticles);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        drawParticles();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [prefersReducedMotion]);

    if (prefersReducedMotion) return null;

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-[1] w-full h-full pointer-events-none mix-blend-screen opacity-60"
        />
    );
}
