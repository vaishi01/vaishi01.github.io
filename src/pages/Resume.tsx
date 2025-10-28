import React from 'react';
import { MinimalistNavbar } from "@/components/ui/minimalist-navbar";
import { FooterTapedDesign } from "@/components/ui/footer-taped-design";
import { WavyBackground } from "@/components/ui/wavy-background";
import { motion } from "framer-motion";
import { Download, Briefcase, GraduationCap, Award, Code, Calendar, Building2, Shield, Trophy, BadgeCheck, Star, Laptop, Server, Wrench, Users as UsersIcon } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";
import { GlowCard } from "@/components/ui/glow-card";
import { SkillCard } from "@/components/ui/skills-card";
import { CtaCard } from "@/components/ui/cta-card";

const Resume = () => {
  // Navigation links configuration
  const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'PROJECTS', href: '/projects' },
    { label: 'RESUME', href: '/resume' },
    { label: 'CONTACT', href: '/contact' },
  ];

  const experience = [
    {
      title: "Undergraduate Lab Researcher",
      company: "AIEA Lab | Prof. Leilani Gilpin",
      period: "April 2024 - Present",
      description: "• Creating a conversational AI chatbot fine-tuned on UCSC-specific data to support prospective students, current students, faculty, and staff with campus-related questions.\n• Enhancing access to campus information using advanced conversational AI methods to improve user experience and minimize response times.\n• Investigating the use of Large Language Models (LLMs) in the legal domain, particularly their role in aiding legal decision-making processes.\n• Designing robust frameworks that ensure logical reasoning, fairness, and transparency in AI-driven legal systems."
    },
    {
      title: "Software Engineering Intern",
      company: "AJA Consulting Services",
      period: "July 2025 - September 2025",
      description: "• Designed and launched the official \"Coding Tutor\" website using React, Next.js, and Tailwind CSS, creating a modern, responsive, and high-performance platform that elevated user engagement by 75% and drove a strong increase in inbound client leads.\n• Developed \"RBCal,\" a full-stack profitability analysis tool for a client in the oil manufacturing industry, automating Rice Bran purchase profitability calculations using real-time market data and production metrics.\n• Increased client profit margins by ~18% through optimized buying strategies and the elimination of manual computation inefficiencies.\n• Developed the frontend for AJA Bench, including responsive landing pages and vendor dashboards, in collaboration with the R&D team to ensure seamless integration with backend services."
    },
    {
      title: "Software Engineering Intern",
      company: "Nutanix",
      period: "January 2025 - June 2025",
      description: "• Developed an AI-powered log search chatbot that converted natural language queries into optimized OpenSearch DSL commands, enabling precise retrieval across 20 TB+ of test logs and reducing issue-resolution time by 65%.\n• Engineered a high-throughput Logstash–OpenSearch pipeline that transformed raw Raptor test logs into structured, queryable documents, improving search indexing efficiency by 3.4x and significantly accelerating log analytics.\n• Fine-tuned lightweight LLMs (TinyLlama, Gemma 27B) using LoRA and few-shot prompting, enhancing DSL generation accuracy and boosting semantic retrieval precision from 72% → 93% across diverse test scenarios.\n• Implemented flexible output formatting through custom parsing modules supporting plain text, JSON, and table formats, improving log-analysis speed for QA teams and cutting manual diagnostic effort by 40%."
    }
  ];

  // Transform experience data for Timeline component
  const timelineData = experience.map((exp) => ({
    title: exp.period,
    content: (
      <div className="mb-8">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {exp.title}
            </h3>
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-4">
              <Building2 size={16} />
              <span className="font-semibold">{exp.company}</span>
            </div>
          </div>
        <div className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
          {exp.description.split('\n').map((line, index) => (
            <p key={index} className="mb-2 last:mb-0">
              {line}
            </p>
          ))}
        </div>
      </div>
    ),
  }));

  const education = [
    {
      degree: "Bachelor of Computer Science",
      school: "University of California, Santa Cruz",
      period: "2022 - 2026",
      GPA: "3.7",
      organizations: "7x Dean's Honor List",
      coursework: "Introduction to Data Structures, Principle of Computer Systems Design, Artificial Intelligence"
    }
  ];

  const skills = [
    { 
      category: "Frontend", 
      items: [
        { name: "React", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "Next.js", level: 85 },
        { name: "Tailwind CSS", level: 90 },
        { name: "HTML5/CSS3", level: 95 }
      ],
      icon: <Laptop size={28} />,
      color: "blue" as const
    },
    { 
      category: "Backend", 
      items: [
        { name: "Python", level: 90 },
        { name: "C", level: 85 },
        { name: "Node.js", level: 70 },
        { name: "MongoDB", level: 75 },
        { name: "REST API", level: 90 },
        { name: "C++", level: 75 }
      ],
      icon: <Server size={28} />,
      color: "blue" as const
    },
    { 
      category: "Tools", 
      items: [
        { name: "Git", level: 95 },
        { name: "Docker", level: 85 },
        { name: "AWS", level: 80 },
        { name: "Firebase", level: 85 },
        { name: "CI/CD", level: 80 },
        { name: "Linux", level: 85 }
      ],
      icon: <Wrench size={28} />,
      color: "blue" as const
    },
    { 
      category: "Soft Skills", 
      items: [
        { name: "Leadership", level: 90 },
        { name: "Communication", level: 95 },
        { name: "Problem Solving", level: 95 },
        { name: "Team Management", level: 85 },
        { name: "Agile/Scrum", level: 90 },
        { name: "Project Planning", level: 85 }
      ],
      icon: <UsersIcon size={28} />,
      color: "blue" as const
    }
  ];

  const certifications = [
    {
      title: "AWS Certified Cloud Practitioner",
      description: "Foundational certification demonstrating overall understanding of AWS Cloud, including core services, security, architecture, pricing, and support.",
      link: "#",
      icon: <Shield className="text-blue-600 dark:text-blue-400" size={40} />
    },
    {
      title: "PCAP - Certified Associate in Python Programming",
      description: "Professional certification validating intermediate Python programming skills, including modules, packages, exceptions, and object-oriented programming.",
      link: "#",
      icon: <BadgeCheck className="text-blue-600 dark:text-blue-400" size={40} />
    },
    {
      title: "CLA - C Programming Language Certified Associate",
      description: "Certification demonstrating fundamental knowledge of C programming, including data types, operators, flow control, functions, and pointers.",
      link: "#",
      icon: <Trophy className="text-blue-600 dark:text-blue-400" size={40} />
    },
    {
      title: "CPE - C++ Certified Entry-Level Programmer",
      description: "Entry-level certification covering C++ fundamentals, including syntax, data types, control structures, functions, and basic object-oriented concepts.",
      link: "#",
      icon: <Star className="text-blue-600 dark:text-blue-400" size={40} />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      {/* Minimalist Navbar */}
      <MinimalistNavbar navLinks={navLinks} />
      
      {/* Hero Section with Wavy Background */}
      <div className="relative pt-16 md:pt-20 overflow-hidden">
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
              Resume
            </motion.h1>
            <motion.p 
              className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Student & Full Stack Developer passionate about AI, machine learning, and creating innovative solutions that make a real impact.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center"
            >
              <a
                href="https://drive.google.com/uc?export=download&id=1je1tjq4AXjKwUVNb7M97KcbZAcPKUMYY"
                target="_blank"
                rel="noopener noreferrer"
                download="Vaishnavi_Jaligama_Resume.pdf"
                className="px-8 py-3 bg-transparent border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-medium rounded-lg hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
              >
                Download Resume
              </a>
            </motion.div>
          </div>
        </WavyBackground>
      </div>

      {/* Main content */}
      <main className="flex-grow pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-8">

          {/* Education Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 sm:mb-12 md:mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold">Education</h2>
            </div>
            <div className="space-y-4 sm:space-y-6">
              {education.map((edu, index) => (
                <CtaCard
                  key={index}
                  title=""
                  subtitle={edu.degree}
                  description=""
                  graduationDate="Expected Graduation: March 2026"
                  className="bg-gray-50 dark:bg-black border-gray-200 dark:border-gray-800 transition-colors"
                />
              ))}
            </div>
          </motion.section>

          {/* Experience Section with Timeline */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 -mx-4 sm:-mx-6 lg:-mx-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6 px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl sm:text-3xl font-bold">Work Experience</h2>
            </div>
            <Timeline data={timelineData} />
          </motion.section>

          {/* Certifications Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8 sm:mb-12 md:mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold">Certifications</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-0">
              {certifications.map((cert, index) => (
                <GlowCard
                  key={index}
                  glowColor={index % 2 === 0 ? "blue" : "purple"}
                  customSize={true}
                  width={300}
                  height={400}
                  className="bg-transparent mx-auto w-full"
                >
                  <div className="flex flex-col items-center text-center h-full justify-between p-4 md:p-6">
                    <div className="flex flex-col items-center text-center flex-grow">
                      <div className="mb-3 md:mb-4 flex justify-center items-center h-[50px] md:h-[60px]">
                        {cert.icon}
                      </div>
                      <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white mb-3 md:mb-4 leading-tight">
                        {cert.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {cert.description}
                      </p>
                    </div>
                    <div className="flex justify-center mt-4 md:mt-6">
                      <button 
                        onClick={() => {
                          if (cert.link && cert.link !== '#') {
                            window.open(cert.link, '_blank');
                          }
                        }}
                        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white border border-blue-600 dark:border-blue-500 px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-colors duration-200 text-xs md:text-sm w-full max-w-[100px] md:max-w-[120px] whitespace-nowrap"
                      >
                        VIEW
                      </button>
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-0"
          >
            <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold">Skills</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {skills.map((skillGroup, index) => (
                <SkillCard
                  key={index}
                  category={skillGroup.category}
                  items={skillGroup.items}
                  icon={skillGroup.icon}
                  color={skillGroup.color}
                />
              ))}
            </div>
          </motion.section>
        </div>
      </main>
      
      <FooterTapedDesign />
    </div>
  );
};

export default Resume;

