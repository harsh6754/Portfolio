"use client";
import React, { useState } from "react";
import Image from "next/image";

const achievements = [
  {
    title: "LeetCode 3-Star Coder",
    date: "August 2024",
    description:
      "Achieved a rating of 1786 on LeetCode, showcasing advanced problem-solving skills.",
    icon: "🌟",
    certificateImage: "/image/ayla.jpg", // Add image path
  },
  {
    title: "Global Rank 2063",
    date: "July 2024",
    description:
      "Ranked 2063 globally out of 30,000+ participants in a competitive programming contest.",
    icon: "🌍",
    certificateImage: "/image/crefin.jpg", // Add image path
  },
  {
    title: "Code Debugging Competition Finalist",
    date: "June 2024",
    description:
      "Advanced to the final round among the top 10,000+ participants in a debugging competition.",
    icon: "🐛",
    certificateImage: "/image/real-estate.jpg", // Add image path
  },
  {
    title: "SSIP Certification",
    date: "April 2024",
    description:
      "Awarded for presenting innovative, high-impact project ideas contributing to a startup initiative.",
    icon: "🏆",
    certificateImage: "/image/travel.jpg", // Add image path
  },
];

const Achievement = () => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const handleOpenModal = (achievement) => {
    setSelectedAchievement(achievement);
  };

  const handleCloseModal = () => {
    setSelectedAchievement(null);
  };

  return (
    <div className="min-h-screen relative rounded-xl text-white">
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      {/* Header */}
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            My Achievements
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      {/* Achievement Cards */}
      <div className="grid gap-6 px-6 py-8 md:grid-cols-2 lg:grid-cols-3 md:px-12">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-lg bg-gray-800 p-6 shadow-lg transition-transform hover:scale-105 cursor-pointer"
            onClick={() => handleOpenModal(achievement)}
          >
            {/* Icon */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-600 text-3xl">
              {achievement.icon}
            </div>

            {/* Content */}
            <div>
              <h3 className="text-xl font-semibold text-pink-500">
                {achievement.title}
              </h3>
              <p className="text-sm text-gray-400">{achievement.date}</p>
              <p className="mt-2 text-gray-300">{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedAchievement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <Image
              src={selectedAchievement.certificateImage}
              alt={selectedAchievement.title}
              width={400}
              height={400}
              className="w-full rounded-md"
            />
            <h3 className="mt-4 text-xl font-bold text-black">
              {selectedAchievement.title}
            </h3>
            <p className="text-gray-600">{selectedAchievement.date}</p>
            <p className="mt-2 text-gray-700">{selectedAchievement.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Achievement;
