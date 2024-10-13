import React from 'react'
import { achivement } from '@/utils/data/achivement';
import Image from "next/image";
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";
import experience from '/public/lottie/code.json'
import { BsFillAwardFill } from "react-icons/bs";
import { TbCertificate } from "react-icons/tb";



function Achivement() {
  return (
    <div id="achivement" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Achivement
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex justify-center items-start">
            <div className="w-full h-full">
              <AnimationLottie animationPath={experience} />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-6">
              {
                achivement.map(achivement => (
                  <GlowCard key={achivement.id} identifier={`achivement-${achivement.id}`}>
                    <div className="p-3 relative">
                      <Image
                        src="/blur-23.svg"
                        alt="Hero"
                        width={1080}
                        height={200}
                        className="absolute bottom-0 opacity-80"
                      />
                      <div className="flex items-center gap-x-8 px-3 py-5">
                        <div className="text-violet-500  transition-all duration-300 hover:scale-125">
                          <BsFillAwardFill size={36} />
                        </div>
                        <div>
                          <p className="text-base sm:text-xl mb-2 font-medium uppercase">
                            {achivement.title}
                          </p>
                          <p className="text-sm sm:text-base">
                            {achivement.award}
                          </p>
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                ))
              }

              <GlowCard>
                <div className='flex items-center justify-evenly gap-4 p-3'>
                  <a href="" target="_blank" rel="noopener noreferrer">
                    <div className='flex items-center gap-2 md:p-6 transition-all duration-300 hover:scale-125 '>
                      <TbCertificate size={30} className='text-violet-500 ' />
                      <p className='cursor-pointer'>Certificate</p>
                    </div>
                  </a>

                  <a href="" target="_blank" rel="noopener noreferrer">
                    <div className='flex items-center gap-2 md:p-6 transition-all duration-300 hover:scale-125 '>
                      <BsFillAwardFill size={30} className='text-violet-500 ' />
                      <p className='cursor-pointer'>Achivement</p>
                    </div>
                  </a>
                </div>
              </GlowCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Achivement
