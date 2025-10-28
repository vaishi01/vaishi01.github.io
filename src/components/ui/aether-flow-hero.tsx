"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

// A utility function for class names
const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

// The main hero component
const AetherFlowHero = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Prevent hydration mismatch
    React.useEffect(() => {
        setMounted(true);
    }, []);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let animationFrameId: number;
        let particles: any[] = [];
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
                if (!canvas || !ctx) return;
                
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
            // Theme-aware particle colors
            const particleColor = mounted && theme === 'light' 
                ? 'rgba(59, 130, 246, 0.8)' // Blue color for light mode
                : 'rgba(191, 128, 255, 0.8)'; // Purple color for dark mode
            
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((window.innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((window.innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 0.4) - 0.2;
                let directionY = (Math.random() * 0.4) - 0.2;
                particles.push(new Particle(x, y, directionX, directionY, size, particleColor));
            }
        };

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
                        
                        let dx_mouse_a = particles[a].x - (mouse.x || 0);
                        let dy_mouse_a = particles[a].y - (mouse.y || 0);
                        let distance_mouse_a = Math.sqrt(dx_mouse_a*dx_mouse_a + dy_mouse_a*dy_mouse_a);

                        if (mouse.x && distance_mouse_a < mouse.radius) {
                            // White lines when mouse is near
                            ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`;
                        } else {
                            // Theme-aware connection lines
                            const lineColor = mounted && theme === 'light' 
                                ? `rgba(59, 130, 246, ${opacityValue})` // Blue for light mode
                                : `rgba(200, 150, 255, ${opacityValue})`; // Purple for dark mode
                            ctx.strokeStyle = lineColor;
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
            const backgroundColor = mounted && theme === 'light' ? 'white' : 'black';
            ctx.fillStyle = backgroundColor;
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
    }, [mounted, theme]);

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
        // Full width container with constrained content
        <div className="relative h-[40vh] min-h-[400px] w-full flex flex-col items-center justify-center overflow-hidden">
            {/* The canvas covers the full width */}
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full"></canvas>
            
            {/* Overlay HTML Content - constrained width */}
            <div className="relative z-10 text-center p-6 max-w-4xl mx-auto">

                <motion.h1
                    custom={0}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${mounted && theme === 'light' ? 'text-gray-900' : 'text-white'}`}
                >
                    Resume
                </motion.h1>

                <motion.p
                    custom={1}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className={`max-w-2xl mx-auto text-lg mb-10 ${mounted && theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
                >
                    Student & Full Stack Developer passionate about AI, machine learning, and creating innovative solutions that make a real impact.
                </motion.p>

                <motion.div
                    custom={2}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <a
                        href="https://drive.google.com/uc?export=download&id=1je1tjq4AXjKwUVNb7M97KcbZAcPKUMYY"
                        target="_blank"
                        rel="noopener noreferrer"
                        download="Vaishnavi_Jaligama_Resume.pdf"
                        className={`px-6 py-2 font-medium rounded-lg transition-colors duration-300 ${mounted && theme === 'light' ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-200'}`}
                    >
                        Download Resume
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default AetherFlowHero;