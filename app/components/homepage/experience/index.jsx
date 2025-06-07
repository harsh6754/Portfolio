"use client";

import { useState, useRef } from "react";
import { experiences } from "@/utils/data/experience";
import Image from "next/image";
import { motion } from "framer-motion";
import { BsBriefcase, BsArrowRight, BsX } from "react-icons/bs";
import { FaCode } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import AnimationLottie from "../../helper/animation-lottie";
import experience from '/public/lottie/coding.json';

function Experience() {
  const [selectedExp, setSelectedExp] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const modalRef = useRef(null);

  const handleExpClick = (exp) => {
    setSelectedExp(exp);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedExp(null);
  };

  const closeImageView = () => {
    setSelectedImage(null);
  };

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 right-0 w-72 h-72 bg-violet-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-[#16f2b3]/10 rounded-full filter blur-3xl"></div>
        <Image
          src="/section.svg"
          alt="Background pattern"
          width={1572}
          height={795}
          className="absolute top-0 opacity-30"
        />
      </div>

      {/* Section header */}
      <div className="container mx-auto px-4 mb-16">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-violet-500"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center">
              <BsBriefcase className="mr-3 text-[#16f2b3]" />
              <span>Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16f2b3] to-[#5291ef]">Experience</span></span>
            </h2>
            <div className="h-[1px] w-12 bg-gradient-to-r from-violet-500 to-transparent"></div>
          </div>
          <p className="text-gray-300 mt-4 text-lg">
            My journey as a software engineer and the companies I've worked with
          </p>
        </motion.div>
      </div>

      {/* Experience content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Animation column */}
          <motion.div 
            className="lg:col-span-2 flex justify-center items-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-full max-w-md">
              <AnimationLottie animationPath={experience} />
            </div>
          </motion.div>

          {/* Experience timeline */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative pl-8 border-l border-violet-900/50">
              {experiences.map((exp, index) => (
                <motion.div 
                  key={exp.id}
                  className="mb-12 relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#16f2b3] to-[#5291ef] flex items-center justify-center shadow-lg shadow-violet-500/20">
                    <BsBriefcase className="text-black text-lg" />
                  </div>
                  
                  {/* Experience card */}
                  <motion.div 
                    className="bg-gradient-to-br from-[#0c0921]/80 to-[#1a1443]/80 backdrop-blur-sm p-6 rounded-xl border border-[#464c6a]/30 shadow-xl hover:shadow-violet-500/10 transition-all duration-300 cursor-pointer"
                    whileHover={{ y: -5 }}
                    onClick={() => handleExpClick(exp)}
                  >
                    {/* Duration badge */}
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-medium text-[#16f2b3] bg-[#16f2b3]/10 rounded-full">
                      {exp.duration}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{exp.title}</h3>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <HiOutlineLocationMarker className="text-violet-400" />
                      <p className="text-gray-300">{exp.company}</p>
                    </div>
                    
                    {exp.description && (
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{exp.description}</p>
                    )}
                    
                    <div className="flex justify-between items-center">
                      {exp.technologies && (
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.slice(0, 3).map((tech, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 bg-violet-900/30 text-violet-300 rounded-md">
                              {tech}
                            </span>
                          ))}
                          {exp.technologies.length > 3 && (
                            <span className="text-xs px-2 py-1 bg-violet-900/30 text-violet-300 rounded-md">
                              +{exp.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                      
                      <button className="text-[#16f2b3] hover:text-white transition-colors flex items-center gap-1 text-sm">
                        Details <BsArrowRight />
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Experience details modal */}
      {selectedExp && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={closeModal}>
          <motion.div 
            className="bg-gradient-to-br from-[#0c0921] to-[#1a1443] max-w-3xl w-full rounded-xl border border-[#464c6a]/30 shadow-2xl overflow-hidden my-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            ref={modalRef}
          >
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-violet-600/20 to-[#16f2b3]/20 p-6 md:p-8 border-b border-[#464c6a]/30 relative">
              <button 
                className="absolute right-4 top-4 bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full text-white"
                onClick={closeModal}
                aria-label="Close details"
              >
                <BsX size={20} />
              </button>
              
              <div className="inline-block px-3 py-1 mb-3 text-xs font-medium text-[#16f2b3] bg-[#16f2b3]/10 rounded-full">
                {selectedExp.duration}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">{selectedExp.title}</h3>
              <div className="flex items-center gap-2">
                <HiOutlineLocationMarker className="text-violet-400" />
                <p className="text-gray-300">{selectedExp.company}</p>
              </div>
            </div>
            
            {/* Content section */}
            <div className="p-6 md:p-8">
              {selectedExp.description && (
                <div className="mb-8">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2 pb-2 border-b border-[#464c6a]/30">
                    <span className="bg-gradient-to-r from-[#16f2b3] to-[#5291ef] text-transparent bg-clip-text">Overview</span>
                  </h4>
                  <p className="text-gray-300 leading-relaxed">{selectedExp.description}</p>
                </div>
              )}
              
              {selectedExp.responsibilities && (
                <div className="mb-8">
                  <h4 className="text-white font-medium mb-4 flex items-center gap-2 pb-2 border-b border-[#464c6a]/30">
                    <span className="bg-gradient-to-r from-[#16f2b3] to-[#5291ef] text-transparent bg-clip-text">Key Responsibilities</span>
                  </h4>
                  <ul className="space-y-3">
                    {selectedExp.responsibilities.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-300 group">
                        <div className="min-w-[24px] h-6 mt-0.5 flex items-center justify-center">
                          <div className="w-2 h-2 bg-gradient-to-r from-[#16f2b3] to-[#5291ef] rounded-full group-hover:scale-125 transition-transform"></div>
                        </div>
                        <p className="leading-relaxed">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedExp.technologies && (
                <div className="mb-8">
                  <h4 className="text-white font-medium mb-4 flex items-center gap-2 pb-2 border-b border-[#464c6a]/30">
                    <FaCode className="text-[#16f2b3]" />
                    <span>Technologies Used</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedExp.technologies.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="text-sm px-3 py-1.5 bg-gradient-to-r from-violet-900/40 to-indigo-900/40 text-violet-300 rounded-full border border-violet-800/30 hover:-translate-y-1 transition-transform duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedExp.imageUrl && (
                <div className="mt-8">
                  <h4 className="text-white font-medium mb-4 flex items-center gap-2 pb-2 border-b border-[#464c6a]/30">
                    <span>Project Screenshot</span>
                  </h4>
                  <div 
                    className="cursor-pointer rounded-lg overflow-hidden border border-[#464c6a]/30 relative group"
                    onClick={() => handleImageClick(selectedExp.imageUrl)}
                  >
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <div className="bg-white/20 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path>
                        </svg>
                      </div>
                    </div>
                    {/* <Image 
                      src={selectedExp.imageUrl} 
                      alt={`${selectedExp.company} project`}
                      width={800}
                      height={450}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    /> */}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Full-size image viewer */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeImageView}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-5xl w-full"
          >
            <button 
              className="absolute right-4 top-4 bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full text-white z-10"
              onClick={closeImageView}
            >
              <BsX size={24} />
            </button>
            {/* <Image 
              src={selectedImage} 
              alt="Project screenshot" 
              width={1200}
              height={800}
              className="w-full h-auto object-contain rounded-lg"
            /> */}
          </motion.div>
        </div>
      )}
    </section>
  );
}

export default Experience; 