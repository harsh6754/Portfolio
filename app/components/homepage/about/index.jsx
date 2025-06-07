"use client";
import { personalData } from "@/utils/data/personal-data";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const images = [
  "/slider6.jpg",
  "/slider8.jpg",
  "/slider9.jpg",
  "/slider10.jpg",
];

function AboutSection() {
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Auto-rotate images
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay]);

  const nextSlide = () => {
    setAutoplay(false);
    setIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevSlide = () => {
    setAutoplay(false);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.section
      id="about"
      className="py-24 px-4 md:px-8 lg:px-16 relative bg-gradient-to-b from-[#0c0921] to-[#0a0618]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Section title */}
      <div className="mb-16 text-center">
        <motion.h2 
          className="inline-block text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#16f2b3] to-[#5291ef] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>
        <motion.div 
          className="h-1 w-20 mx-auto bg-gradient-to-r from-[#16f2b3] to-[#5291ef] rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">
        {/* Image gallery */}
        <motion.div
          className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 pointer-events-none" />
          
          {/* Images */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <img 
                src={images[index]} 
                alt={`About me image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation controls */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all duration-300"
            aria-label="Previous image"
          >
            <FiChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all duration-300"
            aria-label="Next image"
          >
            <FiChevronRight size={24} />
          </button>
          
          {/* Image indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setAutoplay(false);
                  setIndex(i);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-[#16f2b3]" : "bg-white/60"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* About text content */}
        <div className="flex flex-col justify-center">
          <motion.span
            className="text-[#16f2b3] text-lg font-semibold mb-4 tracking-wider"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            WHO I AM
          </motion.span>
          
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {personalData.description.map((point, i) => (
              <motion.div
                key={i}
                className="flex items-start space-x-3"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                viewport={{ once: true }}
                whileHover={{ x: 5 }}
              >
                <div className="mt-1.5 min-w-2 h-2 w-2 rounded-full bg-[#16f2b3]" />
                <p className="text-gray-200 text-base md:text-lg font-light leading-relaxed">
                  {point}
                </p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <a 
              href="/resume" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#16f2b3] to-[#5291ef] text-black font-medium rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Download CV
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default AboutSection;