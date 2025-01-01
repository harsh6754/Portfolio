"use client";

import React, { useState } from "react";
import Image from "next/image";

const certificates = [
  {
    title: "Frontend Development",
    date: "January 2023",
    description: "Certified in advanced frontend development using React.js.",
    image: "/image/ayla.jpg", // Replace with your image paths
  },
  {
    title: "Backend Development",
    date: "March 2023",
    description: "Specialized in Node.js and Express.js for building APIs.",
    image: "/image/crefin.jpg",
  },
  {
    title: "Cloud Computing",
    date: "June 2023",
    description: "Proficiency in AWS services for cloud architecture.",
    image: "/image/travel.jpg",
  },
];

const Certificate = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const handleOpenModal = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const handleCloseModal = () => {
    setSelectedCertificate(null);
  };

  return (
    <div className="min-h-screen relative rounded-xl text-white">
    <Image
            src="/section.svg"
            alt="Hero"
            width={1572}
            height={850}
            className="absolute top-0 -z-10"
          />
      {/* Header */}
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Certificates
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      {/* Certificate Cards */}
      <div className="grid gap-8 px-4 py-10 md:grid-cols-2 lg:grid-cols-3 md:px-10">
        {certificates.map((certificate, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg bg-gray-800 shadow-md group"
          >
            {/* Image */}
            <div className="h-48 overflow-hidden">
              <img
                src={certificate.image}
                alt={certificate.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Details */}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-pink-500">
                {certificate.title}
              </h3>
              <p className="mt-1 text-sm text-gray-400">{certificate.date}</p>
              <p className="mt-3 text-gray-300">{certificate.description}</p>
            </div>

            {/* Hover Overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center bg-pink-600 bg-opacity-75 text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer"
              onClick={() => handleOpenModal(certificate)}
            >
              <p className="px-4 text-lg font-bold">View Certificate</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300"
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
            <img
              src={selectedCertificate.image}
              alt={selectedCertificate.title}
              className="w-full rounded-md"
            />
            <h3 className="mt-4 text-xl font-bold text-black">
              {selectedCertificate.title}
            </h3>
            <p className="text-gray-600">{selectedCertificate.date}</p>
            <p className="mt-2 text-gray-700">{selectedCertificate.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificate;
