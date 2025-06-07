"use client";
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsSend } from "react-icons/bs";
import { FiUser, FiMail, FiMessageSquare } from "react-icons/fi";

function ContactForm() {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  // Validate email format
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.user_name.trim()) {
      newErrors.user_name = 'Name is required';
    }
    
    if (!formData.user_email.trim()) {
      newErrors.user_email = 'Email is required';
    } else if (!validateEmail(formData.user_email)) {
      newErrors.user_email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await emailjs.sendForm(
        'service_4h4sako',
        'template_o6sym37',
        formRef.current,
        '1up9aB2deQPU1J8wG'
      );
      
      if (result.status === 200) {
        setFormData({ user_name: '', user_email: '', message: '' });
        toast.success('Message sent successfully!');
      }
    } catch (error) {
      toast.error(error?.text || 'Failed to send message');
      console.error('Email error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="w-full bg-gradient-to-br from-[#0c0921]/60 to-[#1a1443]/60 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-[#464c6a]/30 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold mb-6 text-white">
        Send me a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16f2b3] to-[#5291ef]">Message</span>
      </h3>
      
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="user_name" className="block text-sm font-medium text-gray-200 mb-2 flex items-center">
            <FiUser className="mr-2 text-[#16f2b3]" />
            Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="user_name"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              className={`w-full bg-[#0c0921]/70 border ${errors.user_name ? 'border-red-500' : 'border-[#464c6a]'} rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16f2b3]/50 focus:border-transparent transition-all duration-300`}
              placeholder="Your name"
            />
            {errors.user_name && (
              <motion.p 
                className="text-red-500 text-xs mt-1"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {errors.user_name}
              </motion.p>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="user_email" className="block text-sm font-medium text-gray-200 mb-2 flex items-center">
            <FiMail className="mr-2 text-[#16f2b3]" />
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              id="user_email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              className={`w-full bg-[#0c0921]/70 border ${errors.user_email ? 'border-red-500' : 'border-[#464c6a]'} rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16f2b3]/50 focus:border-transparent transition-all duration-300`}
              placeholder="your.email@example.com"
            />
            {errors.user_email && (
              <motion.p 
                className="text-red-500 text-xs mt-1"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {errors.user_email}
              </motion.p>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-2 flex items-center">
            <FiMessageSquare className="mr-2 text-[#16f2b3]" />
            Message
          </label>
          <div className="relative">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className={`w-full bg-[#0c0921]/70 border ${errors.message ? 'border-red-500' : 'border-[#464c6a]'} rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16f2b3]/50 focus:border-transparent transition-all duration-300 resize-none`}
              placeholder="Tell me about your project, questions, or opportunities..."
            />
            {errors.message && (
              <motion.p 
                className="text-red-500 text-xs mt-1"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {errors.message}
              </motion.p>
            )}
          </div>
        </div>
        
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-lg flex items-center justify-center font-medium ${
            isSubmitting 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'bg-gradient-to-r from-[#16f2b3] to-[#5291ef] hover:shadow-lg hover:shadow-[#16f2b3]/20 text-black'
          } transition-all duration-300`}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        >
          {isSubmitting ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <BsSend className="mr-2" />
          )}
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </motion.button>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </motion.div>
  );
}

export default ContactForm;