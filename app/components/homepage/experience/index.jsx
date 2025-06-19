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
            My journey as a software engineer and the companies I&apos;ve worked with
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

      {/* Experience details modal - with height adjustments */}
      {selectedExp && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <motion.div 
            className="bg-gradient-to-br from-[#0c0921] to-[#1a1443] max-w-3xl w-full rounded-xl border border-[#464c6a]/30 shadow-2xl overflow-hidden max-h-[85vh]" 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            ref={modalRef}
          >
            <div className="relative h-full">
              <button 
                className="absolute right-4 top-4 bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full text-white z-10"
                onClick={closeModal}
              >
                <BsX size={20} />
              </button>
              
              <div className="p-6 md:p-8 overflow-y-auto max-h-[85vh]">
                <div className="inline-block px-3 py-1 mb-3 text-xs font-medium text-[#16f2b3] bg-[#16f2b3]/10 rounded-full">
                  {selectedExp.duration}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{selectedExp.title}</h3>
                <div className="flex items-center gap-2 mb-6">
                  <HiOutlineLocationMarker className="text-violet-400" />
                  <p className="text-gray-300">{selectedExp.company}</p>
                </div>
                
                {selectedExp.description && (
                  <div className="mb-6">
                    <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                      <span className="text-[#16f2b3]">Overview</span>
                    </h4>
                    <p className="text-gray-300">{selectedExp.description}</p>
                  </div>
                )}
                
                {selectedExp.responsibilities && (
                  <div className="mb-6">
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <span className="text-[#16f2b3]">Key Responsibilities</span>
                    </h4>
                    <ul className="space-y-2">
                      {selectedExp.responsibilities.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-300">
                          <div className="min-w-[20px] mt-1">
                            <div className="w-2 h-2 bg-[#16f2b3] rounded-full"></div>
                          </div>
                          <p>{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedExp.technologies && (
                  <div className="mb-6">
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <FaCode className="text-[#16f2b3]" />
                      <span>Technologies Used</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExp.technologies.map((tech, idx) => (
                        <span key={idx} className="text-sm px-3 py-1 bg-violet-900/30 text-violet-300 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedExp.projects && selectedExp.projects.length > 0 ? (
                  <div className="mt-6">
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <span className="text-[#16f2b3]">Projects Created</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedExp.projects.map((project, idx) => (
                        <div 
                          key={idx}
                          className="bg-[#0c0921]/70 rounded-lg overflow-hidden border border-[#464c6a]/30 hover:border-[#16f2b3]/30 transition-all duration-300 cursor-pointer group"
                          onClick={() => handleImageClick(project.imageUrl)}
                        >
                          <div className="relative h-32"> {/* Reduced height from h-40 to h-32 */}
                            {project.imageUrl && (
                              <Image 
                                src={project.imageUrl} 
                                alt={project.title || `Project ${idx + 1}`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            )}
                          </div>
                          <div className="p-3"> {/* Reduced padding from p-4 to p-3 */}
                            <h5 className="text-white font-medium mb-1">{project.title || `Project ${idx + 1}`}</h5>
                            {project.description && (
                              <p className="text-gray-300 text-xs line-clamp-2">{project.description}</p> 
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : selectedExp.imageUrl ? (
                  <div className="mt-6">
                    <h4 className="text-white font-medium mb-3">Project Screenshot</h4>
                    <div 
                      className="cursor-pointer rounded-lg overflow-hidden border border-[#464c6a]/30"
                      onClick={() => handleImageClick(selectedExp.imageUrl)}
                    >
                      <Image 
                        src={selectedExp.imageUrl} 
                        alt={`${selectedExp.company} project`}
                        width={800}
                        height={450}
                        className="w-full h-auto max-h-[300px] object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                ) : null}
              </div>
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
            <Image 
              src={selectedImage} 
              alt="Project screenshot" 
              width={1200}
              height={800}
              className="w-full h-auto object-contain rounded-lg"
            />
          </motion.div>
        </div>
      )}
    </section>
  );
}

export default Experience;