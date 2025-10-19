import React from 'react';
import { MinimalistNavbar } from "@/components/ui/minimalist-navbar";
import { FooterTapedDesign } from "@/components/ui/footer-taped-design";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { motion } from "framer-motion";
import { Download, Briefcase, GraduationCap, Award, Code, Calendar, Building2, Shield, Trophy, BadgeCheck, Star, Laptop, Server, Wrench, Users as UsersIcon } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";
import { GlowCard } from "@/components/ui/glow-card";
import { SkillCard } from "@/components/ui/skills-card";
import { cn } from "@/lib/utils";

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
      title: "Senior IT Consultant",
      company: "AJA Consulting Services",
      period: "2022 - Present",
      description: "Leading IT consulting projects, managing client relationships, and delivering innovative solutions for enterprise clients."
    },
    {
      title: "Full Stack Developer",
      company: "Tech Solutions Inc.",
      period: "2020 - 2022",
      description: "Developed and maintained web applications using React, Node.js, and cloud technologies."
    },
    {
      title: "Junior Developer",
      company: "StartUp Hub",
      period: "2018 - 2020",
      description: "Built responsive web applications and collaborated with cross-functional teams."
    }
  ];

  // Transform experience data for Timeline component
  const timelineData = experience.map((exp) => ({
    title: exp.period,
    content: (
      <div className="mb-8">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Briefcase className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {exp.title}
              </h3>
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-4">
                <Building2 size={16} />
                <span className="font-semibold">{exp.company}</span>
              </div>
            </div>
          </div>
        <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
          {exp.description}
        </p>
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
      icon: <Shield className="text-blue-600 dark:text-blue-400" size={48} />
    },
    {
      title: "PCAP - Certified Associate in Python Programming",
      description: "Professional certification validating intermediate Python programming skills, including modules, packages, exceptions, and object-oriented programming.",
      link: "#",
      icon: <BadgeCheck className="text-blue-600 dark:text-blue-400" size={48} />
    },
    {
      title: "CLA - C Programming Language Certified Associate",
      description: "Certification demonstrating fundamental knowledge of C programming, including data types, operators, flow control, functions, and pointers.",
      link: "#",
      icon: <Trophy className="text-blue-600 dark:text-blue-400" size={48} />
    },
    {
      title: "CPE - C++ Certified Entry-Level Programmer",
      description: "Entry-level certification covering C++ fundamentals, including syntax, data types, control structures, functions, and basic object-oriented concepts.",
      link: "#",
      icon: <Star className="text-blue-600 dark:text-blue-400" size={48} />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      {/* Minimalist Navbar */}
      <MinimalistNavbar navLinks={navLinks} />
      
      {/* Hero Section with Geometric Shapes */}
      <div className="pt-16 md:pt-20">
        <HeroGeometric
          title1="Resume"
          description="Student & Full Stack Developer"
        >
          <motion.a
            href="https://drive.google.com/uc?export=download&id=1je1tjq4AXjKwUVNb7M97KcbZAcPKUMYY"
            target="_blank"
            rel="noopener noreferrer"
            download="Rajat_Maheshwari_Resume.pdf"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-xl transition-all shadow-lg hover:shadow-xl font-semibold cursor-pointer"
          >
            <Download size={20} />
            Download Resume
          </motion.a>
        </HeroGeometric>
      </div>

      {/* Main content with sections */}
      <main className="flex-grow pb-8 pt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">

          {/* Education Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <GraduationCap className="text-blue-600 dark:text-blue-400" size={32} />
              <h2 className="text-3xl font-bold">Education</h2>
            </div>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-50 dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                >
                  <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
                    {edu.school} | {edu.period}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">GPA:</span> {edu.GPA}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Organizations/Awards:</span> {edu.organizations}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Relevant Coursework:</span> {edu.coursework}
                  </p>
                </div>
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
            <div className="flex items-center justify-center gap-3 mb-2 px-4 sm:px-6 lg:px-8">
              <Briefcase className="text-blue-600 dark:text-blue-400" size={32} />
              <h2 className="text-3xl font-bold">Work Experience</h2>
            </div>
            <Timeline data={timelineData} />
          </motion.section>

          {/* Skills Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <Code className="text-blue-600 dark:text-blue-400" size={32} />
              <h2 className="text-3xl font-bold">Skills</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          {/* Certifications Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-0"
          >
            <div className="flex items-center justify-center gap-3 mb-0">
              <Award className="text-blue-600 dark:text-blue-400" size={32} />
              <h2 className="text-3xl font-bold">Certifications</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10 max-w-6xl mx-auto">
              {certifications.map((cert, index) => (
                <GlowCard
                  key={index}
                  glowColor={index % 2 === 0 ? "blue" : "purple"}
                  customSize={true}
                  width={420}
                  height={380}
                  className="bg-transparent mx-auto"
                >
                  <div className="flex flex-col items-center text-center h-full justify-between">
                    <div className="flex flex-col items-center text-center flex-grow">
                      <div className="mb-4 flex justify-center items-center h-[60px]">
                        {cert.icon}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {cert.description}
                      </p>
                    </div>
                    <div className="flex justify-center pt-4">
                      <button 
                        onClick={() => {
                          if (cert.link && cert.link !== '#') {
                            window.open(cert.link, '_blank');
                          }
                        }}
                        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white border border-blue-600 dark:border-blue-500 px-8 py-3 rounded-lg font-medium transition-colors duration-200 text-sm w-full max-w-[160px] whitespace-nowrap"
                      >
                        VIEW
                      </button>
                    </div>
                  </div>
                </GlowCard>
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

