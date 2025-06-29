// @flow strict
"use client";
import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsGithub, BsLinkedin, BsWhatsapp } from "react-icons/bs"; 
import { FaFacebook, FaTwitterSquare } from "react-icons/fa";
import { MdDownload, MdClose, MdContentCopy } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { SiLeetcode, SiGooglemeet } from "react-icons/si";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { BsPlayFill } from "react-icons/bs";
import { BiInfoCircle } from "react-icons/bi"; // Added for toast info icon
import Counter from "../../Counter";
import { motion, AnimatePresence } from "framer-motion";

function HeroSection() {
  const [showJobBanner, setShowJobBanner] = useState(true);
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showSchedulePopup, setShowSchedulePopup] = useState(false);
  const [showMeetConfirm, setShowMeetConfirm] = useState(false);
  const [showMeetDateTime, setShowMeetDateTime] = useState(false);
  const [meetDate, setMeetDate] = useState("");
  const [meetTime, setMeetTime] = useState("");
  const [meetLink, setMeetLink] = useState("");
  const [showMeetLink, setShowMeetLink] = useState(false);
  const [copied, setCopied] = useState(false);

  // New state for confirmation and company info
  const [showMeetFinalConfirm, setShowMeetFinalConfirm] = useState(false);
  const [meetCompanyName, setMeetCompanyName] = useState("");
  const [meetEmployeeEmail, setMeetEmployeeEmail] = useState("");
  const [meetCompanySuggestions, setMeetCompanySuggestions] = useState([]);
  const [isLoadingMeetSuggestions, setIsLoadingMeetSuggestions] = useState(false);

  // New state variables for scheduling process
  const [selectedDate, setSelectedDate] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showTimePopup, setShowTimePopup] = useState(false);
  const [showCompanyPopup, setShowCompanyPopup] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Add these two lines for interview schedule company autocomplete
  const [companySuggestions, setCompanySuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

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

  // Format date for display
  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  // Handle date selection with past date prevention
  const handleDateSelect = (day) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for comparison
    
    // Only proceed if selected date is today or in the future
    if (selectedDate >= today) {
      setSelectedDate(selectedDate);
      setShowConfirmPopup(true);
    }
    // No need to do anything for past dates - they just won't respond
  };

  // Handle confirmation
  const handleConfirmInterview = () => {
    setShowConfirmPopup(false);
    setShowTimePopup(true);
  };

  // Handle time selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setShowTimePopup(false);
    setShowCompanyPopup(true);
  };

  // Handle company submission (Schedule Interview flow)
  const handleCompanySubmit = () => {
    // Format date and time for WhatsApp message
    const formattedDate = formatDate(selectedDate);
    // Interview schedule message (simple)
    const message = `Hi Harsh, I'd like to schedule an interview on ${formattedDate} at ${selectedTime} from ${companyName}.`;
    // Create WhatsApp URL with encoded message
    const whatsappUrl = `https://wa.me/919636504390?text=${encodeURIComponent(message)}`;
    // Reset all states
    setShowCompanyPopup(false);
    setShowSchedulePopup(false);
    setSelectedDate(null);
    setSelectedTime(null);
    setCompanyName("");
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  };

  // Generate calendar days
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };
  
  const calendarDays = generateCalendarDays();
  
  // Get month name
  const getMonthName = (month) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month];
  };
  
  // Handle month navigation
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Check if a date is in the past
  const isDateInPast = (year, month, day) => {
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for comparison
    return date < today;
  };

  // Fetch company suggestions from Clearbit API
  const fetchCompanySuggestions = async (query) => {
    if (!query || query.length < 2) {
      setCompanySuggestions([]);
      return;
    }
    
    setIsLoadingSuggestions(true);
    try {
      const response = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        // Filter to likely IT/tech companies
        const techCompanies = data.filter(company => 
          company.name.toLowerCase().includes(query.toLowerCase()) || 
          (company.domain && (
            company.domain.includes('tech') || 
            company.domain.includes('software') || 
            company.domain.includes('digital') || 
            company.domain.includes('app') || 
            company.domain.includes('cloud') ||
            company.domain.includes('ai') ||
            company.domain.includes('data')
          ))
        );
        setCompanySuggestions(techCompanies);
      }
    } catch (error) {
      console.error("Error fetching company suggestions:", error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  // Fetch company suggestions for Google Meet modal
  const fetchMeetCompanySuggestions = async (query) => {
    if (!query || query.length < 2) {
      setMeetCompanySuggestions([]);
      return;
    }
    setIsLoadingMeetSuggestions(true);
    try {
      const response = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        const techCompanies = data.filter(company =>
          company.name.toLowerCase().includes(query.toLowerCase()) ||
          (company.domain && (
            company.domain.includes('tech') ||
            company.domain.includes('software') ||
            company.domain.includes('digital') ||
            company.domain.includes('app') ||
            company.domain.includes('cloud') ||
            company.domain.includes('ai') ||
            company.domain.includes('data')
          ))
        );
        setMeetCompanySuggestions(techCompanies);
      }
    } catch (error) {
      // ignore
    } finally {
      setIsLoadingMeetSuggestions(false);
    }
  };

  // Helper to generate Google Meet code
  const generateMeetCode = () => {
    // Google Meet codes are 3 groups of 4 letters (a-z)
    const group = () => Array(4).fill(0).map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
    return `https://meet.google.com/${group()}-${group()}-${group()}`;
  };

  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(meetLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // WhatsApp send for Google Meet (already correct, keep as is)
  const handleSendMeetLink = () => {
    // Compose message
    const msg = `Hi Harsh Agrawal, I would like to schedule a Google Meet interview.\n\nCompany: ${meetCompanyName}\nWork Email: ${meetEmployeeEmail}\nDate: ${meetDate}\nTime: ${meetTime}\nMeet Link: ${meetLink}`;
    const whatsappUrl = `https://wa.me/919636504390?text=${encodeURIComponent(msg)}`;
    // Reset all meet-related states
    setShowMeetFinalConfirm(false);
    setShowMeetLink(false);
    setMeetDate("");
    setMeetTime("");
    setMeetLink("");
    setMeetCompanyName("");
    setMeetEmployeeEmail("");
    setMeetCompanySuggestions([]);
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
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
                {/* Month navigation */}
                <div className="flex items-center justify-between mb-4">
                  <button 
                    onClick={prevMonth}
                    className="p-1 rounded-full hover:bg-violet-500/20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <h4 className="text-white font-medium">
                    {getMonthName(currentMonth)} {currentYear}
                  </h4>
                  <button 
                    onClick={nextMonth}
                    className="p-1 rounded-full hover:bg-violet-500/20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                {/* Day headers */}
                <div className="grid grid-cols-7 mb-2 text-center text-xs font-medium text-gray-400">
                  <div>Su</div>
                  <div>Mo</div>
                  <div>Tu</div>
                  <div>We</div>
                  <div>Th</div>
                  <div>Fr</div>
                  <div>Sa</div>
                </div>
                
                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {calendarDays.map((day, i) => {
                    // Check if the date is in the past
                    const isPastDate = day !== null && isDateInPast(currentYear, currentMonth, day);
                    
                    return (
                      <div 
                        key={i} 
                        className={`
                          aspect-square flex items-center justify-center text-sm rounded-md
                          ${day === null ? "bg-transparent" : 
                            isPastDate ? 
                              "bg-gray-500/20 border border-gray-500/30 text-gray-500 cursor-not-allowed" :
                              i % 7 === 0 || i % 7 === 6 
                                ? "bg-green-500/20 border border-green-500/30 text-green-400 cursor-pointer hover:bg-green-500/30" 
                                : "bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 cursor-pointer hover:bg-indigo-500/30"
                          }
                        `}
                        onClick={() => day !== null && !isPastDate && handleDateSelect(day)}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
                
                <div className="space-y-4">
                  {/* Weekday availability */}
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
                  
                  {/* Weekend availability */}
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
                
                <div className="mt-4 pt-4 border-t border-[#1f223c]">
                  <p className="text-gray-300 text-xs">
                    Click on a date to schedule an interview.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Confirmation Popup */}
      <AnimatePresence>
        {showConfirmPopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0d1224] border border-[#1f223c] rounded-xl shadow-2xl p-6 max-w-md w-full relative"
            >
              {/* Add close button */}
              <button 
                onClick={() => setShowConfirmPopup(false)}
                className="absolute right-4 top-4 bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full text-white z-10"
                aria-label="Close confirmation"
              >
                <MdClose size={16} />
              </button>
              
              <h3 className="text-white font-bold text-xl mb-4">Confirm Interview Date</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to schedule an interview on <span className="text-pink-400 font-medium">{formatDate(selectedDate)}</span>?
              </p>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowConfirmPopup(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmInterview}
                  className="px-4 py-2 bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 text-white rounded-lg text-sm"
                >
                  Yes, Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Time Selection Popup */}
      <AnimatePresence>
        {showTimePopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0d1224] border border-[#1f223c] rounded-xl shadow-2xl p-6 max-w-md w-full relative"
            >
              {/* Add close button */}
              <button 
                onClick={() => {
                  setShowTimePopup(false);
                  setShowConfirmPopup(false);
                }}
                className="absolute right-4 top-4 bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full text-white z-10"
                aria-label="Close time selection"
              >
                <MdClose size={16} />
              </button>
              
              <h3 className="text-white font-bold text-xl mb-4">Select Interview Time</h3>
              <p className="text-gray-300 mb-4">
                Please select a preferred time for your interview on <span className="text-pink-400 font-medium">{formatDate(selectedDate)}</span>:
              </p>
              
              <div className="grid grid-cols-2 gap-2 mb-6">
                {selectedDate && selectedDate.getDay() % 6 === 0 ? (
                  // Weekend times
                  <>
                    <button onClick={() => handleTimeSelect("9:00 AM")} className="p-2 bg-[#161b38] hover:bg-green-500/20 border border-[#1f223c] hover:border-green-500/30 rounded-lg text-green-400 text-sm">9:00 AM</button>
                    <button onClick={() => handleTimeSelect("10:00 AM")} className="p-2 bg-[#161b38] hover:bg-green-500/20 border border-[#1f223c] hover:border-green-500/30 rounded-lg text-green-400 text-sm">10:00 AM</button>
                    <button onClick={() => handleTimeSelect("11:00 AM")} className="p-2 bg-[#161b38] hover:bg-green-500/20 border border-[#1f223c] hover:border-green-500/30 rounded-lg text-green-400 text-sm">11:00 AM</button>
                    <button onClick={() => handleTimeSelect("12:00 PM")} className="p-2 bg-[#161b38] hover:bg-green-500/20 border border-[#1f223c] hover:border-green-500/30 rounded-lg text-green-400 text-sm">12:00 PM</button>
                    <button onClick={() => handleTimeSelect("1:00 PM")} className="p-2 bg-[#161b38] hover:bg-green-500/20 border border-[#1f223c] hover:border-green-500/30 rounded-lg text-green-400 text-sm">1:00 PM</button>
                    <button onClick={() => handleTimeSelect("2:00 PM")} className="p-2 bg-[#161b38] hover:bg-green-500/20 border border-[#1f223c] hover:border-green-500/30 rounded-lg text-green-400 text-sm">2:00 PM</button>
                    <button onClick={() => handleTimeSelect("3:00 PM")} className="p-2 bg-[#161b38] hover:bg-green-500/20 border border-[#1f223c] hover:border-green-500/30 rounded-lg text-green-400 text-sm">3:00 PM</button>
                    <button onClick={() => handleTimeSelect("4:00 PM")} className="p-2 bg-[#161b38] hover:bg-green-500/20 border border-[#1f223c] hover:border-green-500/30 rounded-lg text-green-400 text-sm">4:00 PM</button>
                  </>
                ) : (
                  // Weekday times
                  <>
                    <button onClick={() => handleTimeSelect("8:00 PM")} className="p-2 bg-[#161b38] hover:bg-indigo-500/20 border border-[#1f223c] hover:border-indigo-500/30 rounded-lg text-indigo-400 text-sm">8:00 PM</button>
                    <button onClick={() => handleTimeSelect("8:30 PM")} className="p-2 bg-[#161b38] hover:bg-indigo-500/20 border border-[#1f223c] hover:border-indigo-500/30 rounded-lg text-indigo-400 text-sm">8:30 PM</button>
                    <button onClick={() => handleTimeSelect("9:00 PM")} className="p-2 bg-[#161b38] hover:bg-indigo-500/20 border border-[#1f223c] hover:border-indigo-500/30 rounded-lg text-indigo-400 text-sm">9:00 PM</button>
                    <button onClick={() => handleTimeSelect("9:30 PM")} className="p-2 bg-[#161b38] hover:bg-indigo-500/20 border border-[#1f223c] hover:border-indigo-500/30 rounded-lg text-indigo-400 text-sm">9:30 PM</button>
                    <button onClick={() => handleTimeSelect("10:00 PM")} className="p-2 bg-[#161b38] hover:bg-indigo-500/20 border border-[#1f223c] hover:border-indigo-500/30 rounded-lg text-indigo-400 text-sm">10:00 PM</button>
                    <button onClick={() => handleTimeSelect("10:30 PM")} className="p-2 bg-[#161b38] hover:bg-indigo-500/20 border border-[#1f223c] hover:border-indigo-500/30 rounded-lg text-indigo-400 text-sm">10:30 PM</button>
                  </>
                )}
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setShowTimePopup(false);
                    setShowConfirmPopup(false);
                  }}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Company Name Popup */}
      <AnimatePresence>
        {showCompanyPopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0d1224] border border-[#1f223c] rounded-xl shadow-2xl p-6 max-w-md w-full relative"
            >
              {/* Add close button */}
              <button 
                onClick={() => {
                  setShowCompanyPopup(false);
                  setShowTimePopup(false);
                  setShowConfirmPopup(false);
                }}
                className="absolute right-4 top-4 bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full text-white z-10"
                aria-label="Close company popup"
              >
                <MdClose size={16} />
              </button>
              
              <h3 className="text-white font-bold text-xl mb-4">Company Information</h3>
              <p className="text-gray-300 mb-4">
                Please enter your company name for the interview on <span className="text-pink-400 font-medium">{formatDate(selectedDate)}</span> at <span className="text-pink-400 font-medium">{selectedTime}</span>:
              </p>
              
              {/* Company input with autocomplete */}
              <div className="relative w-full mb-6">
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                    fetchCompanySuggestions(e.target.value);
                  }}
                  placeholder="Enter company name"
                  className="w-full p-3 bg-[#161b38] border border-[#1f223c] focus:border-violet-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
                
                {/* Loading indicator */}
                {isLoadingSuggestions && (
                  <div className="absolute right-3 top-3">
                    <div className="w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                
                {/* Company suggestions dropdown */}
                {companySuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-[#0d1224] border border-[#1f223c] rounded-lg shadow-xl max-h-60 overflow-y-auto">
                    {companySuggestions.map((company, idx) => (
                      <div 
                        key={idx}
                        className="p-3 hover:bg-[#161b38] cursor-pointer flex items-center gap-3 border-b border-[#1f223c] last:border-0"
                        onClick={() => {
                          setCompanyName(company.name);
                          setCompanySuggestions([]);
                        }}
                      >
                        {company.logo && (
                          <img src={company.logo} alt={company.name} className="w-6 h-6 rounded" />
                        )}
                        <div>
                          <div className="text-white font-medium">{company.name}</div>
                          {company.domain && (
                            <div className="text-gray-400 text-xs">{company.domain}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowCompanyPopup(false);
                    setTimePopup(false);
                    setShowConfirmPopup(false);
                  }}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCompanySubmit}
                  disabled={!companyName.trim()}
                  className={`px-4 py-2 ${companyName.trim() ? 'bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600' : 'bg-gray-600 cursor-not-allowed'} text-white rounded-lg text-sm`}
                >
                  Send Interview Request
                </button>
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
            {/* Google Meet Icon */}
            <button
              type="button"
              className="transition-all text-green-500 hover:scale-125 duration-300"
              onClick={() => setShowMeetConfirm(true)}
              title="Schedule Google Meet"
            >
              <SiGooglemeet size={30} />
            </button>
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
      
      {/* Google Meet Confirmation Modal */}
      <AnimatePresence>
        {showMeetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0d1224] border border-[#1f223c] rounded-xl shadow-2xl p-6 max-w-md w-full relative"
            >
              <button
                onClick={() => setShowMeetConfirm(false)}
                className="absolute right-4 top-4 bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full text-white z-10"
                aria-label="Close confirmation"
              >
                <MdClose size={16} />
              </button>
              <h3 className="text-white font-bold text-xl mb-4">Schedule Google Meet</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to schedule a meeting with <span className="text-pink-400 font-medium">Harsh</span>?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowMeetConfirm(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowMeetConfirm(false);
                    setShowMeetDateTime(true);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-blue-500 hover:from-green-700 hover:to-blue-600 text-white rounded-lg text-sm"
                >
                  Yes, Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Google Meet Date/Time Modal */}
      <AnimatePresence>
        {showMeetDateTime && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0d1224] border border-[#1f223c] rounded-xl shadow-2xl p-6 max-w-md w-full relative"
            >
              <button
                onClick={() => setShowMeetDateTime(false)}
                className="absolute right-4 top-4 bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full text-white z-10"
                aria-label="Close date/time"
              >
                <MdClose size={16} />
              </button>
              <h3 className="text-white font-bold text-xl mb-4">Select Date & Time</h3>
              <div className="mb-4">
                <label className="block text-gray-300 mb-1">Date</label>
                <input
                  type="date"
                  className="w-full p-2 rounded bg-[#161b38] border border-[#1f223c] text-white"
                  value={meetDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={e => setMeetDate(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 mb-1">Time</label>
                <input
                  type="time"
                  className="w-full p-2 rounded bg-[#161b38] border border-[#1f223c] text-white"
                  value={meetTime}
                  onChange={e => setMeetTime(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowMeetDateTime(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm"
                >
                  Cancel
                </button>
                <button
                  disabled={!meetDate || !meetTime}
                  onClick={() => {
                    setMeetLink(generateMeetCode());
                    setShowMeetDateTime(false);
                    setShowMeetLink(true);
                  }}
                  className={`px-4 py-2 ${meetDate && meetTime ? 'bg-gradient-to-r from-green-600 to-blue-500 hover:from-green-700 hover:to-blue-600' : 'bg-gray-600 cursor-not-allowed'} text-white rounded-lg text-sm`}
                >
                  Generate Meet Link
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Google Meet Link Modal */}
      <AnimatePresence>
        {showMeetLink && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0d1224] border border-[#1f223c] rounded-xl shadow-2xl p-6 max-w-md w-full relative"
            >
              <button
                onClick={() => {
                  setShowMeetLink(false);
                  setMeetDate("");
                  setMeetTime("");
                  setMeetLink("");
                  setMeetCompanyName("");
                  setMeetEmployeeEmail("");
                  setMeetCompanySuggestions([]);
                }}
                className="absolute right-4 top-4 bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full text-white z-10"
                aria-label="Close meet link"
              >
                <MdClose size={16} />
              </button>
              <h3 className="text-white font-bold text-xl mb-4">Google Meet Link</h3>
              <p className="text-gray-300 mb-2">
                Meeting scheduled on <span className="text-pink-400 font-medium">{meetDate}</span> at <span className="text-pink-400 font-medium">{meetTime}</span>
              </p>
              <div className="flex items-center bg-[#161b38] border border-[#1f223c] rounded-lg p-3 mb-4">
                <a
                  href={meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 underline break-all flex-1"
                >
                  {meetLink}
                </a>
                <button
                  onClick={handleCopy}
                  className="ml-2 text-white hover:text-green-400"
                  title="Copy link"
                >
                  <MdContentCopy size={22} />
                </button>
              </div>
              {copied && <div className="text-green-400 text-sm mb-2">Copied!</div>}
              {/* Company Name Input */}
              <div className="mb-4 relative">
                <label className="block text-gray-300 mb-1">Company Name <span className="text-pink-400">*</span></label>
                <input
                  type="text"
                  value={meetCompanyName}
                  onChange={e => {
                    setMeetCompanyName(e.target.value);
                    fetchMeetCompanySuggestions(e.target.value);
                  }}
                  placeholder="Enter company name"
                  className="w-full p-2 rounded bg-[#161b38] border border-[#1f223c] text-white"
                  autoComplete="off"
                />
                {isLoadingMeetSuggestions && (
                  <div className="absolute right-3 top-3">
                    <div className="w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                {meetCompanySuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-[#0d1224] border border-[#1f223c] rounded-lg shadow-xl max-h-60 overflow-y-auto">
                    {meetCompanySuggestions.map((company, idx) => (
                      <div
                        key={idx}
                        className="p-2 hover:bg-[#161b38] cursor-pointer flex items-center gap-2 border-b border-[#1f223c] last:border-0"
                        onClick={() => {
                          setMeetCompanyName(company.name);
                          setMeetCompanySuggestions([]);
                        }}
                      >
                        {company.logo && (
                          <img src={company.logo} alt={company.name} className="w-5 h-5 rounded" />
                        )}
                        <div>
                          <div className="text-white text-sm">{company.name}</div>
                          {company.domain && (
                            <div className="text-gray-400 text-xs">{company.domain}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Employee Work Email Input */}
              <div className="mb-4">
                <label className="block text-gray-300 mb-1">Your Work Email <span className="text-pink-400">*</span></label>
                <input
                  type="email"
                  value={meetEmployeeEmail}
                  onChange={e => setMeetEmployeeEmail(e.target.value)}
                  placeholder="your.name@company.com"
                  className="w-full p-2 rounded bg-[#161b38] border border-[#1f223c] text-white"
                  autoComplete="off"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowMeetLink(false);
                    setMeetDate("");
                    setMeetTime("");
                    setMeetLink("");
                    setMeetCompanyName("");
                    setMeetEmployeeEmail("");
                    setMeetCompanySuggestions([]);
                  }}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm"
                >
                  Cancel
                </button>
                <button
                  disabled={
                    !meetCompanyName.trim() ||
                    !meetEmployeeEmail.trim() ||
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(meetEmployeeEmail)
                  }
                  onClick={() => setShowMeetFinalConfirm(true)}
                  className={`px-4 py-2 ${
                    meetCompanyName.trim() && meetEmployeeEmail.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(meetEmployeeEmail)
                      ? 'bg-gradient-to-r from-green-600 to-blue-500 hover:from-green-700 hover:to-blue-600'
                      : 'bg-gray-600 cursor-not-allowed'
                  } text-white rounded-lg text-sm`}
                >
                  Share Meet Link
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Google Meet Final Confirmation Modal */}
      <AnimatePresence>
        {showMeetFinalConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0d1224] border border-[#1f223c] rounded-xl shadow-2xl p-6 max-w-md w-full relative"
            >
              <button
                onClick={() => setShowMeetFinalConfirm(false)}
                className="absolute right-4 top-4 bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full text-white z-10"
                aria-label="Close confirmation"
              >
                <MdClose size={16} />
              </button>
              <h3 className="text-white font-bold text-xl mb-4">Confirm Share Meet Link</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to share this Google Meet link with <span className="text-pink-400 font-medium">Harsh Agrawal</span> on WhatsApp?
              </p>
              <div className="mb-4 text-sm text-gray-200">
                <div><span className="font-semibold text-white">Company:</span> {meetCompanyName}</div>
                <div><span className="font-semibold text-white">Work Email:</span> {meetEmployeeEmail}</div>
                <div><span className="font-semibold text-white">Date:</span> {meetDate}</div>
                <div><span className="font-semibold text-white">Time:</span> {meetTime}</div>
                <div><span className="font-semibold text-white">Meet Link:</span> <a href={meetLink} className="text-green-400 underline break-all" target="_blank" rel="noopener noreferrer">{meetLink}</a></div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowMeetFinalConfirm(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMeetLink}
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-blue-500 hover:from-green-700 hover:to-blue-600 text-white rounded-lg text-sm"
                >
                  Yes, Send on WhatsApp
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;