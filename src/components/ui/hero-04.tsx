/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ArrowDownRight, Mail, Github, Linkedin, FileText } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
  
export function HeroSection04() {
  return (
    <section className="min-h-screen overflow-hidden relative py-20 bg-white dark:bg-black text-black dark:text-white">
      <div className="mx-auto max-w-7xl relative z-20 px-6">
        <div className="relative">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="z-20 text-blue-600 dark:text-blue-400 relative font-bold text-center tracking-[-7px] text-7xl md:text-9xl xl:tracking-[-1rem] md:tracking-[-14px] xl:text-[10rem]"
          >
            COMPUTATIONAL THINKER
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-4xl hidden xl:block absolute -bottom-12 right-24 font-thin tracking-[6px] text-black dark:text-white z-30"
          >
            RAJAT MAHESHWARI
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-4xl absolute xl:hidden -bottom-12 left-24 font-thin tracking-[6px] text-black dark:text-white z-30"
          >
            RAJAT MAHESHWARI
          </motion.p>
        </div>

        <div className="grid relative">
          {/* Static Image - positioned from start */}
          <div className="absolute hidden md:flex left-1/2 -top-10 w-fit bg-white dark:bg-black border border-gray-300 dark:border-gray-700 z-10">
            <img
              src="/Rajat.JPG"
              alt="Rajat Maheshwari portrait"
              className="h-96 w-80 object-cover grayscale"
            />
            <div className="text-left p-2 rotate-180 [writing-mode:vertical-rl] text-xs font-medium tracking-widest text-black dark:text-white">
              BASED IN SANTA CRUZ, CA
            </div>
          </div>
          
          {/* Mobile Image - positioned from start */}
          <div className="flex md:hidden left-1/2 -top-10 w-full md:w-fit bg-white dark:bg-black border border-gray-300 dark:border-gray-700 z-10">
            <img
              src="/Rajat.JPG"
              alt="Rajat Maheshwari portrait"
              className="h-96 w-80 object-cover grayscale"
            />
            <div className="text-left p-2 rotate-180 [writing-mode:vertical-rl] text-xs font-medium tracking-widest text-black dark:text-white">
              BASED IN SANTA CRUZ, CA
            </div>
          </div>

          {/* Animated Services Container */}
          <div className="space-y-8 pt-20 flex gap-6 justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex gap-6 bg-white dark:bg-black w-full max-w-xl h-fit p-10 items-end space-y-2 text-xl font-bold md:text-2xl lg:text-3xl border border-gray-300 dark:border-gray-700"
            >
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="font-semibold text-xl text-black dark:text-white"
              >
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.8 }}
                >/ BACKEND DEVELOPER</motion.div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2.0 }}
                >/ WEB DEVELOPMENT</motion.div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2.2 }}
                >/ FULL STACK DEVELOPER</motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="md:mt-40 mt-10"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.8 }}
            className="mx-auto max-w-2xl font-mono text-center text-sm font-medium tracking-wide md:text-base text-black dark:text-white"
          >
            I'M A COMPUTER SCIENCE ENTHUSIAST,
            <br />
            PASSIONATE ABOUT AI, LOGIC, AND SYSTEM DESIGN,
            <br />
            WHO TURNS COMPLEX IDEAS INTO REAL-WORLD SOLUTIONS
            <br />
            AND DRIVE IMPACT THROUGH TECHNOLOGY
          </motion.p>
        </motion.div>
      </div>
      <div
        className="absolute block dark:hidden inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, #e5e5e5 1px, transparent 1px),
        linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)
      `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
        repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
          WebkitMaskImage: `
 repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      <div
        className="absolute hidden dark:block inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, #404040 1px, transparent 1px),
        linear-gradient(to bottom, #404040 1px, transparent 1px)
      `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
        repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
          WebkitMaskImage: `
 repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Social Media Links - Left Bottom */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 3.0 }}
        className="absolute left-6 bottom-16 z-30"
      >
        <div className="flex gap-3">
          <a
            href="mailto:rajat17.maheshwari@gmail.com"
            className="p-2 hover:scale-110 transition-all duration-200 group"
          >
            <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors" />
          </a>
          
          <a
            href="https://www.linkedin.com/in/rajat17maheshwari/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:scale-110 transition-all duration-200 group"
          >
            <Linkedin className="h-6 w-6 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors" />
          </a>
          
          <a
            href="https://github.com/rajatmaheshwari17"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:scale-110 transition-all duration-200 group"
          >
            <Github className="h-6 w-6 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors" />
          </a>
          
          <a
            href="https://drive.google.com/file/d/1MuGBxInScRqAfUN2Bht1JHEP6HSkEScn/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:scale-110 transition-all duration-200 group"
          >
            <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
