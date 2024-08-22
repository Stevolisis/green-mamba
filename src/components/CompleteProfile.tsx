"use client"
import { useAppSelector } from '@/redux/hooks'
import React from 'react'

type Props = {}

const CompleteProfile = (props: Props) => {
  const slideUp: boolean = useAppSelector((state)=> state.profile.slideUp);

  return (
      <div className={`${slideUp && "glassMorphism"} !z-510 flex justify-center items-center w-full h-full fixed bottom-0`}>
        {
          slideUp && 
          <div className="flex justify-center items-center w-full fixed h-[70vh] bottom-0 rounded-tr-3xl rounded-tl-3xl bg-slideUp">
            <h2 className='font-[SatoshiMedium] text-xl'>CompleteProfile</h2>
          </div>
        }
    </div>
  )
}

export default CompleteProfile