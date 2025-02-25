// @flow strict
"use client";
import { personalData } from "@/utils/data/personal-data";
import { useState } from "react";
import { motion } from "framer-motion";

const images = [
  "/slider1.jpg",
  "/slider2.jpg",
  "/slider6.jpg",
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
    <motion.div
      id="about"
      className="my-12 lg:my-16 px-4 md:px-8 lg:px-16 relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* ABOUT ME SIDE LABEL */}
      <motion.div
        className="hidden lg:flex flex-col items-center absolute top-16 -right-8"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          ABOUT ME
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* ABOUT TEXT */}
        <motion.div
          className="order-2 lg:order-1 text-center lg:text-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
            Who I am?
          </p>
          <ul
            className="text-gray-200 text-sm lg:text-xl list-disc pl-7"
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            {personalData.description.map((point, i) => (
              <motion.li
                key={i}
                className="transition-transform duration-300 ease-in-out hover:translate-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {point}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* 3D PARALLAX IMAGE SLIDER */}
        <motion.div
          className="flex justify-center lg:justify-end order-1 lg:order-2 relative w-full md:w-[300px] lg:w-[350px] xl:w-[420px] h-[400px] md:h-[500px] xl:h-[500px] overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="relative w-full h-full flex items-center justify-end ml-[200px]">
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
          <motion.button
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 left-3 md:left-[190px] p-2 bg-gray-800/50 text-white rounded-full hover:bg-gray-600 transition"
            whileTap={{ scale: 0.9 }}
          >
            ◀
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 right-3 md:right-1 p-2 bg-gray-800/50 text-white rounded-full hover:bg-gray-600 transition"
            whileTap={{ scale: 0.9 }}
          >
            ▶
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AboutSection;