import React from "react";
import Image from "next/image";

const achievements = [
  {
    title: "LeetCode 3-Star Coder",
    date: "August 2024",
    description:
      "Achieved a rating of 1786 on LeetCode, showcasing advanced problem-solving skills.",
    icon: "🌟",
  },
  {
    title: "Global Rank 2063",
    date: "July 2024",
    description:
      "Ranked 2063 globally out of 30,000+ participants in a competitive programming contest.",
    icon: "🌍",
  },
  {
    title: "Code Debugging Competition Finalist",
    date: "June 2024",
    description:
      "Advanced to the final round among the top 10,000+ participants in a debugging competition.",
    icon: "🐛",
  },
  {
    title: "SSIP Certification",
    date: "April 2024",
    description:
      "Awarded for presenting innovative, high-impact project ideas contributing to a startup initiative.",
    icon: "🏆",
  },
];

const Achievement = () => {
  return (
    <div className="min-h-screen  rounded-xl text-white">
    <Image
            src="/section.svg"
            alt="Hero"
            width={1572}
            height={795}
            className="absolute top-0 -z-10"
          />
      {/* Header */}
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            My Achivement
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      {/* Achievement Cards */}
      <div className="grid gap-6 px-6 py-8 md:grid-cols-2 lg:grid-cols-3 md:px-12">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-lg bg-gray-800 p-6 shadow-lg transition-transform hover:scale-105"
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
    </div>
  );
};

export default Achievement;
