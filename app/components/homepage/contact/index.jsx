"use client";
import { personalData } from '@/utils/data/personal-data';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import ContactForm from './contact-form';

function ContactSection() {
  return (
    <section id="contact" className="py-20 relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="w-[250px] h-[250px] bg-[#16f2b3]/10 rounded-full absolute -top-20 -right-20 filter blur-[80px]"></div>
        <div className="w-[350px] h-[350px] bg-[#5291ef]/10 rounded-full absolute -bottom-32 -left-20 filter blur-[100px]"></div>
      </div>
      
      {/* Section header */}
      <div className="container mx-auto px-4 mb-16">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16f2b3] to-[#5291ef]">Touch</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#16f2b3] to-[#5291ef] mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-300 text-lg">
            Have a question or want to work together? Let&apos;s connect!
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-[#0c0921]/80 to-[#1a1443]/80 backdrop-blur-md rounded-2xl border border-[#464c6a]/30 overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Contact form */}
            <motion.div 
              className="p-8 md:p-12"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ContactForm />
            </motion.div>
            
            {/* Contact information */}
            <motion.div 
              className="bg-gradient-to-br from-[#1a1443]/60 to-[#0c0921]/60 p-8 md:p-12 flex flex-col justify-between"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div>
                <h3 className="text-2xl font-bold mb-8 text-white">
                  Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16f2b3] to-[#5291ef]">Information</span>
                </h3>
                
                <div className="space-y-6 mb-12">
                  <motion.div 
                    className="flex items-start gap-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className="bg-gradient-to-r from-[#16f2b3]/20 to-[#5291ef]/20 p-3 rounded-xl">
                      <MdAlternateEmail className="text-[#16f2b3]" size={24} />
                    </div>
                    <div>
                      <p className="text-[#16f2b3] text-sm font-medium mb-1">Email</p>
                      <p className="text-white text-lg">{personalData.email}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start gap-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className="bg-gradient-to-r from-[#16f2b3]/20 to-[#5291ef]/20 p-3 rounded-xl">
                      <IoMdCall className="text-[#16f2b3]" size={24} />
                    </div>
                    <div>
                      <p className="text-[#16f2b3] text-sm font-medium mb-1">Phone</p>
                      <p className="text-white text-lg">{personalData.phone}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start gap-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className="bg-gradient-to-r from-[#16f2b3]/20 to-[#5291ef]/20 p-3 rounded-xl">
                      <CiLocationOn className="text-[#16f2b3]" size={24} />
                    </div>
                    <div>
                      <p className="text-[#16f2b3] text-sm font-medium mb-1">Location</p>
                      <p className="text-white text-lg">{personalData.address}</p>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              <div>
                <p className="text-white font-medium mb-4">Connect with me</p>
                <div className="flex gap-4">
                  {[
                    { icon: <IoLogoGithub size={20} />, url: personalData.github, label: "GitHub" },
                    { icon: <BiLogoLinkedin size={20} />, url: personalData.linkedIn, label: "LinkedIn" },
                    { icon: <FaXTwitter size={20} />, url: personalData.twitter, label: "Twitter" },
                    { icon: <FaFacebook size={20} />, url: personalData.facebook, label: "Facebook" },
                  ].map((social, index) => (
                    <motion.div key={index} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                      <Link 
                        href={social.url} 
                        target="_blank"
                        aria-label={social.label}
                        className="bg-[#0c0921] hover:bg-gradient-to-r hover:from-[#16f2b3] hover:to-[#5291ef] text-white h-10 w-10 rounded-full flex items-center justify-center border border-[#464c6a]/30 transition-all duration-300 group"
                      >
                        <span className="group-hover:text-black transition-colors duration-300">
                          {social.icon}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;