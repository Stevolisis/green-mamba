import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setUserId, setWalletAddress } from '@/redux/slices/auth';
import { showSlide } from '@/redux/slices/slider';
import { showToast } from '@/redux/slices/toast';
import { api } from '@/utils/axiosConfig';
import React, { useState, useEffect } from 'react'
import Loader from './Loader';
import web3modal from "web3modal";
import { ethers } from "ethers";

export interface IFormData {
    name:string;
    title:string;
    description:string
}

const CompleteProfile = () => {
    const dispatch= useAppDispatch();
    const { walletAddress, userId } = useAppSelector((state)=>state.auth);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        if(walletAddress){
            const form = e.target as HTMLFormElement;
            setIsLoading(true);
            try{
                const formData= new FormData(form);
                formData.append("walletAddress", walletAddress)
                const result = await api.post("/authors/createAuthor", formData);
                const data = result.data;
                dispatch(showToast({message:data.message, type:"success"}));
                dispatch(showSlide());
                dispatch(setUserId(data.data._id));
                form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea").forEach(input => {
                    input.value = "";
                });
                console.log(data);
                setIsLoading(false);
            }catch(err:any){
                console.log("Err: ", err);
                setIsLoading(false);
                dispatch(showToast({message:err.response.data.message, type:"error"}));
            }
        }else{
            dispatch(showToast({message:"Pls Connect Wallet!", type:"info"}));
        }
    }

    async function connectWallet(){        
        const Web3Loader = new web3modal();
        const connection = await Web3Loader.connect();
        const provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();
        dispatch(setWalletAddress(signer.address));
        console.log("eeeeeeeeeeeeeeeee: ", signer);
    }

    useEffect(()=>{
        
    },[]);

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