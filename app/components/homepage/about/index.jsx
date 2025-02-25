// @flow strict
"use client";
import { personalData } from "@/utils/data/personal-data";
import { useState } from "react";
import { motion } from "framer-motion";

const images = [
  "/slider1.jpg",
  "/slider2.jpg",
  "/slider3.jpg",
  "/slider4.jpg",
  "/slider5.jpg",
  "/slider6.jpg",
  "/slider7.jpg",
  "/slider8.jpg",
  "/slider9.jpg",
  "/slider10.jpg",
];

function AboutSection() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div id="about" className="my-12 lg:my-16 px-4 md:px-8 lg:px-16 relative">
      {/* ABOUT ME SIDE LABEL (Visible on Large Screens) */}
      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          ABOUT ME
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* ABOUT TEXT */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
            Who I am?
          </p>
          <ul
            className="text-gray-200 text-sm lg:text-xl list-disc pl-7"
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            {personalData.description.map((point, i) => (
              <li
                key={i}
                className="transition-transform duration-300 ease-in-out hover:translate-x-2"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* 3D PARALLAX IMAGE SLIDER */}
        <div className="flex justify-center lg:justify-end order-1 lg:order-2 relative w-full md:w-[300px] lg:w-[350px] xl:w-[300px] h-[400px] md:h-[500px] xl:h-[500px] overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-end ml-10">
            {images.map((src, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-full bg-cover bg-center rounded-lg shadow-lg"
                style={{ backgroundImage: `url(${src})` }}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{
                  opacity: i === index ? 1 : 0,
                  scale: i === index ? 1 : 1.1,
                  x: (i - index) * 30,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 left-3 md:left-8 p-2 bg-gray-800/50 text-white rounded-full hover:bg-gray-600 transition"
          >
            ◀
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 right-3 md:right-1 p-2 bg-gray-800/50 text-white rounded-full hover:bg-gray-600 transition"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
