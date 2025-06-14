// @flow strict
"use client";
import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsGithub, BsLinkedin, BsWhatsapp } from "react-icons/bs"; 
import { FaFacebook, FaTwitterSquare } from "react-icons/fa";
import { MdDownload, MdClose } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { SiLeetcode } from "react-icons/si";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { BsPlayFill } from "react-icons/bs";
import { BiInfoCircle } from "react-icons/bi"; // Added for toast info icon
import Counter from "../../Counter";
import { motion, AnimatePresence } from "framer-motion";

function HeroSection() {
  const [showJobBanner, setShowJobBanner] = useState(true);
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showSchedulePopup, setShowSchedulePopup] = useState(false); // New state for availability calendar

  useEffect(() => {
    // Hide the banner after 10 seconds and scroll to experience section
    const timer = setTimeout(() => {
      setShowJobBanner(false);
      
      // Scroll to experience section after banner closes
      const experienceSection = document.getElementById('experience');
      if (experienceSection) {
        // Small delay to ensure the banner exit animation completes
        setTimeout(() => {
          experienceSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 300);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Handle manual banner close
  const handleBannerClose = () => {
    setShowJobBanner(false);
    
    // Also scroll to experience section when manually closed
    const experienceSection = document.getElementById('experience');
    if (experienceSection) {
      setTimeout(() => {
        experienceSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);
    }
  };

  // Show toast notification
  const handleBriefIntroduction = () => {
    setShowToast(true);
    
    // Automatically hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Toggle video popup (kept for future implementation)
  const toggleVideoPopup = () => {
    setShowVideoPopup(!showVideoPopup);
  };

  // Toggle schedule popup
  const toggleSchedulePopup = () => {
    setShowSchedulePopup(!showSchedulePopup);
  };

  return (
    <section className="relative flex flex-col items-center justify-between py-4 lg:py-12">
      <Image
        src="/hero.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute -top-[98px] -z-10"
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-violet-600 to-pink-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
          >
            <BiInfoCircle size={20} />
            <span className="font-medium">Feature under construction!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Job Availability Banner with OPEN TO WORK first */}
      <AnimatePresence>
        {showJobBanner && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed top-0 inset-x-0 z-50 py-3 px-4 bg-gradient-to-r from-violet-600/90 to-pink-500/90 backdrop-blur-sm shadow-lg border-b border-white/10"
          >
            <div className="container mx-auto flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-full mr-3 animate-pulse">
                  <HiOutlineStatusOnline className="text-white" size={18} />
                </div>
                <div>
                  {/* First: Job seeking status - Highlighted and more prominent */}
                  <div className="flex items-center mb-1.5">
                    <span className="bg-emerald-500/40 text-emerald-100 px-3 py-1 rounded text-sm font-bold mr-3 border border-emerald-400/30 shadow-sm">
                      OPEN TO WORK
                    </span>
                    <span className="text-white font-medium">Actively seeking software engineering opportunities</span>
                  </div>
                  
                  {/* Second: Experience */}
                  <p className="text-white/90 text-sm">
                    Currently <span className="font-bold">Software Engineer</span> at <span className="text-yellow-300">Casepoint</span> with <span className="font-medium">1 year experience</span>
                  </p>
                  
                  {/* Third: Notice period and availability */}
                  <div className="text-white/80 text-sm mt-1 space-y-1">
                    <p>
                      <span className="text-yellow-200 font-medium">15-day notice period</span> • Available for immediate interviews
                    </p>
                    <p className="flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>
                        <span className="text-gray-300">Available:</span> Mon-Fri <span className="text-cyan-300">after 8pm</span> • Sat-Sun <span className="text-cyan-300">anytime</span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 flex-wrap">
                <Link 
                  href="https://www.linkedin.com/in/harsh2810" 
                  target="_blank"
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 shadow-md"
                >
                  <BsLinkedin size={14} />
                  <span>Connect on LinkedIn</span>
                </Link>
                
                {/* New button for schedule popup */}
                <button 
                  onClick={toggleSchedulePopup}
                  className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Check Availability</span>
                </button>
                
                <Link 
                  href="https://wa.me/919636504390" 
                  target="_blank"
                  className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 shadow-md"
                >
                  <BsWhatsapp size={14} />
                  <span>Schedule Interview</span>
                </Link>
                
                <button 
                  onClick={() => {
                    // Scroll to contact section instead of experience
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                    setShowJobBanner(false);
                  }}
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
                >
                  <RiContactsFill size={14} />
                  <span>Contact Now</span>
                </button>
                
                <button 
                  onClick={handleBannerClose}
                  className="text-white/80 hover:text-white p-1 rounded-full bg-black/20 hover:bg-black/30 transition-all"
                  aria-label="Close notification"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* New Interview Schedule Calendar Popup - Fixed Height */}
      <AnimatePresence>
        {showSchedulePopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-[#0d1224] border border-[#1f223c] rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between bg-gradient-to-r from-violet-600/90 to-pink-500/90 px-6 py-3">
                <h3 className="text-white font-bold text-lg">Interview Availability</h3>
                <button
                  onClick={toggleSchedulePopup}
                  className="text-white/80 hover:text-white p-1 rounded-full bg-black/20 hover:bg-black/30 transition-all"
                  aria-label="Close schedule"
                >
                  <MdClose size={20} />
                </button>
              </div>
              
              <div className="p-5 overflow-y-auto">
                {/* Compact calendar display */}
                <div className="grid grid-cols-7 mb-3 text-center text-xs font-medium text-gray-400">
                  <div>Su</div>
                  <div>Mo</div>
                  <div>Tu</div>
                  <div>We</div>
                  <div>Th</div>
                  <div>Fr</div>
                  <div>Sa</div>
                </div>
                
                {/* Smaller calendar grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {Array.from({ length: 31 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`
                        aspect-square flex items-center justify-center text-xs rounded-md
                        ${i % 7 === 0 || i % 7 === 6 
                          ? "bg-green-500/20 border border-green-500/30 text-green-400" 
                          : "bg-indigo-500/20 border border-indigo-500/30 text-indigo-400"}
                      `}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  {/* Weekday availability - more compact */}
                  <div>
                    <h4 className="text-white font-semibold flex items-center mb-2 text-sm">
                      <span className="h-2.5 w-2.5 bg-indigo-500 rounded-full mr-2"></span>
                      Weekday Availability (Monday-Friday)
                    </h4>
                    <div className="bg-[#161b38] rounded-lg p-3 border border-[#1f223c]">
                      <p className="text-gray-300 text-xs leading-relaxed">
                        Available <span className="text-indigo-400 font-medium">after 8:00 PM</span> on weekdays.
                        Preferred slots: <span className="text-indigo-400 font-medium">8:00 PM - 11:00 PM</span>.
                      </p>
                    </div>
                  </div>
                  
                  {/* Weekend availability - more compact */}
                  <div>
                    <h4 className="text-white font-semibold flex items-center mb-2 text-sm">
                      <span className="h-2.5 w-2.5 bg-green-500 rounded-full mr-2"></span>
                      Weekend Availability (Saturday-Sunday)
                    </h4>
                    <div className="bg-[#161b38] rounded-lg p-3 border border-[#1f223c]">
                      <p className="text-gray-300 text-xs leading-relaxed">
                        Available <span className="text-green-400 font-medium">anytime</span> between 
                        <span className="text-green-400 font-medium"> 9:00 AM - 8:00 PM</span> on weekends.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-[#1f223c] flex justify-between">
                  <div className="text-gray-300 text-xs">
                    <p>Need a different time?</p>
                    <p>Let&apos;s coordinate to find a suitable slot.</p>
                  </div>
                  
                  <Link
                    href="https://wa.me/919636504390?text=Hi%20Harsh,%20I'd%20like%20to%20schedule%20an%20interview%20at%20the%20following%20time:"
                    target="_blank"
                    className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                  >
                    <BsWhatsapp size={14} />
                    <span>Request Time Slot</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-12 gap-y-8">
        <div className="order-2 lg:order-1 flex flex-col items-start justify-center p-2 pb-20 md:pb-10 lg:pt-10">
          <h1 className="text-3xl font-bold leading-10 text-white md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem]">
            Hello, <br />
            This is {' '}
            <span className=" text-pink-500">{personalData.name}</span>
            {` , I&apos;m a Professional `}
            <span className=" text-[#16f2b3]">{personalData.designation}</span>
            .
          </h1>

          <div className="my-12 flex items-center gap-5">
            <Link
              href={personalData.github}
              target='_blank'
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <BsGithub size={30} />
            </Link>
            <Link
              href={personalData.linkedIn}
              target='_blank'
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <BsLinkedin size={30} />
            </Link>
            <Link
              href={personalData.facebook}
              target='_blank'
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <FaFacebook size={30} />
            </Link>
            <Link
              href={personalData.leetcode}
              target='_blank'
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <SiLeetcode size={30} />
            </Link>
            <Link
              href={personalData.twitter}
              target='_blank'
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <FaTwitterSquare size={30} />
            </Link>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link href="#contact" className="bg-gradient-to-r to-pink-500 from-violet-600 p-[1px] rounded-full transition-all duration-300 hover:from-pink-500 hover:to-violet-600">
              <button className="px-3 text-xs md:px-8 py-3 md:py-4 bg-[#0d1224] rounded-full border-none text-center md:text-sm font-medium uppercase tracking-wider text-[#ffff] no-underline transition-all duration-200 ease-out  md:font-semibold flex items-center gap-1 hover:gap-3">
                <span>Contact me</span>
                <RiContactsFill size={16} />
              </button>
            </Link>

            <Link className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold" role="button" target="_blank" href={personalData.resume}
            >
              <span>Get Resume</span>
              <MdDownload size={16} />
            </Link>
            
            {/* Changed to use the toast notification handler */}
            <button 
              onClick={handleBriefIntroduction}
              className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white transition-all duration-200 ease-out hover:text-white md:font-semibold"
            >
              <span>Brief Introduction</span>
              <BsPlayFill size={16} />
            </button>
          </div>
        </div>
        
        <div className="order-1 lg:order-2 from-[#0d1224] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37]">
          <div className="flex flex-row">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
            <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
          </div>
          <div className="px-4 lg:px-8 py-5">
            <div className="flex flex-row space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-400"></div>
              <div className="h-3 w-3 rounded-full bg-orange-400"></div>
              <div className="h-3 w-3 rounded-full bg-green-200"></div>
            </div>
          </div>
          <div className="overflow-hidden border-t-[2px] border-indigo-900 px-4 lg:px-8 py-4 lg:py-8">
            <code className="font-mono text-xs md:text-sm lg:text-base">
              <div className="blink">
                <span className="mr-2 text-pink-500">const</span>
                <span className="mr-2 text-white">coder</span>
                <span className="mr-2 text-pink-500">=</span>
                <span className="text-gray-400">{'{'}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">name:</span>
                <span className="text-gray-400">{`'`}</span>
                <span className="text-amber-300">Harsh Agrawal</span>
                <span className="text-gray-400">{`',`}</span>
              </div>
              <div className="ml-4 lg:ml-8 mr-2">
                <span className=" text-white">skills:</span>
                <span className="text-gray-400">{`['`}</span>
                <span className="text-amber-300">React</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">TailwindCSS</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">NextJS</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">Express</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">Angular*</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">MySql</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">MongoDB</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">Docker</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">AWS</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">Redis</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">C#</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">Dotnet</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">JQuery</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">AJAX</span>
                <span className="text-gray-400">{"'],"}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">hardWorker:</span>
                <span className="text-orange-400">true</span>
                <span className="text-gray-400">,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">quickLearner:</span>
                <span className="text-orange-400">true</span>
                <span className="text-gray-400">,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">problemSolver:</span>
                <span className="text-orange-400">true</span>
                <span className="text-gray-400">,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">Team Leadership:</span>
                <span className="text-orange-400">true</span>
                <span className="text-gray-400">,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-green-400">hireable:</span>
                <span className="text-orange-400">function</span>
                <span className="text-gray-400">{'() {'}</span>
              </div>
              <div>
                <span className="ml-8 lg:ml-16 mr-2 text-orange-400">return</span>
                <span className="text-gray-400">{`(`}</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                <span className="mr-2 text-white">hardWorker</span>
                <span className="text-amber-300">&amp;&amp;</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                <span className="mr-2 text-white">problemSolver</span>
                <span className="text-amber-300">&amp;&amp;</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                <span className="mr-2 text-white">Leadership</span>
                <span className="mr-2 text-amber-300">&gt;=</span>
                <span className="text-orange-400">5</span>
                <span className="text-amber-300"> &amp;&amp;</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                <span className="mr-2 text-white">skills.length</span>
                <span className="mr-2 text-amber-300">&gt;=</span>
                <span className="text-orange-400">5</span>
              </div>
              <div><span className="ml-8 lg:ml-16 mr-2 text-gray-400">{`);`}</span></div>
              <div><span className="ml-4 lg:ml-8 text-gray-400">{`};`}</span></div>
              <div><span className="text-gray-400">{`};`}</span></div>
            </code>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default HeroSection;