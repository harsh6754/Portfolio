"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Doughnut, Radar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler } from "chart.js";
import { motion, AnimatePresence } from "framer-motion";
import { HiCode, HiDatabase, HiDesktopComputer, HiTerminal } from "react-icons/hi";
import { BsArrowRightShort } from "react-icons/bs";

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler);

// Categorize skills
const skillCategories = {
  frontend: [
    { name: "HTML", percentage: 90, color: "#f9c74f" },
    { name: "CSS", percentage: 90, color: "#90be6d" },
    { name: "JavaScript", percentage: 95, color: "#43aa8b" },
    { name: "React", percentage: 95, color: "#577590" },
    { name: "Next.js", percentage: 75, color: "#7b2cbf" },
    { name: "Tailwind", percentage: 95, color: "#4cc9f0" },
    { name: "Bootstrap", percentage: 50, color: "#e84393" },
    { name: "Material UI", percentage: 10, color: "#d63031" },
    { name: "jQuery", percentage: 90, color: "#dfe6e9" },
  ],
  backend: [
    { name: "Node.js", percentage: 80, color: "#0984e3" },
    { name: "Express.js", percentage: 80, color: "#74b9ff" },
    { name: "C#", percentage: 50, color: "#f9c74f" },
    { name: "Dotnet", percentage: 60, color: "#f3722c" },
    { name: "Python", percentage: 50, color: "#f8961e" },
    { name: "Java", percentage: 70, color: "#f9844a" },
    { name: "C", percentage: 80, color: "#f94144" },
    { name: "C++", percentage: 95, color: "#f3722c" },
  ],
  database: [
    { name: "MongoDB", percentage: 90, color: "#a29bfe" },
    { name: "MySQL", percentage: 85, color: "#00cec9" },
    { name: "PostgreSQL", percentage: 100, color: "#f3722c" },
    { name: "SQL", percentage: 100, color: "#f3722c" },
    { name: "Redis", percentage: 20, color: "#00b894" },
    { name: "Firebase", percentage: 65, color: "#6c5ce7" },
  ],
  tools: [
    { name: "Git", percentage: 100, color: "#fab1a0" },
    { name: "Docker", percentage: 70, color: "#55efc4" },
    { name: "AWS", percentage: 85, color: "#ffeaa7" },
    { name: "Figma", percentage: 75, color: "#636e72" },
    { name: "Postman", percentage: 100, color: "#fab1a0" },
    { name: "ViteJS", percentage: 70, color: "#81ecec" },
  ],
};

// Get all skills as a flat array
const allSkills = Object.values(skillCategories).flat();

const Techno = () => {
  const [activeCategory, setActiveCategory] = useState("frontend");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Prepare chart data for the selected category
  const chartData = {
    labels: skillCategories[activeCategory].map((skill) => skill.name),
    datasets: [
      {
        label: `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Skills`,
        data: skillCategories[activeCategory].map((skill) => skill.percentage),
        backgroundColor: skillCategories[activeCategory].map((skill) => `${skill.color}99`),
        borderColor: skillCategories[activeCategory].map((skill) => skill.color),
        borderWidth: 2,
      },
    ],
  };

  // Get top skills from the ACTIVE CATEGORY only
  const topSkills = [...skillCategories[activeCategory]]
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 7);
  
  const radarData = {
    labels: topSkills.map((skill) => skill.name),
    datasets: [
      {
        label: `Top ${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Skills`,
        data: topSkills.map((skill) => skill.percentage),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        pointBackgroundColor: topSkills.map((skill) => skill.color),
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: topSkills.map((skill) => skill.color),
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    },
    scales: {
      r: {
        angleLines: {
          color: "rgba(255, 255, 255, 0.15)",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.15)",
        },
        pointLabels: {
          color: "#ffffff",
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
        ticks: {
          backdropColor: "transparent",
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
    },
    elements: {
      line: {
        tension: 0.2,
      },
    },
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case "frontend": return <HiCode className="text-2xl" />;
      case "backend": return <HiTerminal className="text-2xl" />;
      case "database": return <HiDatabase className="text-2xl" />;
      case "tools": return <HiDesktopComputer className="text-2xl" />;
      default: return <HiCode className="text-2xl" />;
    }
  };

  return (
    <motion.section
      id="skills"
      className="py-20 px-4 md:px-8 lg:px-16 relative bg-gradient-to-b from-[#0c0921] to-[#0a0618] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image
          src="/section.svg"
          alt="Background"
          width={1572}
          height={795}
          className="absolute top-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0c0921]/70 to-[#0a0618]/70"></div>
      </div>

      {/* Section header */}
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.h2
          className="inline-block text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#16f2b3] to-[#5291ef] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          Technical Skills
        </motion.h2>
        <motion.div
          className="h-1 w-20 mx-auto bg-gradient-to-r from-[#16f2b3] to-[#5291ef] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: isLoaded ? 80 : 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
        <motion.p
          className="text-gray-300 mt-4 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          A showcase of my technical expertise and proficiency in various programming languages, frameworks, and tools
        </motion.p>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {/* Category navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {Object.keys(skillCategories).map((category) => (
            <motion.button
              key={category}
              className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-[#16f2b3] to-[#5291ef] text-black font-semibold shadow-lg"
                  : "bg-white/5 text-white hover:bg-white/10"
              }`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {getCategoryIcon(category)}
              <span className="capitalize">
                {category}
              </span>
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Skills chart */}
          <motion.div
            className="lg:col-span-5 bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -30 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-white capitalize">
              {activeCategory} Skills Overview
            </h3>
            <div className="h-[300px] flex items-center justify-center">
              <Doughnut 
                data={chartData} 
                options={{
                  maintainAspectRatio: false,
                  cutout: '70%',
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        color: 'white',
                        padding: 15,
                        usePointStyle: true,
                        font: {
                          size: 11
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </motion.div>

          {/* Top skills radar */}
          <motion.div
            className="lg:col-span-7 bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            key={activeCategory} // Add key to force re-render when category changes
          >
            <h3 className="text-xl font-semibold mb-4 text-white capitalize">
              Top {activeCategory} Skills Proficiency
            </h3>
            <AnimatePresence mode="wait">
              <motion.div 
                className="h-[300px] flex items-center justify-center"
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Radar data={radarData} options={chartOptions} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Skill bars */}
        <motion.div
          className="mt-12 bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h3 className="text-xl font-semibold mb-6 text-white capitalize">
            {activeCategory} Skills Breakdown
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories[activeCategory].map((skill, index) => (
              <motion.div
                key={skill.name}
                className={`p-4 rounded-lg transition-all duration-300 ${
                  selectedSkill === skill.name ? "bg-white/10" : "hover:bg-white/5"
                }`}
                onClick={() => setSelectedSkill(skill.name === selectedSkill ? null : skill.name)}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-white">{skill.name}</span>
                  <span className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#16f2b3] to-[#5291ef]">
                    {skill.percentage}%
                  </span>
                </div>
                <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.percentage}%` }}
                    transition={{ duration: 1, delay: 0.2 * index }}
                  />
                </div>
                
                {selectedSkill === skill.name && (
                  <motion.div
                    className="mt-3 text-sm text-gray-300"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <p>Experience level: {skill.percentage >= 90 ? "Expert" : skill.percentage >= 70 ? "Advanced" : skill.percentage >= 40 ? "Intermediate" : "Beginner"}</p>
                    <p className="mt-1 flex items-center text-[#16f2b3]">
                      <BsArrowRightShort size={18} />
                      <span>Click to view projects</span>
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Techno;