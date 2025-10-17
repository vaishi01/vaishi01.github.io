"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

interface BeamsBackgroundProps {
    className?: string;
    children?: React.ReactNode;
    intensity?: "subtle" | "medium" | "strong";
    theme?: "light" | "dark";
}

interface Beam {
    x: number;
    y: number;
    width: number;
    length: number;
    angle: number;
    speed: number;
    opacity: number;
    color: string;
    pulse: number;
    pulseSpeed: number;
}

function createBeam(width: number, height: number, theme: string): Beam {
    const angle = -35 + Math.random() * 10;
    
    // Pre-defined vibrant colors for light mode
    const lightModeColors = [
        'rgba(255, 20, 147, 0.4)',   // Deep Pink
        'rgba(138, 43, 226, 0.4)',  // Blue Violet
        'rgba(75, 0, 130, 0.4)',    // Indigo
        'rgba(0, 191, 255, 0.4)',   // Deep Sky Blue
        'rgba(255, 69, 0, 0.4)',    // Red Orange
        'rgba(255, 20, 147, 0.4)',  // Deep Pink
    ];
    
    const darkModeColors = [
        'rgba(0, 255, 255, 0.3)',   // Cyan
        'rgba(0, 191, 255, 0.3)',  // Deep Sky Blue
        'rgba(30, 144, 255, 0.3)',  // Dodger Blue
    ];
    
    const colors = theme === 'light' ? lightModeColors : darkModeColors;
    
    return {
        x: Math.random() * width * 1.5 - width * 0.25,
        y: Math.random() * height * 1.5 - height * 0.25,
        width: 40 + Math.random() * 60,
        length: height * 1.2,
        angle: angle,
        speed: 0.2 + Math.random() * 0.3,
        opacity: theme === 'light' ? 0.4 + Math.random() * 0.3 : 0.2 + Math.random() * 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
    };
}

export function BeamsBackground({
    className,
    children,
    intensity = "medium",
    theme = "light",
}: BeamsBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const beamsRef = useRef<Beam[]>([]);
    const animationFrameRef = useRef<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const MINIMUM_BEAMS = 12;

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const updateCanvasSize = () => {
            const containerRect = container.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            
            canvas.width = containerRect.width * dpr;
            canvas.height = containerRect.height * dpr;
            canvas.style.width = `${containerRect.width}px`;
            canvas.style.height = `${containerRect.height}px`;
            ctx.scale(dpr, dpr);

            // Create beams
            beamsRef.current = Array.from({ length: MINIMUM_BEAMS }, () =>
                createBeam(containerRect.width, containerRect.height, theme)
            );
        };

        updateCanvasSize();
        window.addEventListener("resize", updateCanvasSize);

        function resetBeam(beam: Beam) {
            const containerRect = container?.getBoundingClientRect();
            if (!containerRect) return beam;

            beam.y = containerRect.height + 100;
            beam.x = Math.random() * containerRect.width;
            
            // Recreate with new color for current theme
            const newBeam = createBeam(containerRect.width, containerRect.height, theme);
            beam.color = newBeam.color;
            beam.opacity = newBeam.opacity;
            
            return beam;
        }

        function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
            ctx.save();
            ctx.translate(beam.x, beam.y);
            ctx.rotate((beam.angle * Math.PI) / 180);

            // Simple solid color with pulsing opacity
            const pulsingOpacity = beam.opacity * (0.7 + Math.sin(beam.pulse) * 0.3);
            
            // Create gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
            
            if (theme === 'light') {
                // Vibrant solid colors for light mode
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
                gradient.addColorStop(0.1, beam.color.replace('0.4', String(pulsingOpacity * 0.5)));
                gradient.addColorStop(0.5, beam.color.replace('0.4', String(pulsingOpacity)));
                gradient.addColorStop(0.9, beam.color.replace('0.4', String(pulsingOpacity * 0.5)));
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            } else {
                // Cyan beams for dark mode
                gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
                gradient.addColorStop(0.1, beam.color.replace('0.3', String(pulsingOpacity * 0.5)));
                gradient.addColorStop(0.5, beam.color.replace('0.3', String(pulsingOpacity)));
                gradient.addColorStop(0.9, beam.color.replace('0.3', String(pulsingOpacity * 0.5)));
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            }

            ctx.fillStyle = gradient;
            ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
            ctx.restore();
        }

        function animate() {
            const containerRect = container?.getBoundingClientRect();
            if (!canvas || !ctx || !containerRect) return;

            ctx.clearRect(0, 0, containerRect.width, containerRect.height);
            
            // Less blur for better visibility
            ctx.filter = theme === 'light' ? "blur(15px)" : "blur(25px)";

            beamsRef.current.forEach((beam) => {
                beam.y -= beam.speed;
                beam.pulse += beam.pulseSpeed;

                if (beam.y + beam.length < -100) {
                    resetBeam(beam);
                }

                drawBeam(ctx, beam);
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener("resize", updateCanvasSize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [theme]);

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative h-[50vh] w-full overflow-hidden",
                theme === "dark" ? "bg-black" : "bg-white",
                className
            )}
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0"
                style={{ filter: theme === 'light' ? "blur(10px)" : "blur(15px)" }}
            />

            {/* Subtle overlay */}
            <div className={cn(
                "absolute inset-0",
                theme === "dark" ? "bg-black/5" : "bg-white/10"
            )} />

            <div className="relative z-10 h-full w-full flex items-center justify-center">
                {children}
            </div>
        </div>
    );
}
