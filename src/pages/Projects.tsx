import React from 'react';
import { MinimalistNavbar } from "@/components/ui/minimalist-navbar";
import { FooterTapedDesign } from "@/components/ui/footer-taped-design";
import { SplineScene } from "@/components/ui/spline";
import { Spotlight } from "@/components/ui/spotlight";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Brain, Sparkles, Server, Layers, MessagesSquare, Code, Database, Terminal, Cpu, TrendingUp, Zap, Binary, Box } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";

const Projects = () => {
  // Navigation links configuration
  const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'PROJECTS', href: '/projects' },
    { label: 'RESUME', href: '/resume' },
    { label: 'CONTACT', href: '/contact' },
  ];

  const features = [
    {
      Icon: MessagesSquare,
      name: "Nutanix-AI-Powered-LogSearch-Chatbot",
      description: "Enterprise chatbot for intelligent log search and analysis using natural language processing and AI-powered insights.",
      href: "#",
      cta: "View Project",
      className: "lg:col-span-2",
    },
    {
      Icon: Sparkles,
      name: "Veracity-LLM-Story-Generator",
      description: "Large Language Model powered story generator with fact-checking capabilities and creative narrative construction.",
      href: "#",
      cta: "View Project",
      className: "",
    },
    {
      Icon: Server,
      name: "multithreaded-httpserver",
      description: "High-performance HTTP server with thread pooling, connection management, and support for concurrent requests using C++.",
      href: "#",
      cta: "View Project",
      className: "",
    },
    {
      Icon: Sparkles,
      name: "Parallax-AI",
      description: "AI-powered parallax scrolling effects generator with machine learning for dynamic visual experiences.",
      href: "#",
      cta: "View Project",
      className: "lg:col-span-2",
    },
    {
      Icon: Brain,
      name: "RL-Slither.io",
      description: "Reinforcement learning agent for the Slither.io game using deep Q-learning and neural networks to master gameplay strategies.",
      href: "#",
      cta: "View Project",
      className: "lg:col-span-2",
    },
    {
      Icon: Layers,
      name: "multithreaded-mapreduce",
      description: "Distributed MapReduce framework with multi-threading support for parallel data processing and aggregation.",
      href: "#",
      cta: "View Project",
      className: "",
    },
  ];

  const additionalProjects = [
    {
      title: "GhostbusterX",
      description: "Advanced AI agent that hunts and captures ghosts using probabilistic reasoning and belief state tracking algorithms.",
      icon: <Brain className="w-6 h-6 text-purple-600 dark:text-blue-400" />,
    },
    {
      title: "PacMan-Ghostbusters-AI",
      description: "AI agent combining Pac-Man gameplay with ghostbusting mechanics using inference and probabilistic reasoning.",
      icon: <Brain className="w-6 h-6 text-purple-600 dark:text-blue-400" />,
    },
    {
      title: "Connect4-AI-Agent",
      description: "Connect Four AI using minimax with alpha-beta pruning and position evaluation for strategic gameplay.",
      icon: <Cpu className="w-6 h-6 text-purple-600 dark:text-blue-400" />,
    },
    {
      title: "XO-AI",
      description: "Unbeatable Tic-Tac-Toe AI using minimax algorithm with alpha-beta pruning for optimal move selection.",
      icon: <Brain className="w-6 h-6 text-purple-600 dark:text-blue-400" />,
    },
    {
      title: "PacManiaX",
      description: "Enhanced Pac-Man game with intelligent ghost AI, power-ups, and advanced pathfinding algorithms.",
      icon: <Zap className="w-6 h-6 text-purple-600 dark:text-blue-400" />,
    },
    {
      title: "Web-Crawler",
      description: "Multi-threaded web crawler with URL frontier management, robots.txt compliance, and efficient page parsing.",
      icon: <Server className="w-6 h-6 text-purple-600 dark:text-blue-400" />,
    },
    {
      title: "KVS-CacheSuite",
      description: "High-performance key-value store with caching mechanisms, LRU eviction, and persistence layer.",
      icon: <Database className="w-6 h-6 text-purple-600 dark:text-blue-400" />,
    },
    {
      title: "LRUCacheSystem",
      description: "Least Recently Used cache implementation with O(1) operations and efficient memory management.",
      icon: <Database className="w-6 h-6 text-purple-600 dark:text-blue-400" />,
    },
    {
      title: "bobcat-cli-tool",
      description: "Command-line interface tool for streamlined development workflows with automation and productivity features.",
      icon: <Terminal className="w-6 h-6 text-purple-600 dark:text-blue-400" />,
    },
    {
      title: "BigIntFlex-Cpp",
      description: "C++ library for arbitrary-precision integer arithmetic with optimized algorithms for large number operations.",
      icon: <Binary className="w-6 h-6 text-purple-600 dark:text-blue-400" />,
    },
    {
      title: "FreqNOrderRBT",
      description: "Red-Black Tree implementation with frequency tracking and order statistics for efficient data management.",
      icon: <Box className="w-6 h-6 text-purple-600 dark:text-blue-400" />,
    },
    {
      title: "SparseMatrixCalc",
      description: "Efficient sparse matrix calculator with optimized storage and fast arithmetic operations for large matrices.",
      icon: <Code className="w-6 h-6 text-purple-600 dark:text-blue-400" />,
    },
  ];

  const ProjectFeature = ({
    title,
    description,
    icon,
    index,
  }: {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
  }) => {
    return (
      <div
        className={cn(
          "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
          (index === 0 || index === 3 || index === 6 || index === 9) && "lg:border-l dark:border-neutral-800",
          index < 4 && "lg:border-b dark:border-neutral-800"
        )}
      >
        {index < 4 && (
          <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 pointer-events-none" />
        )}
        {index >= 4 && (
          <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 pointer-events-none" />
        )}
        <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
          {icon}
        </div>
        <div className="text-lg font-bold mb-2 relative z-10 px-10">
          <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-gradient-to-b group-hover/feature:from-blue-500 group-hover/feature:to-purple-500 transition-all duration-200 origin-center" />
          <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
            {title}
          </span>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
          {description}
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      {/* Minimalist Navbar */}
      <MinimalistNavbar navLinks={navLinks} />
      
      {/* Hero Section with Spline 3D */}
      <div className="relative pt-16 md:pt-20 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-7xl mx-auto h-[50vh] min-h-[400px] bg-black/[0.96] relative overflow-hidden border border-gray-800 dark:border-gray-700 shadow-2xl rounded-xl">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          
          <div className="flex h-full">
            {/* Left content */}
            <div className="flex-1 p-8 relative z-10 flex flex-col justify-center items-center text-center">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-4 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    Project Showcase
                  </motion.div>
                </CardTitle>
                <CardDescription className="text-lg md:text-xl text-neutral-300 max-w-2xl text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Explore my portfolio of AI, systems programming, and innovative solutions. 
                    From machine learning algorithms to full-stack applications, discover projects 
                    that showcase technical expertise and creative problem-solving. Dive into 
                    cutting-edge technologies and see how I transform ideas into reality.
                  </motion.div>
                </CardDescription>
                
                {/* Spacer div for explicit spacing */}
                <div className="h-8"></div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex justify-center"
                >
                  <a
                    href="https://github.com/vaishi01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 bg-transparent border-2 border-neutral-300 dark:border-neutral-600 text-neutral-300 dark:text-neutral-300 font-medium rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-600 hover:text-black dark:hover:text-white transition-all duration-300"
                  >
                    GitHub
                  </a>
                </motion.div>
              </CardHeader>
            </div>

            {/* Right content - Interactive Robot */}
            <div className="flex-1 relative">
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Main content */}
      <main className="flex-grow pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-8">
          {/* Featured Projects - Bento Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <BentoGrid>
              {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
              ))}
            </BentoGrid>
          </motion.div>

          {/* Additional Projects Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Additional Work
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Explore more of my projects showcasing expertise in AI, systems programming, and data structures.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto">
              {additionalProjects.map((project, index) => (
                <ProjectFeature key={project.title} {...project} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      
      <FooterTapedDesign />
    </div>
  );
};

export default Projects;

