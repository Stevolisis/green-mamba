import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'

export interface IFormData {
    name:string;
    title:string;
    description:string
}

const CompleteProfile = () => {
    const [formData, setFormData] = useState<IFormData>({ name:"", title:"", description:"" });
  
    return (
        <>
            <form className='w-full sm:w-[55vw] pt-20 pb-5 px-4 flex flex-col justify-start items-center'>
                <input className='mb-5 font-[SatoshiRegular] w-full text-sm bg-transparent border border-bgSecondary 
                    focus:outline-bgSecondary focus:border-bgSecondary rounded-lg py-3 px-5' type="text" placeholder="Name e.g John Doe" 
                    value={formData.name} onChange={(e)=> setFormData({...formData, name:e.target.value})}/>

                <input className='mb-5 font-[SatoshiRegular] w-full text-sm bg-transparent border border-bgSecondary 
                    focus:outline-bgSecondary focus:border-bgSecondary rounded-lg py-3 px-5' type="text" placeholder="Title e.g Software Engineer" 
                    value={formData.title} onChange={(e)=> setFormData({...formData, title:e.target.value})}/>

                <textarea className='h-[250px] my-5 font-[SatoshiRegular] w-full text-sm bg-transparent border border-bgSecondary 
                    focus:outline-bgSecondary focus:border-bgSecondary rounded-lg py-3 px-5' maxLength={123} placeholder="Description e.g I am a software Engineer with over 6 years experience..." 
                    value={formData.description} onChange={(e)=> setFormData({...formData, description:e.target.value})}/>

                <button className="font-[SatoshiMedium] flex gap-2 justify-center items-center text-sm text-bgPrimary py-2 px-4 bg-bgSecondary rounded-[4px] hover:bg-emerald-400 transition-colors ease-in">
                    <FaUser className="text-lg" />
                    <p className="border-l border-l-bgPrimary pl-2">Complete Profile</p>
                </button>
            </form>

        </>
    )
}

export default CompleteProfile