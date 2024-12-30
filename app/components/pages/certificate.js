import React from "react";

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
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="py-10 text-center">
        <h1 className="text-4xl font-bold tracking-wide text-pink-600">
          My Certificates
        </h1>
        <p className="mt-2 text-lg text-gray-300">
          A showcase of my achievements and expertise.
        </p>
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
            <div className="absolute inset-0 flex items-center justify-center bg-pink-600 bg-opacity-75 text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="px-4 text-lg font-bold">View Certificate</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificate;
