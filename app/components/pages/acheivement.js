"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const achievements = [
  {
    title: "LeetCode 3-Star Coder",
    date: "August 2024",
    description:
      "Achieved a rating of 1786 on LeetCode, showcasing advanced problem-solving skills.",
    icon: "🌟",
    certificateImage: "/image/ayla.jpg",
    category: "Competitive Programming"
  },
  {
    title: "Global Rank 2063",
    date: "July 2024",
    description:
      "Ranked 2063 globally out of 30,000+ participants in a competitive programming contest.",
    icon: "🌍",
    certificateImage: "/image/crefin.jpg",
    category: "Competition"
  },
  {
    title: "Code Debugging Competition Finalist",
    date: "June 2024",
    description:
      "Advanced to the final round among the top 10,000+ participants in a debugging competition.",
    icon: "🐛",
    certificateImage: "/image/real-estate.jpg",
    category: "Competition"
  },
  {
    title: "SSIP Certification",
    date: "April 2024",
    description:
      "Awarded for presenting innovative, high-impact project ideas contributing to a startup initiative.",
    icon: "🏆",
    certificateImage: "/image/travel.jpg",
    category: "Innovation"
  },
];

const Achievement = () => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [filter, setFilter] = useState("All");
  
  const categories = ["All", ...new Set(achievements.map(a => a.category))];
  
  const filteredAchievements = filter === "All" 
    ? achievements 
    : achievements.filter(a => a.category === filter);

  const handleOpenModal = (achievement) => {
    setSelectedAchievement(achievement);
  };

  const handleCloseModal = () => {
    setSelectedAchievement(null);
  };

  return (
    <div className="min-h-screen relative rounded-xl text-white py-12">
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      {/* Header */}
      <div className="container mx-auto mb-12">
        <h2 className="text-4xl font-bold text-center mb-3">Achievements</h2>
        <div className="flex justify-center">
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full"></div>
        </div>
        <p className="text-center text-gray-300 mt-4 max-w-2xl mx-auto">
          Recognition and milestones from my journey in software development and competitive programming.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center mb-8 flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === category 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Achievement Cards */}
      <div className="container mx-auto">
        <div className="grid gap-6 px-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300"
              onClick={() => handleOpenModal(achievement)}
            >
              {/* Top accent border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-teal-400"></div>
              
              <div className="p-6">
                {/* Category Badge */}
                <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-900/40 text-blue-300 rounded-full mb-4">
                  {achievement.category}
                </span>
                
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-xl shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                    {achievement.icon}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-sm font-medium text-blue-400/80">
                      {achievement.date}
                    </p>
                  </div>
                </div>
                
                <p className="mt-4 text-gray-300 line-clamp-3">
                  {achievement.description}
                </p>
                
                {/* View details button */}
                <div className="mt-6 flex justify-end">
                  <div className="text-sm font-medium text-blue-400 flex items-center group-hover:text-blue-300 transition-colors">
                    View Certificate
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedAchievement && (
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
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top accent */}
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-teal-400"></div>
              
              <div className="grid md:grid-cols-2 gap-6 p-6">
                {/* Left side - Image */}
                <div className="relative">
                  <div className="aspect-square w-full overflow-hidden rounded-lg shadow-lg bg-gradient-to-br from-gray-800 to-gray-700 p-1">
                    <Image
                      src={selectedAchievement.certificateImage}
                      alt={selectedAchievement.title}
                      width={600}
                      height={600}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
                
                {/* Right side - Details */}
                <div className="flex flex-col">
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-900/40 text-blue-300 rounded-full">
                      {selectedAchievement.category}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white">
                    {selectedAchievement.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <div className="text-2xl">{selectedAchievement.icon}</div>
                    <p className="text-blue-400 font-medium">
                      {selectedAchievement.date}
                    </p>
                  </div>
                  
                  <div className="mt-4 text-gray-300 flex-grow">
                    <p className="leading-relaxed">{selectedAchievement.description}</p>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-700/50">
                    <button 
                      className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg shadow-blue-700/20 transition-all"
                      onClick={handleCloseModal}
                    >
                      Close
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

export default Achievement;