'use client';

import React, { useEffect, useState } from 'react';
import { MinimalistNavbar } from "@/components/ui/minimalist-navbar";
import { FooterTapedDesign } from "@/components/ui/footer-taped-design";
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { MinimalistHero } from '@/components/ui/minimalist-hero';
import { Github, Linkedin, Mail, Twitter, Phone, FileText } from 'lucide-react';


// Main Index Component
const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    document.body.style.backgroundColor = '';
    document.documentElement.style.backgroundColor = '';
    
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
      
      if (isDark) {
        document.body.style.backgroundColor = '#000000';
        document.documentElement.style.backgroundColor = '#000000';
      } else {
        document.body.style.backgroundColor = '#ffffff';
        document.documentElement.style.backgroundColor = '#ffffff';
      }
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      observer.disconnect();
      document.body.style.backgroundColor = '';
      document.documentElement.style.backgroundColor = '';
    };
  }, []);

  // Social links configuration
  const socialLinks = [
    { icon: Mail, href: 'mailto:rajat17.maheshwari@gmail.com' },
    { icon: Phone, href: 'tel:+18313468559' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/rajat17maheshwari/' },
    { icon: Github, href: 'https://github.com/rajatmaheshwari17' },
    { icon: FileText, href: 'https://drive.google.com/file/d/1MuGBxInScRqAfUN2Bht1JHEP6HSkEScn/view?usp=sharing' },
  ];

  // Navigation links configuration
  const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'PROJECTS', href: '/projects' },
    { label: 'RESUME', href: '/resume' },
    { label: 'CONTACT', href: '/contact' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white no-spacing">
      {/* Minimalist Navbar */}
      <MinimalistNavbar navLinks={navLinks} />
      
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-16 md:pt-20"
      >
        <MinimalistHero
          mainText="Computer Science student at UC Santa Cruz passionate about AI, LLMs, and backend engineering. Building intelligent systems that are transparent, interpretable, and impactful."
          readMoreLink="#about"
          imageSrc="/Rajat.JPG"
          imageAlt="Profile picture"
          overlayText={{
            part1: 'Build.',
            part2: 'Create.',
          }}
          socialLinks={socialLinks}
          locationText="Santa Cruz, CA"
        />
        
        <div id="about" className={`w-full mx-auto ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          <div className="w-full mb-8 py-4">
            <div className="max-w-6xl mx-auto text-left px-4 sm:px-6 lg:px-8">
              <h2 className={cn(
                "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-center",
                isDarkMode ? 'text-white' : 'text-gray-800'
              )}>
                ABOUT ME
              </h2>
              
              <div className="space-y-6 sm:space-y-8">
                <p className={cn(
                  "text-base sm:text-lg md:text-xl leading-relaxed font-medium max-w-5xl mx-auto",
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                )}>
                  I'm a senior at the <strong>University of California, Santa Cruz</strong>, majoring in <strong>Computer Science</strong> with a strong passion for <strong>Artificial Intelligence</strong>, <strong>Large Language Models (LLMs)</strong>, and <strong>backend engineering</strong>. My work lies at the intersection of AI, reasoning, and scalable system design—driven by the goal of making intelligent systems more <strong>transparent, interpretable, and impactful</strong>.
                </p>
                <p className={cn(
                  "text-base sm:text-lg md:text-xl leading-relaxed font-medium max-w-5xl mx-auto",
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                )}>
                  At the <strong>AIEA Lab</strong> under Professor Leilani Gilpin, I'm developing a <strong>chatbot fine-tuned on UCSC data</strong> to assist prospective students, current students, professors, and staff, streamlining campus information access through <strong>conversational AI</strong>. I'm also researching the applications of LLMs in law, focusing on building frameworks for <strong>logical reasoning, fairness, and explainability</strong> in legal decision-making.
                </p>
                <p className={cn(
                  "text-base sm:text-lg md:text-xl leading-relaxed font-medium max-w-5xl mx-auto",
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                )}>
                  Most recently, I worked as a <strong>Software Engineer Intern at AJA Consulting Services</strong>, where I built the company's official website from scratch using <strong>React, Next.js, and Tailwind CSS</strong>, increasing client engagement by <strong>70%</strong>. I also developed <strong>RBCal</strong>, a profitability analysis tool for an oil manufacturing client that automated rice bran purchase calculations and improved profit margins by <strong>18%</strong> through real-time data insights.
                </p>
                <p className={cn(
                  "text-base sm:text-lg md:text-xl leading-relaxed font-medium max-w-5xl mx-auto",
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                )}>
                  Previously, I interned at <strong>Nutanix</strong>, where I built an <strong>AI-powered log search chatbot</strong> that translated natural language queries into optimized <strong>OpenSearch DSL commands</strong>, enabling precise search across <strong>20TB+ of system logs</strong>. By fine-tuning lightweight LLMs like <strong>TinyLlama and Gemma 27B</strong> using <strong>LoRA and few-shot prompting</strong>, I improved semantic retrieval precision from <strong>72% to 93%</strong>, reducing issue-resolution time by <strong>65%</strong>.
                </p>
                <p className={cn(
                  "text-base sm:text-lg md:text-xl leading-relaxed font-medium max-w-5xl mx-auto",
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                )}>
                  I'm deeply interested in advancing the fields of <strong>AI, LLMs, and backend systems</strong>, continuously exploring how <strong>logical reasoning and interpretability</strong> can make artificial intelligence more <strong>ethical, transparent, and useful to society</strong>.
                </p>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
      
      <FooterTapedDesign />
    </div>
  );
};

export default Index;