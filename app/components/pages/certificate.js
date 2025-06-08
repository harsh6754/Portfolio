"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiCalendar, FiAward, FiExternalLink, FiDownload, FiSearch } from "react-icons/fi";

// Enhanced certificates data structure
const certificates = [
  {
    title: "Frontend Development",
    date: "January 2023",
    description: "Certified in advanced frontend development using React.js with a focus on performance optimization and component architecture. Completed 12 practical projects and 5 assessments.",
    image: "/image/ayla.jpg",
    issuer: "React Academy",
    credentialId: "FE-REACT-2023-1542",
    skills: ["React.js", "JavaScript", "CSS3", "Responsive Design"],
    verificationLink: "https://reactacademy.com/verify/FE-REACT-2023-1542",
    featured: true
  },
  {
    title: "Backend Development",
    date: "March 2023",
    description: "Specialized in Node.js and Express.js for building RESTful APIs, database integration, and server-side architecture. Implemented authentication, rate limiting, and caching strategies.",
    image: "/image/crefin.jpg",
    issuer: "NodeJS Foundation",
    credentialId: "NODE-EXP-2023-7891",
    skills: ["Node.js", "Express.js", "MongoDB", "REST APIs"],
    verificationLink: "https://nodejsfoundation.org/verify",
    featured: false
  },
  {
    title: "Cloud Computing",
    date: "June 2023",
    description: "Proficiency in AWS services for cloud architecture including EC2, S3, Lambda, and DynamoDB. Designed and implemented scalable cloud solutions with security best practices.",
    image: "/image/travel.jpg",
    issuer: "Amazon Web Services",
    credentialId: "AWS-CCP-2023-5421",
    skills: ["AWS", "Cloud Architecture", "Serverless", "Security"],
    verificationLink: "https://aws.amazon.com/verification",
    featured: true
  },
];

const Certificate = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Determine unique issuers for filtering
  const issuers = ["All", ...new Set(certificates.map(cert => cert.issuer))];
  
  // Filter certificates based on search and issuer filter
  const filteredCertificates = React.useMemo(() => {
    let result = [...certificates];
    
    // Filter by issuer
    if (filter !== "All") {
      result = result.filter(cert => cert.issuer === filter);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(cert => 
        cert.title.toLowerCase().includes(query) || 
        cert.description.toLowerCase().includes(query) ||
        cert.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }
    
    return result;
  }, [filter, searchQuery]);

  const handleOpenModal = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const handleCloseModal = () => {
    setSelectedCertificate(null);
  };
  
  // Escape key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') handleCloseModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="min-h-screen relative rounded-xl text-white py-16">
      <Image
        src="/section.svg"
        alt="Background"
        width={1572}
        height={850}
        className="absolute top-0 -z-10"
      />
      
      {/* Header with animated accent */}
      <div className="container mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-5xl font-bold text-center mb-3">Certificates</h2>
          <div className="flex justify-center">
            <motion.div 
              className="h-1 w-24 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            ></motion.div>
          </div>
          <p className="text-center text-gray-300 mt-4 max-w-2xl mx-auto">
            Professional certifications that validate my expertise in various technologies and development domains.
          </p>
        </motion.div>
      </div>

      

      {/* Certificate Cards */}
      <div className="container mx-auto px-6 mb-16">
        {filteredCertificates.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-50">🔍</div>
            <h3 className="text-2xl font-bold text-gray-300 mb-2">No certificates found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredCertificates.map((certificate, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {/* Featured indicator */}
                {certificate.featured && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-900/60 text-amber-300 backdrop-blur-sm">
                      <FiAward className="mr-1" size={10} />
                      Featured
                    </span>
                  </div>
                )}
                
                {/* Certificate Image with gradient overlay */}
                <div className="relative h-52 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60"></div>
                  <Image
                    src={certificate.image}
                    alt={certificate.title}
                    width={400}
                    height={225}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Issuer badge */}
                  <div className="absolute bottom-3 left-3 z-10">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-900/40 text-blue-300 rounded-full backdrop-blur-sm">
                      {certificate.issuer}
                    </span>
                  </div>
                </div>
                
                {/* Certificate details */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {certificate.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-400 mb-3">
                    <FiCalendar className="mr-1" size={14} />
                    <span>{certificate.date}</span>
                  </div>
                  
                  <p className="text-gray-300 line-clamp-3 mb-4">
                    {certificate.description}
                  </p>
                  
                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {certificate.skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded">
                        {skill}
                      </span>
                    ))}
                    {certificate.skills.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-gray-800 text-gray-400 rounded">
                        +{certificate.skills.length - 3}
                      </span>
                    )}
                  </div>
                  
                  {/* View certificate button */}
                  <button
                    onClick={() => handleOpenModal(certificate)}
                    className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg shadow-blue-700/20 transition-all flex items-center justify-center"
                  >
                    <span>View Certificate</span>
                    <FiExternalLink className="ml-2" size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal with AnimatePresence for smooth transitions */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top accent */}
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-teal-400"></div>
              
              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Left side - Certificate Image */}
                <div className="relative">
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg bg-gradient-to-br from-gray-800 to-gray-700 p-1">
                    <Image
                      src={selectedCertificate.image}
                      alt={selectedCertificate.title}
                      width={600}
                      height={450}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  {/* Image caption/watermark */}
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white">
                    Certificate of Completion
                  </div>
                </div>
                
                {/* Right side - Certificate Details */}
                <div className="flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-900/40 text-blue-300 rounded-full mb-2">
                        {selectedCertificate.issuer}
                      </span>
                      
                      <h3 className="text-2xl font-bold text-white">
                        {selectedCertificate.title}
                      </h3>
                    </div>
                    
                    {selectedCertificate.featured && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-900/60 text-amber-300">
                        <FiAward className="mr-1" size={12} />
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-400 mt-2 mb-4">
                    <FiCalendar className="mr-1" size={14} />
                    <span>{selectedCertificate.date}</span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-400 mb-1">Credential ID:</p>
                    <p className="font-mono text-gray-300 bg-gray-800/50 py-1 px-2 rounded-md text-sm">
                      {selectedCertificate.credentialId}
                    </p>
                  </div>
                  
                  <div className="text-gray-300 mb-6">
                    <p className="leading-relaxed">{selectedCertificate.description}</p>
                  </div>
                  
                  {/* Skills section */}
                  <div className="mb-6">
                    <h4 className="text-sm uppercase text-gray-400 font-medium mb-2">Skills & Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCertificate.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 text-sm bg-gray-800/80 text-gray-300 rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-6 border-t border-gray-700/50 flex flex-wrap gap-3">
                    <button 
                      className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg shadow-blue-700/20 transition-all"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                    
                    {selectedCertificate.verificationLink && (
                      <a 
                        href={selectedCertificate.verificationLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors flex items-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiExternalLink className="mr-2" size={16} />
                        Verify Certificate
                      </a>
                    )}
                    
                    <button className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors flex items-center ml-auto">
                      <FiDownload className="mr-2" size={16} />
                      Download
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Close button */}
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-700/50 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                onClick={handleCloseModal}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certificate;