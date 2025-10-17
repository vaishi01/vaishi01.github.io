"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';

// A utility function for class names
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

// The main hero component
const AetherFlowHero = () => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Detect theme changes
    useEffect(() => {
        const checkTheme = () => {
            const isDark = document.documentElement.classList.contains('dark');
            setIsDarkMode(isDark);
        };

        checkTheme();
        
        // Watch for theme changes
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        let animationFrameId: number;
        let particles: Particle[] = [];
        const mouse = { x: null as number | null, y: null as number | null, radius: 200 };

        // Moved Particle class definition here to avoid initialization errors
        class Particle {
            x: number;
            y: number;
            directionX: number;
            directionY: number;
            size: number;
            color: string;

            constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                if (!canvas) return;
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }

                // Mouse collision detection
                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius + this.size) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouse.radius - distance) / mouse.radius;
                        this.x -= forceDirectionX * force * 5;
                        this.y -= forceDirectionY * force * 5;
                    }
                }

                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            if (!canvas) return;
            particles = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((window.innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((window.innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 0.4) - 0.2;
                let directionY = (Math.random() * 0.4) - 0.2;
                // Black particles for light mode, white particles for dark mode
                let color = isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
                particles.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        const resizeCanvas = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init(); 
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const connect = () => {
            if (!canvas || !ctx) return;
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
                        + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
                    
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        
                        let dx_mouse_a = particles[a].x - (mouse.x ?? 0);
                        let dy_mouse_a = particles[a].y - (mouse.y ?? 0);
                        let distance_mouse_a = Math.sqrt(dx_mouse_a*dx_mouse_a + dy_mouse_a*dy_mouse_a);

                        if (mouse.x && distance_mouse_a < mouse.radius) {
                             // Highlight color on mouse hover
                             ctx.strokeStyle = isDarkMode 
                                ? `rgba(255, 255, 255, ${opacityValue})` 
                                : `rgba(0, 0, 0, ${opacityValue})`;
                        } else {
                             // Normal line color: black in light mode, white in dark mode
                             ctx.strokeStyle = isDarkMode 
                                ? `rgba(255, 255, 255, ${opacityValue * 0.6})` 
                                : `rgba(0, 0, 0, ${opacityValue * 0.6})`;
                        }
                        
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            if (!canvas || !ctx) return;
            animationFrameId = requestAnimationFrame(animate);
            // Set the background color based on theme
            ctx.fillStyle = isDarkMode ? 'black' : 'white';
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            connect();
        };
        
        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };
        
        const handleMouseOut = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);

        init();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isDarkMode]);

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2 + 0.5,
                duration: 0.8,
                ease: "easeInOut",
            },
        }),
    };

    return (
        // Updated to h-[50vh] to match Contact page hero section
        <div className="relative h-[50vh] w-full flex flex-col items-center justify-center overflow-hidden">
            {/* The canvas is now the primary background */}
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full"></canvas>
            
            {/* Overlay HTML Content */}
            <div className="relative z-10 text-center p-6">
                <motion.div
                    custom={0}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className={cn(
                        "inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm",
                        isDarkMode 
                            ? "bg-purple-500/10 border border-purple-500/20" 
                            : "bg-purple-100/50 border border-purple-300/50"
                    )}
                >
                    <Zap className={cn("h-4 w-4", isDarkMode ? "text-purple-400" : "text-purple-600")} />
                    <span className={cn("text-sm font-medium", isDarkMode ? "text-gray-200" : "text-gray-800")}>
                        Innovation in Action
                    </span>
                </motion.div>

                <motion.h1
                    custom={1}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className={cn(
                        "text-5xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent",
                        isDarkMode 
                            ? "bg-gradient-to-b from-white to-gray-400" 
                            : "bg-gradient-to-b from-gray-900 to-gray-600"
                    )}
                >
                    My Projects
                </motion.h1>

                <motion.p
                    custom={2}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className={cn(
                        "max-w-2xl mx-auto text-lg mb-10",
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                    )}
                >
                    A showcase of my work in web development, consulting solutions, and innovative applications that push the boundaries of digital experiences.
                </motion.p>

                <motion.div
                    custom={3}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <button 
                        onClick={() => {
                            const projectsGrid = document.querySelector('.grid');
                            projectsGrid?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className={cn(
                            "px-8 py-4 font-semibold rounded-lg shadow-lg transition-colors duration-300 flex items-center gap-2 mx-auto",
                            isDarkMode 
                                ? "bg-white text-black hover:bg-gray-200" 
                                : "bg-black text-white hover:bg-gray-800"
                        )}
                    >
                        View Projects
                        <ArrowRight className="h-5 w-5" />
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default AetherFlowHero;

