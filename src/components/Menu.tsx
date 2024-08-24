"use client"
import React, { useState } from 'react'
import { FaPlus, FaUser } from 'react-icons/fa';


const Menu = () => {
    const [ active, setActive ] = useState<boolean>(false);
    const meunuItems = [
        { name:"Dashboard", icon:<FaUser className='text-[14px] text-bgPrimary'/>, active:false },
        { name:"Dashboard", icon:<FaUser className='text-[14px] text-bgPrimary'/>, active:false },
        { name:"Dashboard", icon:<FaUser className='text-[14px] text-bgPrimary'/>, active:false },
        { name:"Dashboard", icon:<FaUser className='text-[14px] text-bgPrimary'/>, active:false },
        { name:"Dashboard", icon:<FaUser className='text-[14px] text-bgPrimary'/>, active:false },
        { name:"Dashboard", icon:<FaUser className='text-[14px] text-bgPrimary'/>, active:false },
    ]
    
  return (
    <>
        <div className={`${active && "glassMorphism !flex"} hidden transition-all duration-300 z-[49] justify-center items-center w-full h-full fixed bottom-0`}></div>
        
        <div className='grid grid-cols-3 grid-rows-3 place-items-center'>
            {
                meunuItems.map((item, i)=>(
                    <div className={`transition-transform duration-300 ease-in-out 
                        ${
                            active ? "transform translate-y-0 mb-[40vh]" : "transform translate-y-full"
                        } z-[52] fixed bottom-0 flex flex-col justify-center items-center`}
                    >
                        <button className='bg-bgSecondary text-slideUp rounded-full w-12 h-12 flex justify-center items-center'>{item.icon}</button>
                        <p className='text-white text-xs'>{item.name}</p>
                    </div>
                ))
            }
        </div>
        <button 
            className="z-[52] fixed bottom-12 right-12 shadow-md shadow-gray-400 bg-bgSecondary text-slideUp rounded-full w-12 h-12 flex justify-center items-center"
            onClick={()=>setActive(!active)}>
            <FaPlus className='text-[16px]'/>
        </button>
    </>
  )
}

export default Menu