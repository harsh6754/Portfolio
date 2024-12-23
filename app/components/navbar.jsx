// @flow strict
"use client";

import { useState } from "react";
import Link from "next/link";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-transparent">
      <div className="flex items-center justify-between py-5 px-4 md:px-8">
        {/* Logo */}
        <div className="flex flex-shrink-0 items-center">
          <Link href="/" className="text-[#16f2b3] text-2xl font-bold">
            Harsh Agrawal
          </Link>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="block md:hidden text-white focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Nav Links */}
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } absolute top-16 left-0 z-10 w-full bg-black bg-opacity-80 flex flex-col items-start space-y-2 px-4 pb-4 text-sm md:relative md:top-0 md:left-auto md:z-auto md:flex md:w-auto md:flex-row md:space-y-0 md:space-x-6 md:bg-transparent md:pb-0`}
        >
          {[
            { href: "#about", label: "ABOUT" },
            { href: "#experience", label: "EXPERIENCE" },
            { href: "#achivement", label: "ACHIVEMENT" },
            { href: "#skills", label: "SKILLS" },
            { href: "#education", label: "EDUCATION" },
            { href: "#blogs", label: "BLOGS" },
            { href: "#projects", label: "PROJECTS" },
          ].map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block px-4 py-2 no-underline outline-none hover:no-underline"
              >
                <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                  {link.label}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
