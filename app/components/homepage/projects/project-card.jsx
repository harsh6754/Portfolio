"use client";
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { useState } from 'react';

function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="group relative w-full rounded-lg border border-[#1b2c68a0] bg-gradient-to-r from-[#0d1224] to-[#0a0d37] overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Top gradient bar */}
      <div className="flex flex-row">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
        <div className="h-[2px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
      </div>
      
      {/* Header with editor controls */}
      <div className="px-4 lg:px-6 py-3 flex items-center justify-between border-b border-indigo-900/50">
        <div className="flex items-center gap-1.5">
          <motion.div 
            className="h-3 w-3 rounded-full bg-red-400"
            whileHover={{ scale: 1.2 }}
          ></motion.div>
          <motion.div 
            className="h-3 w-3 rounded-full bg-orange-400"
            whileHover={{ scale: 1.2 }}
          ></motion.div>
          <motion.div 
            className="h-3 w-3 rounded-full bg-green-400"
            whileHover={{ scale: 1.2 }}
          ></motion.div>
        </div>
        
        <p className="text-[#16f2b3] font-medium text-base lg:text-lg truncate">
          {project.name}.js
        </p>
        
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="View live site"
            >
              <FiExternalLink />
            </a>
          )}
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="View source code"
            >
              <FiGithub />
            </a>
          )}
        </div>
      </div>
      
      {/* Code content - updated to prevent horizontal scrolling */}
      <div className="p-4 lg:p-6">
        <pre className="font-mono text-xs md:text-sm lg:text-base whitespace-pre-wrap break-words">
          <code>
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <span className="text-pink-500">const</span>
              <span className="mx-2 text-white">project</span>
              <span className="text-pink-500">=</span>
              <span className="text-gray-400 ml-2">{'{'}</span>
            </motion.div>
            
            {/* Project name */}
            <motion.div
              className="ml-4 lg:ml-6 my-2"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <span className="text-white">name:</span>
              <span className="text-gray-400 mx-1">{`'`}</span>
              <span className="text-amber-300">{project.name}</span>
              <span className="text-gray-400">{`',`}</span>
            </motion.div>

            {/* Project tools */}
            <motion.div 
              className="ml-4 lg:ml-6 my-2"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <span className="text-white">tools:</span>
              <span className="text-gray-400 mx-1">{` [`}</span>
              <div className="inline">
                {project.tools.map((tag, i) => (
                  <span key={i}>
                    <span className="text-amber-300">{`'${tag}'`}</span>
                    {project.tools.length - 1 !== i && (
                      <span className="text-gray-400">{`, `}</span>
                    )}
                  </span>
                ))}
              </div>
              <span className="text-gray-400">{"],"}
              </span>
            </motion.div>
            
            {/* Project role */}
            <motion.div
              className="ml-4 lg:ml-6 my-2"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <span className="text-white">myRole:</span>
              <span className="text-gray-400 mx-1">{`'`}</span>
              <span className="text-orange-400">{project.role}</span>
              <span className="text-gray-400">{`',`}</span>
            </motion.div>
            
            {/* Project description */}
            <motion.div
              className="ml-4 lg:ml-6 my-2"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <span className="text-white">description:</span>
              <span className="text-gray-400 mx-1">{`'`}</span>
              <span className="text-cyan-400 break-words hyphens-auto" style={{ wordBreak: 'break-word' }}>
                {project.description}
              </span>
              <span className="text-gray-400">{`',`}</span>
            </motion.div>
            
            {/* Links - updated for better URL display */}
            {(project.liveUrl || project.github) && (
              <motion.div
                className="ml-4 lg:ml-6 my-2"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <span className="text-white">links:</span>
                <span className="text-gray-400 ml-1">{'{'}</span>
                <div className="ml-2 lg:ml-4">
                  {project.liveUrl && (
                    <div>
                      <span className="text-white">live:</span>
                      <span className="text-gray-400 mx-1">{`'`}</span>
                      <span className="text-green-400 break-all">
                        {project.liveUrl}
                      </span>
                      <span className="text-gray-400">{`',`}</span>
                    </div>
                  )}
                  {project.github && (
                    <div>
                      <span className="text-white">github:</span>
                      <span className="text-gray-400 mx-1">{`'`}</span>
                      <span className="text-green-400 break-all">
                        {project.github}
                      </span>
                      <span className="text-gray-400">{`'`}</span>
                    </div>
                  )}
                </div>
                <span className="text-gray-400">{'}'}</span>
              </motion.div>
            )}
            
            {/* Closing brace */}
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              <span className="text-gray-400">{`};`}</span>
            </motion.div>
            
            {/* Cursor blink effect */}
            <motion.div 
              className="h-4 w-2 bg-white inline-block ml-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1, repeatDelay: 0.2 }}
            />
          </code>
        </pre>
      </div>
      
      {/* Interactive overlay with quick actions */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-[#0d1224]/90 to-[#0a0d37]/90 flex items-center justify-center opacity-0 pointer-events-none"
        animate={{ 
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex gap-4">
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="pointer-events-auto px-4 py-2 bg-[#16f2b3] text-black font-medium rounded-md flex items-center gap-2 hover:bg-[#16f2b3]/90 transition-colors"
            >
              <FiExternalLink />
              View Project
            </a>
          )}
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="pointer-events-auto px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-md flex items-center gap-2 transition-colors"
            >
              <FiGithub />
              View Code
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProjectCard;