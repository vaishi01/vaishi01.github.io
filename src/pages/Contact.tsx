import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Send, Github, Linkedin, AlertCircle, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import AnimatedGradientBackground from '../components/ui/animated-gradient-background';
import { cn } from "@/lib/utils";
import { MinimalistNavbar } from '../components/ui/minimalist-navbar';
import { FooterTapedDesign } from '../components/ui/footer-taped-design';
import emailjs from '@emailjs/browser';

// Type definitions
interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

interface FormTouched {
  name?: boolean;
  email?: boolean;
  phone?: boolean;
  subject?: boolean;
  message?: boolean;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<string | null>(null);

  // Simple theme detection
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize EmailJS (replace with your actual credentials)
  useEffect(() => {
    // Initialize EmailJS with your public key
    // Get your public key from https://dashboard.emailjs.com/admin/account
    emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key
  }, []);

  useEffect(() => {
    // Check for dark mode
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      console.log('Theme check - isDark:', isDark);
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

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Remove all non-digit characters for validation
    const cleanPhone = phone.replace(/\D/g, '');
    // Accept phone numbers with 10-15 digits (covers most international formats)
    return cleanPhone.length >= 10 && cleanPhone.length <= 15;
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    // Required field validations
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (10-15 digits)';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    return newErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // For name field, allow only letters and spaces
    if (name === 'name') {
      const nameValue = value.replace(/[^a-zA-Z\s]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: nameValue
      }));
    }
    // For phone field, allow only numbers, spaces, hyphens, parentheses, and plus sign
    else if (name === 'phone') {
      const phoneValue = value.replace(/[^0-9\s\-\(\)\+]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: phoneValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear submit result when user makes changes
    if (submitResult) {
      setSubmitResult(null);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate field on blur
    const fieldErrors = validateForm();
    const fieldName = name as keyof FormErrors;
    if (fieldErrors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [name]: fieldErrors[fieldName]
      }));
    }
  };

  // Check if form is valid for button state
  const isFormValid = (): boolean => {
    const formErrors = validateForm();
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched: FormTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key as keyof FormTouched] = true;
      return acc;
    }, {} as FormTouched);
    setTouched(allTouched);

    // Validate form
    const formErrors = validateForm();
    setErrors(formErrors);

    // If there are errors, don't submit
    if (Object.keys(formErrors).length > 0) {
      setSubmitResult('Please correct the errors above before submitting.');
      return;
    }

    setSubmitting(true);
    setSubmitResult(null);
    
    try {
      // Send email using EmailJS
      // Replace these with your actual EmailJS credentials from https://dashboard.emailjs.com/
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        to_email: 'vaishnavi.jaligama@gmail.com'
      };

      await emailjs.send(
        'YOUR_SERVICE_ID',    // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID',   // Replace with your EmailJS template ID
        templateParams,
        'YOUR_PUBLIC_KEY'     // Replace with your EmailJS public key
      );
      
      console.log('Email sent successfully');
      setSubmitResult('Your message has been sent successfully!');
      
      // Reset form after successful submission
      setFormData({ 
        name: '', 
        email: '', 
        phone: '', 
        subject: '', 
        message: '' 
      });
      setTouched({});
      setErrors({});
    } catch (err) {
      console.error('Error sending email: ', err);
      setSubmitResult('Failed to send message. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  console.log('Rendering Contact with isDarkMode:', isDarkMode);

  // Navigation links configuration
  const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'PROJECTS', href: '/projects' },
    { label: 'RESUME', href: '/resume' },
    { label: 'CONTACT', href: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Minimalist Navbar */}
      <MinimalistNavbar navLinks={navLinks} />

      {/* ANIMATED GRADIENT HERO SECTION */}
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden pt-16 md:pt-20">
        <AnimatedGradientBackground
          startingGap={120}
          Breathing={true}
          gradientColors={
            isDarkMode
              ? ["#000000", "#0c1220", "#1e3a8a", "#1e40af", "#2563eb", "#3b82f6", "#60a5fa"]
              : ["#f8fafc", "#f3e8ff", "#e9d5ff", "#ddd6fe", "#c4b5fd", "#a78bfa", "#8b5cf6"]
          }
          gradientStops={[30, 45, 55, 65, 75, 85, 100]}
          animationSpeed={0.015}
          breathingRange={8}
          topOffset={0}
          containerClassName="h-full"
        >
          <div className="flex h-[60vh] min-h-[500px] w-full items-center justify-center px-4">
            <div className="flex flex-col items-center justify-center gap-4 text-center max-w-4xl mx-auto">
              {/* Main Title */}
              <motion.h1
                className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight drop-shadow-lg ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Get in Touch
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className={`text-base md:text-lg lg:text-xl tracking-tight max-w-2xl drop-shadow-md ${
                  isDarkMode ? 'text-white/90' : 'text-black/80'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Open to new opportunities • Seeking full-time positions • Ready to make an impact
              </motion.p>
            </div>
          </div>
        </AnimatedGradientBackground>
      </div>

      {/* Main Content */}
      <div id="contact-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-black transition-colors duration-300">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-black dark:text-white mb-6 transition-colors duration-300">Let's Start a Conversation</h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed transition-colors duration-300">
                Looking for exciting career opportunities where I can contribute my skills and grow professionally. I'm eager to connect with recruiters, hiring managers, and industry professionals. Let's discuss how I can add value to your team.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {/* Row 1: Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-purple-600 dark:text-blue-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-black dark:text-white font-semibold mb-1 text-sm">Email Address</h3>
                    <a href="mailto:vaishnavi.jaligama@gmail.com" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-blue-400 text-sm transition-colors">
                      vaishnavi.jaligama@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-purple-600 dark:text-blue-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-black dark:text-white font-semibold mb-1 text-sm">Phone Number</h3>
                    <a href="tel:+16612193884" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-blue-400 text-sm transition-colors">
                      +1 (661) 219-3884
                    </a>
                  </div>
                </div>
              </div>

              {/* Row 2: LinkedIn and GitHub */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Linkedin className="h-5 w-5 text-purple-600 dark:text-blue-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-black dark:text-white font-semibold mb-1 text-sm">LinkedIn</h3>
                    <a 
                      href="https://www.linkedin.com/in/vaishnavi-jaligama/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-blue-400 text-sm transition-colors"
                    >
                      linkedin.com/in/vaishnavi-jaligama
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Github className="h-5 w-5 text-purple-600 dark:text-blue-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-black dark:text-white font-semibold mb-1 text-sm">GitHub</h3>
                    <a
                      href="https://github.com/vaishi01"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-blue-400 text-sm transition-colors"
                    >
                      github.com/vaishi01
                    </a>
                  </div>
                </div>
              </div>

              {/* Row 3: Location */}
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="h-5 w-5 text-purple-600 dark:text-blue-400 flex-shrink-0" />
                <div>
                  <h3 className="text-black dark:text-white font-semibold mb-1 text-sm">Location</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Santa Cruz, CA
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className="text-black dark:text-white font-semibold mb-4 transition-colors duration-300">Connect With Me</h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:vaishnavi.jaligama@gmail.com"
                  className="glass-card bg-black/5 dark:bg-white/5 hover:bg-red-500/30 dark:hover:bg-red-400/30 border border-black/10 dark:border-white/10 hover:border-red-500/50 dark:hover:border-red-400/50 p-3 rounded-lg hover:scale-110 transition-all duration-300 group"
                >
                  <Mail className="h-6 w-6 text-red-500 dark:text-red-400 group-hover:text-red-600 dark:group-hover:text-red-300 transition-colors duration-300" />
                </a>
                <a
                  href="tel:+16612193884"
                  className="glass-card bg-black/5 dark:bg-white/5 hover:bg-green-500/30 dark:hover:bg-green-400/30 border border-black/10 dark:border-white/10 hover:border-green-500/50 dark:hover:border-green-400/50 p-3 rounded-lg hover:scale-110 transition-all duration-300 group"
                >
                  <Phone className="h-6 w-6 text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-300" />
                </a>
                <a
                  href="https://www.linkedin.com/in/vaishnavi-jaligama/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card bg-black/5 dark:bg-white/5 hover:bg-blue-700/30 dark:hover:bg-blue-500/30 border border-black/10 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-blue-400/50 p-3 rounded-lg hover:scale-110 transition-all duration-300 group"
                >
                  <Linkedin className="h-6 w-6 text-blue-700 dark:text-blue-500 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors duration-300" />
                </a>
                <a
                  href="https://github.com/vaishi01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card bg-black/5 dark:bg-white/5 hover:bg-gray-600/30 dark:hover:bg-gray-300/30 border border-black/10 dark:border-white/10 hover:border-gray-400/50 dark:hover:border-gray-300/50 p-3 rounded-lg hover:scale-110 transition-all duration-300 group"
                >
                  <Github className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300" />
                </a>
                <a
                  href="https://drive.google.com/file/d/1MuGBxInScRqAfUN2Bht1JHEP6HSkEScn/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card bg-black/5 dark:bg-white/5 hover:bg-purple-600/30 dark:hover:bg-purple-400/30 border border-black/10 dark:border-white/10 hover:border-purple-400/50 dark:hover:border-purple-300/50 p-3 rounded-lg hover:scale-110 transition-all duration-300 group"
                >
                  <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card bg-black/5 dark:bg-white/5 backdrop-blur-lg border border-black/10 dark:border-white/10 rounded-lg p-6 hover:bg-black/10 dark:hover:bg-white/10 hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-bold text-black dark:text-white mb-4 transition-colors duration-300">Send me a Message</h3>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 bg-black/10 dark:bg-white/10 border rounded-lg text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent hover:bg-black/15 dark:hover:bg-white/15 transition-all duration-300 text-sm ${
                      errors.name && touched.name
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-black/20 dark:border-white/20 focus:ring-red-600 dark:focus:ring-red-400'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && touched.name && (
                    <div className="flex items-center mt-1 text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.name}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 bg-black/10 dark:bg-white/10 border rounded-lg text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent hover:bg-black/15 dark:hover:bg-white/15 transition-all duration-300 text-sm ${
                      errors.phone && touched.phone
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-black/20 dark:border-white/20 focus:ring-red-600 dark:focus:ring-red-400'
                    }`}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && touched.phone && (
                    <div className="flex items-center mt-1 text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.phone}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full px-3 py-2 bg-black/10 dark:bg-white/10 border rounded-lg text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent hover:bg-black/15 dark:hover:bg-white/15 transition-all duration-300 text-sm ${
                    errors.email && touched.email
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-black/20 dark:border-white/20 focus:ring-red-600 dark:focus:ring-red-400'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && touched.email && (
                  <div className="flex items-center mt-1 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.email}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full px-3 py-2 bg-black/10 dark:bg-white/10 border rounded-lg text-black dark:text-white focus:outline-none focus:ring-2 focus:border-transparent hover:bg-black/15 dark:hover:bg-white/15 transition-all duration-300 text-sm ${
                    errors.subject && touched.subject
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-black/20 dark:border-white/20 focus:ring-red-600 dark:focus:ring-red-400'
                  }`}
                >
                  <option value="" className="bg-white dark:bg-gray-900">Select a subject</option>
                  <option value="job-opportunity" className="bg-white dark:bg-gray-900">Job Opportunity</option>
                  <option value="interview-request" className="bg-white dark:bg-gray-900">Interview Request</option>
                  <option value="career-discussion" className="bg-white dark:bg-gray-900">Career Discussion</option>
                  <option value="networking" className="bg-white dark:bg-gray-900">Networking</option>
                  <option value="other" className="bg-white dark:bg-gray-900">Other</option>
                </select>
                {errors.subject && touched.subject && (
                  <div className="flex items-center mt-1 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.subject}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  rows={3}
                  className={`w-full px-3 py-2 bg-black/10 dark:bg-white/10 border rounded-lg text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent hover:bg-black/15 dark:hover:bg-white/15 transition-all duration-300 resize-vertical text-sm ${
                    errors.message && touched.message
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-black/20 dark:border-white/20 focus:ring-red-600 dark:focus:ring-red-400'
                  }`}
                  placeholder="Tell me about the opportunity and how I can contribute to your team..."
                />
                {errors.message && touched.message && (
                  <div className="flex items-center mt-1 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.message}
                  </div>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={!isFormValid() || submitting}
                  className={`w-full py-2.5 text-base font-medium rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 ${
                    isFormValid() && !submitting
                      ? 'glass-card bg-purple-600/50 hover:bg-purple-200/60 dark:bg-blue-600/50 dark:hover:bg-blue-500/30 text-black dark:text-white border border-purple-400/30 hover:border-purple-300/50 dark:border-blue-400/30 dark:hover:border-blue-300/50 hover:scale-105 cursor-pointer'
                      : 'bg-gray-400/30 text-gray-500 dark:text-gray-400 border border-gray-300/30 cursor-not-allowed opacity-50'
                  }`}
              >
                <Send className="h-4 w-4" />
                <span>{submitting ? 'Sending...' : 'Send Message'}</span>
              </button>

              {submitResult && (
                <p className={`text-sm text-center transition-colors duration-300 ${
                  submitResult.includes('success') 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {submitResult}
                </p>
              )}
            </div>
          </div>
        </div>     
      </div>
      <FooterTapedDesign />
    </div>
  );
};

export default Contact;