"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { Doughnut, Radar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale, PointElement, LineElement } from "chart.js";
import LoadingBar from "react-top-loading-bar";

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale, PointElement, LineElement);

const Techno = () => {
  const progressBarRef = useRef(null);
  const [showAllSkills, setShowAllSkills] = useState(false);

  // Simulate progress bar on component mount
  React.useEffect(() => {
    progressBarRef.current?.continuousStart(0);
    const timer = setTimeout(() => {
      progressBarRef.current?.complete();
    }, 2000); // Simulating loading completion after 2 seconds
    return () => clearTimeout(timer);
  }, []);

  // Define the skills and their percentages
  const skills = [
    { name: "C", percentage: 80, color: "#f94144" },
    { name: "C++", percentage: 95, color: "#f3722c" },
    { name: "Python", percentage: 50, color: "#f8961e" },
    { name: "Java", percentage: 70, color: "#f9844a" },
    { name: "HTML", percentage: 90, color: "#f9c74f" },
    { name: "CSS", percentage: 90, color: "#90be6d" },
    { name: "JavaScript", percentage: 95, color: "#43aa8b" },
    { name: "React", percentage: 95, color: "#577590" },
    { name: "Next JS", percentage: 75, color: "#7b2cbf" },
    { name: "Tailwind", percentage: 95, color: "#4cc9f0" },
    { name: "MongoDB", percentage: 90, color: "#a29bfe" },
    { name: "MySQL", percentage: 85, color: "#00cec9" },
    { name: "Git", percentage: 100, color: "#fab1a0" },
    { name: "Bootstrap", percentage: 50, color: "#e84393" },
    { name: "Figma", percentage: 75, color: "#636e72" },
    { name: "Firebase", percentage: 65, color: "#6c5ce7" },
    { name: "MaterialUI", percentage: 10, color: "#d63031" },
    { name: "Microsoft Office", percentage: 80, color: "#fdcb6e" },
    { name: "ViteJS", percentage: 70, color: "#81ecec" },
    { name: "Redis", percentage: 20, color: "#00b894" },
    { name: "Angular", percentage: 5, color: "#e17055" },
    { name: "Node.js", percentage: 80, color: "#0984e3" },
    { name: "Express.js", percentage: 80, color: "#74b9ff" },
    { name: "Docker", percentage: 70, color: "#55efc4" },
    { name: "AWS", percentage: 85, color: "#ffeaa7" },
    { name: "jQuery", percentage: 90, color: "#dfe6e9" },
    { name: "Postman", percentage: 100, color: "#fab1a0" },
  ];

  const displayedSkills = showAllSkills ? skills : skills.slice(0, 10);

  const chartData = {
    labels: skills.map((skill) => skill.name),
    datasets: [
      {
        label: "Skill Distribution",
        data: skills.map((skill) => skill.percentage),
        backgroundColor: skills.map((skill) => skill.color),
        borderColor: "#1a1443",
        borderWidth: 2,
      },
    ],
  };

  const radarData = {
    labels: skills.map((skill) => skill.name),
    datasets: [
      {
        label: "Skill Distribution Radar",
        data: skills.map((skill) => skill.percentage),
        backgroundColor: "rgba(255, 167, 38, 0.4)",
        borderColor: "#f8961e",
        borderWidth: 2,
      },
    ],
  };

  // Split the displayed skills into three parts for three columns
  const splitSkills = (skills) => {
    const chunkSize = Math.ceil(skills.length / 3);
    return [
      skills.slice(0, chunkSize),
      skills.slice(chunkSize, chunkSize * 2),
      skills.slice(chunkSize * 2),
    ];
  };

  const [col1, col2, col3] = splitSkills(displayedSkills);

  return (
    <div className="min-h-screen relative rounded-xl text-white">
      {/* Loading Progress Bar */}
      <LoadingBar color="#f8961e" ref={progressBarRef} />

      {/* Background Image */}
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10 w-full h-full object-cover"
      />

      {/* Header */}
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Technical Skills Enthusiast
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      {/* Charts Section */}
      <div className="flex flex-wrap justify-around items-start gap-10 p-5">
        {/* Donut Chart */}
        <div className="w-full md:w-1/2 lg:w-1/3">
          <Doughnut data={chartData} />
        </div>

        {/* Radar Chart */}
        <div className="w-full md:w-1/2 lg:w-1/3">
          <Radar data={radarData} />
        </div>

        {/* Skill Progress Bars in 3 columns */}
        <div className="w-full lg:w-2/3 flex gap-5">
          {[col1, col2, col3].map((col, index) => (
            <div
              key={index}
              className="w-1/3 flex flex-col gap-5 transition-all duration-500 ease-in-out"
            >
              {col.map((skill, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-center">
                    <span>{skill.name}</span>
                    <span>{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-4 mt-2">
                    <div
                      className="h-4 rounded-full"
                      style={{
                        width: `${skill.percentage}%`,
                        backgroundColor: skill.color,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* View More/View Less Button */}
      <button
        onClick={() => setShowAllSkills(!showAllSkills)}
        className="bg-[#f8961e] text-white py-2 px-4 rounded-md hover:bg-[#d77b15] transition"
      >
        {showAllSkills ? "View Less" : "View More"}
      </button>
    </div>
  );
};

export default Techno;
