"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { educations } from "@/utils/data/educations";
import { BsPersonWorkspace, BsAward } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";
import { IoSchoolOutline } from "react-icons/io5";
import AnimationLottie from "../../helper/animation-lottie";
import lottieFile from '/public/lottie/study.json';

function Education() {
  return (
    <section id="education" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 right-0 w-72 h-72 bg-indigo-500/10 rounded-full filter blur-3xl"></div>
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
              <FaGraduationCap className="mr-3 text-[#16f2b3]" />
              <span>Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16f2b3] to-[#5291ef]">Journey</span></span>
            </h2>
            <div className="h-[1px] w-12 bg-gradient-to-r from-violet-500 to-transparent"></div>
          </div>
          <p className="text-gray-300 mt-4 text-lg">
            My educational background and academic achievements
          </p>
        </motion.div>
      </div>

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
              <AnimationLottie animationPath={lottieFile} />
            </div>
          </motion.div>

          {/* Education timeline */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative pl-8 border-l border-indigo-900/50">
              {educations.map((education, index) => (
                <motion.div 
                  key={education.id}
                  className="mb-12 relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#16f2b3] to-[#5291ef] flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <IoSchoolOutline className="text-black text-lg" />
                  </div>
                  
                  {/* Education card */}
                  <div className="bg-gradient-to-br from-[#0c0921]/80 to-[#1a1443]/80 backdrop-blur-sm p-6 rounded-xl border border-[#464c6a]/30 shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1">
                    {/* Date badge */}
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-medium text-[#16f2b3] bg-[#16f2b3]/10 rounded-full">
                      {education.duration}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{education.title}</h3>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <BsPersonWorkspace className="text-violet-400" />
                      <p className="text-gray-300">{education.institution}</p>
                    </div>
                    
                    {education.CGPA && (
                      <div className="flex items-center gap-2 text-sm bg-gradient-to-r from-[#16f2b3]/10 to-[#5291ef]/10 px-3 py-2 rounded-lg">
                        <BsAward className="text-[#16f2b3]" />
                        <p className="text-gray-200">{education.CGPA}</p>
                      </div>
                    )}
                    
                    {education.description && (
                      <p className="mt-3 text-gray-300 text-sm">{education.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Education;