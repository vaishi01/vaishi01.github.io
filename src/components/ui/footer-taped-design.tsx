import { Link } from 'react-router-dom';
import { Linkedin, Github, Mail, FileText, Phone } from 'lucide-react';

export const FooterTapedDesign = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full text-gray-900 dark:text-white">
      <div className="bg-white dark:bg-black w-full px-4 md:px-12 lg:px-20 py-10 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-10 px-2 md:px-8 flex-1 w-full">
          <div className='flex flex-col items-start gap-2'>
            <Link
              to="/"
              className="flex flex-row gap-1 items-center justify-start text-2xl font-bold text-gray-900 dark:text-white"
            >
              Vaishnavi Jaligama
            </Link>
            <p className='text-gray-600 dark:text-gray-400 font-medium text-base w-full md:w-4/5'>
              Computer Science senior at UC Santa Cruz passionate about AI, LLMs, and backend systems. Actively seeking full-time opportunities in software engineering and applied AI research to build scalable, intelligent solutions.
            </p>
          </div>

          <div className='flex flex-col md:mx-4 md:flex-row gap-4 md:gap-12 items-start md:items-start'>
            <div className='flex flex-col gap-2 md:gap-4'>
              <h4 className='uppercase font-semibold text-sm text-gray-500 dark:text-gray-400'>Navigation</h4>
              <div className="flex flex-wrap md:flex-col gap-2 text-sm text-gray-700 dark:text-gray-300 items-start">
                <Link className='text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white whitespace-nowrap font-medium transition-colors' to="/">Home</Link>
                <Link className='text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white whitespace-nowrap font-medium transition-colors' to="/projects">Projects</Link>
                <Link className='text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white whitespace-nowrap font-medium transition-colors' to="/resume">Resume</Link>
                <Link className='text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white whitespace-nowrap font-medium transition-colors' to="/contact">Contact</Link>
              </div>
            </div>

            <div className='flex flex-col gap-2 md:gap-4'>
              <h4 className='uppercase whitespace-nowrap font-semibold text-sm text-gray-500 dark:text-gray-400'>Connect</h4>
              <div className="flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-300 items-start">
                <a 
                  className='text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white whitespace-nowrap font-medium transition-colors' 
                  href="mailto:vaishnavi.jaligama@gmail.com"
                >
                  Email
                </a>
                <a 
                  className='text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white whitespace-nowrap font-medium transition-colors' 
                  href="https://www.linkedin.com/in/vaishnavi-jaligama/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a 
                  className='text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white whitespace-nowrap font-medium transition-colors' 
                  href="https://github.com/vaishi01"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a 
                  className='text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white whitespace-nowrap font-medium transition-colors' 
                  href="https://drive.google.com/file/d/1je1tjq4AXjKwUVNb7M97KcbZAcPKUMYY/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full bg-white dark:bg-black py-4 px-4 md:px-12 lg:px-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 items-start sm:items-center">
          <p className="whitespace-nowrap">
            ©{currentYear} Vaishnavi Jaligama. All rights reserved.
          </p>
          <div className="flex flex-row gap-4">
            <span className="text-gray-600 dark:text-gray-400">Santa Cruz, CA</span>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <a
            href="mailto:vaishnavi.jaligama@gmail.com"
            aria-label="Email"
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="tel:+16612193884"
            aria-label="Phone"
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <Phone className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/vaishnavi-jaligama/"
            target="_blank"
            rel="nofollow noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/vaishi01"
            target="_blank"
            rel="nofollow noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://drive.google.com/file/d/1je1tjq4AXjKwUVNb7M97KcbZAcPKUMYY/view?usp=sharing"
            target="_blank"
            rel="nofollow noopener noreferrer"
            aria-label="Resume"
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <FileText className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

