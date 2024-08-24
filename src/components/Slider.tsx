"use client"
import { useAppSelector } from '@/redux/hooks'
import React from 'react'
import CompleteProfile from './CompleteProfile';


const Slider = () => {
  const { slideUp, type } = useAppSelector((state)=> state.profile);

  return (
    <>
      <div className={`${slideUp && "glassMorphism !flex"} hidden transition-all duration-300 z-[49] justify-center items-center w-full h-full fixed bottom-0`}></div>
          
      <div className={`transition-transform duration-300 ease-in-out 
      ${
        slideUp ? "transform translate-y-0" : "transform translate-y-full"
      } 
      overflow-auto overscroll-none scrollbar-none sm:scrollbar-thin scroll !z-[49] flex flex-col justify-start items-center w-full fixed h-[75vh] bottom-0 rounded-tr-[28px] 
      rounded-tl-[28px] bg-slideUp`}
      >
        {
          type === "complete_profile" ? 
            <CompleteProfile/>
          : ""
        }
      </div>
    </>
  )
}

export default Slider