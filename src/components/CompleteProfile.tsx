"use client"
import { useAppSelector } from '@/redux/hooks'
import React from 'react'
import { FaUser, FaWallet } from 'react-icons/fa'

type Props = {}

const CompleteProfile = (props: Props) => {
  const slideUp: boolean = useAppSelector((state)=> state.profile.slideUp);

  return (
      <div className={`${slideUp && "glassMorphism"} z-[49] flex justify-center items-center w-full h-full fixed bottom-0`}>

          <div className={`transition-transform duration-300 ease-in-out ${
            slideUp ? "transform translate-y-0" : "transform translate-y-full"
            } flex flex-col justify-center items-center w-full fixed h-[75vh] bottom-0 rounded-tr-[28px] 
            rounded-tl-[28px] bg-slideUp`}
          >
            <h2 className='font-[SatoshiMedium] my-3 text-xl'>CompleteProfile</h2>
            <button className="font-[SatoshiMedium] flex gap-2 items-center text-sm text-bgPrimary py-2 px-4 bg-bgSecondary rounded-[4px] hover:bg-emerald-400 transition-colors ease-in">
              <FaUser className="text-lg" />
              <p className="border-l border-l-bgPrimary pl-2">Complete Profile</p>
            </button>
          </div>
    </div>
  )
}

export default CompleteProfile