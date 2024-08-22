import Link from 'next/link'
import React from 'react'

type Props = {}

const CompleteProfile = (props: Props) => {
  return (
    <div className='glassMorphism z-510 flex justify-center items-center w-full h-full fixed bottom-0'>
        <Link href='/'  className="flex justify-center items-center w-full fixed h-[70vh] bottom-0 rounded-tr-3xl rounded-tl-3xl bg-grBlue">
            <h2 className='font-[SatoshiMedium] text-xl'>CompleteProfile</h2>
        </Link>
    </div>
  )
}

export default CompleteProfile