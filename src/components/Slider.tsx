"use client"
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import React from 'react'
import CompleteProfile from './CompleteProfile';
import { FaTimesCircle } from 'react-icons/fa';
import { showSlide } from '@/redux/slices/slider';
import EditArticle from './EditArticle';
import AddArticle from './AddArticle';


const Slider = () => {
  const { slideUp, type } = useAppSelector((state)=> state.slider);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className={`${slideUp && "glassMorphism !flex"} hidden transition-all duration-300 z-[49] justify-center items-center w-full h-full fixed bottom-0`}></div>
          
      <div className={`transition-transform duration-300 ease-in-out 
        ${
          slideUp ? "transform translate-y-0" : "transform translate-y-full"
        } 
        overflow-none overflow-auto scrollbar-thumb-[#0C5A33] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scroll-smooth scrollbar-none sm:scrollbar !z-[52] flex flex-col justify-start items-center w-full fixed h-[83vh] sm:h-[96vh] bottom-0 rounded-tr-[40px] 
        rounded-tl-[40px] bg-slideUp`}
      >
        <button className='absolute right-6 top-6' onClick={()=> dispatch(showSlide())}>
          <FaTimesCircle size={26} className='text-bgSecondary'/>
        </button>
        {
          type === "complete_profile" ? 
            <CompleteProfile/>
          : type === "edit_article" ?
            <EditArticle/>
          : type === "add_article" ? 
            <AddArticle/>
          : ""
        }
      </div>
    </>
  )
}

export default Slider