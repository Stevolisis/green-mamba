import { useAppDispatch } from '@/redux/hooks';
import { setUserId, setWalletAddress } from '@/redux/slices/auth';
import { showSlide } from '@/redux/slices/slider';
import { showToast } from '@/redux/slices/toast';
import { api } from '@/utils/axiosConfig';
import React, { useState } from 'react'

export interface IFormData {
    name:string;
    title:string;
    description:string
}

const CompleteProfile = () => {
    const dispatch= useAppDispatch();

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        try{
            const addr:string = "0x2345678902227655670";
            const formData= new FormData(form);
            formData.append("walletAddress", addr)
            const result = await api.post("/authors/createAuthor", formData);
            const data = result.data;
            dispatch(showToast({message:data.message, type:"success"}));
            dispatch(showSlide());
            dispatch(setUserId(data.data._id));
            dispatch(setWalletAddress(addr));
            form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea").forEach(input => {
                input.value = "";
            });
            console.log(data);

        }catch(err:any){
          console.log("Err: ", err);
          dispatch(showToast({message:err.response.data.message, type:"error"}));
        }
    }

    return (
        <>
            <form onSubmit={(e)=>handleSubmit(e)} className='w-full sm:w-[55vw] pt-16 pb-5 px-4 flex flex-col justify-start items-center'>
                <h1 className='mb-5 font-[SatoshiMedium] text-3xl'>Complete Profile</h1>
                <input name="name" className='mb-5 font-[SatoshiRegular] w-full text-sm bg-transparent border border-bgSecondary 
                    focus:outline-bgSecondary focus:border-bgSecondary rounded-lg py-3 px-5' type="text" placeholder="Name e.g John Doe" 
                />

                <input name="title" className='mb-5 font-[SatoshiRegular] w-full text-sm bg-transparent border border-bgSecondary 
                    focus:outline-bgSecondary focus:border-bgSecondary rounded-lg py-3 px-5' type="text" placeholder="Title e.g Software Engineer" 
                />

                <textarea name="description" className='h-[250px] my-5 font-[SatoshiRegular] w-full text-sm bg-transparent border border-bgSecondary 
                    focus:outline-bgSecondary focus:border-bgSecondary rounded-lg py-3 px-5' maxLength={123} placeholder="Description e.g I am a software Engineer with over 6 years experience..." 
                />

                <button className="w-full font-[SatoshiMedium] flex gap-2 justify-center items-center text-base text-bgPrimary py-2 px-4 bg-bgSecondary rounded-[4px] hover:bg-emerald-400 transition-colors ease-in">
                    {
                        isLoading ? 
                            <Loader size={24} color='#01140d' /> :
                            <p className="pl-2">Complete Profile</p>
                    }
                </button>
            </form>

        </>
    )
}

export default CompleteProfile