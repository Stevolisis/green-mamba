"use client"
import Loader from '@/components/Loader'
import React from 'react'

type Props = {}

const loading = (props: Props) => {
  return (
    <div style={{zIndex:60}} className=' w-full h-[85vh] glassMorphism flex justify-center items-center fixed'>
        <Loader size={70} color='#00ff95' />
    </div>
  )
}

export default loading;