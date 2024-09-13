import { useAppSelector } from '@/redux/hooks';
import React, { useState } from 'react'

export interface IFormData {
    name:string;
    title:string;
    description:string
}

const EditArticle = () => {
    const [formData, setFormData] = useState<IFormData>({ name:"", title:"", description:"" });
    const { article } = useAppSelector(state => state.article);

    return (
        <>
            <form className='w-full sm:w-[55vw] pt-16 pb-5 px-4 flex flex-col justify-start items-center'>
                <h1 className='mb-5 font-[SatoshiMedium] text-3xl'>Edit Article</h1>
                
                <input className='mb-5 font-[SatoshiRegular] w-full text-sm bg-transparent border border-bgSecondary 
                    focus:outline-bgSecondary focus:border-bgSecondary rounded-lg py-3 px-5' type="text" placeholder="Title e.g Introduction to AI" 
                    value={article?.title} onChange={(e)=> setFormData({...formData, name:e.target.value})}/>

                <textarea className='h-[250px] my-5 font-[SatoshiRegular] w-full text-sm bg-transparent border border-bgSecondary 
                    focus:outline-bgSecondary focus:border-bgSecondary rounded-lg py-3 px-5' maxLength={123} placeholder="Description e.g AI is the future and everybody loves it..." 
                    value={article?.description} onChange={(e)=> setFormData({...formData, description:e.target.value})}/>

                <textarea className='h-[250px] my-5 font-[SatoshiRegular] w-full text-sm bg-transparent border border-bgSecondary 
                    focus:outline-bgSecondary focus:border-bgSecondary rounded-lg py-3 px-5' maxLength={123} placeholder="Content e.g AI has taken over humans, many have integrated AI in their daily life activity..." 
                    value={article?.content} onChange={(e)=> setFormData({...formData, description:e.target.value})}/>

                <button className="w-full font-[SatoshiMedium] flex gap-2 justify-center items-center text-base text-bgPrimary py-2 px-4 bg-bgSecondary rounded-[4px] hover:bg-emerald-400 transition-colors ease-in">
                    {/* <FaUser className="text-lg" /> */}
                    <p className="pl-2">Complete Profile</p>
                </button>
            </form>

        </>
    )
}

export default EditArticle