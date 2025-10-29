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
    { icon: Mail, href: 'mailto:vaishnavi.jaligama@gmail.com' },
    { icon: Phone, href: 'tel:+16612193884' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/vaishnavi-jaligama/' },
    { icon: Github, href: 'https://github.com/vaishi01' },
    { icon: FileText, href: 'https://drive.google.com/file/d/1je1tjq4AXjKwUVNb7M97KcbZAcPKUMYY/view?usp=sharing' },
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
        className="pt-12 sm:pt-16 md:pt-20"
      >
        <MinimalistHero
          mainText="Computer Science student at UC Santa Cruz passionate about AI, LLMs, and backend engineering. Building intelligent systems that are transparent, interpretable, and impactful."
          readMoreLink="#about"
          imageSrc="/vaishnavi.jpg"
          imageAlt="Profile picture"
          overlayText={{
            part1: 'Build.',
            part2: 'Create.',
          }}
          socialLinks={socialLinks}
          locationText="Santa Cruz, CA"
        />
        
        <div id="about" className={`w-full mx-auto ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          <div className="w-full mb-6 sm:mb-8 py-2 sm:py-4">
            <div className="max-w-6xl mx-auto text-left px-3 sm:px-4 md:px-6 lg:px-8">
              <h2 className={cn(
                "text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 sm:mb-8 md:mb-12 text-center",
                isDarkMode ? 'text-white' : 'text-gray-800'
              )}>
                ABOUT ME
              </h2>
              
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                <p className={cn(
                  "text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-medium max-w-5xl mx-auto",
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                )}>
                  I'm a senior studying <strong>Computer Science</strong> at the <strong>University of California, Santa Cruz</strong>, with a strong focus on <strong>Artificial Intelligence</strong>, <strong>Large Language Models (LLMs)</strong>, and <strong>backend engineering</strong>. My interests lie at the intersection of AI, reasoning, and scalable systems—motivated by the goal of making intelligent systems more <strong>transparent, interpretable, and impactful</strong>.
                </p>
                <p className={cn(
                  "text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-medium max-w-5xl mx-auto",
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                )}>
                  At the <strong>AIEA Lab</strong> under Professor Leilani Gilpin, I'm building a <strong>UCSC-focused chatbot</strong> to support prospective students, current students, faculty, and staff by simplifying campus information access through <strong>conversational AI</strong>. I'm also researching LLM applications in law, exploring frameworks that promote <strong>logical reasoning, fairness, and explainability</strong> in legal decision-making.
                </p>
                <p className={cn(
                  "text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-medium max-w-5xl mx-auto",
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                )}>
                  Most recently, I served as a <strong>Software Engineer Intern at AJA Consulting Services</strong>, where I developed the <strong>Coding Tutor, compny's subsidary's website</strong> using <strong>React, Next.js, and Tailwind CSS</strong>, helping boost client engagement by <strong>70%</strong>. I also created <strong>RBCal</strong>, a profitability analysis tool that automated real-time rice bran purchasing decisions for an oil manufacturing client, increasing profit margins by <strong>18%</strong>.
                </p>
                <p className={cn(
                  "text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-medium max-w-5xl mx-auto",
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                )}>
                  Previously, at <strong>Nutanix</strong>, I developed an <strong>AI-powered log search chatbot</strong> that translated natural language queries into optimized <strong>OpenSearch DSL commands</strong>, enabling precise search across <strong>20TB+ of system logs</strong>. By fine-tuning lightweight LLMs (<strong>TinyLlama, Gemma 27B</strong>) with <strong>LoRA and few-shot prompting</strong>, I improved semantic retrieval accuracy from <strong>72% to 93%</strong> and reduced troubleshooting time by <strong>65%</strong>.
                </p>
                <p className={cn(
                  "text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-medium max-w-5xl mx-auto",
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                )}>
                  I'm passionate about advancing <strong>AI, LLMs, and backend systems</strong>, and am especially excited about how <strong>logical reasoning and interpretability</strong> can help AI become more <strong>ethical, transparent, and broadly useful</strong>.
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