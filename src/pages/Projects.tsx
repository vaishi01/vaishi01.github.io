import React from 'react';
import { MinimalistNavbar } from "@/components/ui/minimalist-navbar";
import { FooterTapedDesign } from "@/components/ui/footer-taped-design";
import { WavyBackground } from "@/components/ui/wavy-background";
import { motion } from "framer-motion";
import { Brain, Sparkles, Server, Layers, MessagesSquare, Code, Database, Terminal, Cpu, TrendingUp, Zap, Binary, Box } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { MinimalBentoGrid } from "@/components/ui/minimal-bento-grid";
import type { BentoItem } from "@/components/ui/minimal-bento-grid";

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

  const additionalProjects: BentoItem[] = [
    {
      title: "GhostbusterX",
      description: "Advanced AI agent that hunts and captures ghosts using probabilistic reasoning and belief state tracking algorithms.",
      icon: <Brain className="w-4 h-4 text-purple-500" />,
      tags: ["Python", "AI", "Probabilistic Reasoning"],
    },
    {
      title: "PacMan-Ghostbusters-AI",
      description: "AI agent combining Pac-Man gameplay with ghostbusting mechanics using inference and probabilistic reasoning.",
      icon: <Brain className="w-4 h-4 text-indigo-500" />,
      tags: ["Python", "Probabilistic Reasoning"],
    },
    {
      title: "Connect4-AI-Agent",
      description: "Connect Four AI using minimax with alpha-beta pruning and position evaluation for strategic gameplay.",
      icon: <Cpu className="w-4 h-4 text-pink-500" />,
      tags: ["Python", "Minimax", "Alpha-Beta Pruning"],
    },
    {
      title: "XO-AI",
      description: "Unbeatable Tic-Tac-Toe AI using minimax algorithm with alpha-beta pruning for optimal move selection.",
      icon: <Brain className="w-4 h-4 text-emerald-500" />,
      tags: ["Python", "Minimax", "Alpha-Beta Pruning"],
    },
    {
      title: "PacManiaX",
      description: "Enhanced Pac-Man game with intelligent ghost AI, power-ups, and advanced pathfinding algorithms.",
      icon: <Zap className="w-4 h-4 text-yellow-500" />,
      tags: ["Python", "Game AI", "Pathfinding"],
    },
    {
      title: "Web-Crawler",
      description: "Multi-threaded web crawler with URL frontier management, robots.txt compliance, and efficient page parsing.",
      icon: <Server className="w-4 h-4 text-blue-500" />,
      tags: ["C", "Data Structures"],
    },
    {
      title: "KVS-CacheSuite",
      description: "High-performance key-value store with caching mechanisms, LRU eviction, and persistence layer.",
      icon: <Database className="w-4 h-4 text-cyan-500" />,
      tags: ["C", "Data Structures", "Caching"],
    },
    {
      title: "LRUCacheSystem",
      description: "Least Recently Used cache implementation with O(1) operations and efficient memory management.",
      icon: <Database className="w-4 h-4 text-sky-500" />,
      tags: ["C", "Data Structures", "Caching"],
    },
    {
      title: "bobcat-cli-tool",
      description: "Command-line interface tool for streamlined development workflows with automation and productivity features.",
      icon: <Terminal className="w-4 h-4 text-green-500" />,
      tags: ["C", "CLI"],
    },
    {
      title: "BigIntFlex-Cpp",
      description: "C++ library for arbitrary-precision integer arithmetic with optimized algorithms for large number operations.",
      icon: <Binary className="w-4 h-4 text-violet-500" />,
      tags: ["C++", "Algorithms", "Math"],
    },
    {
      title: "FreqNOrderRBT",
      description: "Red-Black Tree implementation with frequency tracking and order statistics for efficient data management.",
      icon: <Box className="w-4 h-4 text-red-500" />,
      tags: ["C++", "Trees", "Data Structures"],
    },
    {
      title: "SparseMatrixCalc",
      description: "Efficient sparse matrix calculator with optimized storage and fast arithmetic operations for large matrices.",
      icon: <Code className="w-4 h-4 text-amber-500" />,
      tags: ["C", "Linear Algebra", "Optimization"],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      {/* Minimalist Navbar */}
      <MinimalistNavbar navLinks={navLinks} />
      
      {/* Hero Section with Wavy Background */}
      <div className="relative pt-16 md:pt-20">
        <WavyBackground 
          containerClassName="h-[40vh] min-h-[400px]"
          className="max-w-4xl mx-auto"
          colors={[
            "#38bdf8",
            "#818cf8",
            "#c084fc",
            "#e879f9",
            "#22d3ee",
          ]}
          waveOpacity={0.5}
          blur={10}
          speed="fast"
          waveWidth={50}
        >
          <div className="text-center px-4">
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Projects
            </motion.h1>
            <motion.p 
              className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Explore my portfolio of AI, systems programming, and innovative solutions
            </motion.p>
          </div>
        </WavyBackground>
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

            <MinimalBentoGrid items={additionalProjects} />
          </motion.div>
        </div>
      </main>
      
      <FooterTapedDesign />
    </div>
  );
};

export default Projects;

