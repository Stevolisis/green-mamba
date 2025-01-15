import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect, useState } from 'react';
import CustomMultiselect from './CustomMultiselect';
import CustomTextEditor from './CustomTextEditor';
import { showToast } from '@/redux/slices/toast';
import Loader from './Loader';
import { api } from '@/utils/axiosConfig';
import { showSlide } from '@/redux/slices/slider';
import { ethers } from 'ethers';
import { articleContractABI, articleContractAddress } from '@/utils/contractConfig';
import web3modal from "web3modal";

export interface IFormData {
    title: string;
    image: File | null;
    description: string;
    tags: string[];
    content: string;
}


const AddArticle = () => {
    const { keyWords } = useAppSelector(state => state.article);
    const { walletAddress, userId } = useAppSelector(state => state.auth);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ isUploading, setIsUploading ] = useState<boolean>(false);
    const [formData, setFormData] = useState<IFormData>({
        title: "",
        image: null,
        description: "",
        tags: [],
        content: ""
    });
    const dispatch = useAppDispatch();

    const handleTagSelect = (selectedList: any, selectedItem: any) => {
        const selectedTags = selectedList.map((item: any) => item);
        setFormData({ ...formData, tags: selectedTags });
    };

    const handleTagRemove = (selectedList: any, removedItem: any) => {
        const remainingTags = selectedList.map((item: any) => item);
        setFormData({ ...formData, tags: remainingTags });
    };

    const onEDTChange = (e: any) => {
        setFormData({ ...formData, content: e });
    };


    async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        console.log("fdgfhgjhkjlhkgjfh", userId ? userId : 'noUserId');
        setIsLoading(true);

        const form = e.target as HTMLFormElement;
        if(!walletAddress || !userId){
            setIsLoading(false);
            return dispatch(showToast({message:"Pls connect your wallet!", type:"info"}));
        }
        if(!formData.image || !formData.tags || !formData.content){
            setIsLoading(false);
            return dispatch(showToast({message:"Pls complete the form!", type:"info"}));
        }

        try{
            const formdata= new FormData(form);
            formdata.append("author", userId);
            formdata.append("file", formData.image);
            formdata.append("tags", JSON.stringify(formData.tags));
            formdata.append("content", formData.content);

            const result = await api.post("/articles/createArticle", formdata);
            const data = result.data;
            const title = data.data.title;
            const metadataId = data.data._id;
            // Interact with the smart contract
            const Web3Loader = new web3modal();
            const connection = await Web3Loader.connect();
            const provider = new ethers.BrowserProvider(connection);
            const signer = await provider.getSigner();
    
            // Set contract details
            const contractAddress = articleContractAddress;
            const contractABI = articleContractABI;
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            console.log("Signer: ", signer);

            // Call the addAuthor function
            let tx ;
            try {
                tx = await contract.addArticle(title, metadataId);
                await tx.wait();
                console.log("Article added: ", tx.hash);
            } catch (err) {
                console.error("Error calling addArticle:", err);
                throw new Error("Unable to add Article details.");
            }
            dispatch(showToast({message:data.message, type:"success"}));
            dispatch(showSlide());
            form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea").forEach(input => {
                input.value = "";
            });
            console.log(data);

        }catch(err:any){
          console.log("Err: ", err);
          dispatch(showToast({message:err?.response?.data?.message || err.message, type:"error"}));
        }finally{
            setIsLoading(false);
        }
    }

    

    return (
        <>
            <form onSubmit={(e)=>handleSubmit(e)} className="w-full sm:w-[55vw] pt-16 pb-5 px-4 flex flex-col justify-start items-center">
                <h1 className="mb-5 font-[SatoshiMedium] text-3xl text-white dark:text-white">Add Article</h1>

                <div className='my-5 w-full'>
                    <p className=' ml-1 mb-1 text-sm font-[SatoshiMedium] text-white dark:text-white'>Title</p>
                    <input
                        name='title'
                        className="mb-5 font-[SatoshiRegular] w-full text-sm bg-transparent border border-bgSecondary focus:outline-bgSecondary focus:border-bgSecondary rounded-lg py-3 px-5"
                        type="text"
                        placeholder="Title e.g Introduction to AI"
                    />
                </div>


                <div className='my-5 w-full'>
                    <p className='ml-1 mb-1 text-sm font-[SatoshiMedium] text-white dark:text-white'>Description</p>
                    <textarea
                        name='description'
                        className="h-[250px] mb-5 font-[SatoshiRegular] w-full text-sm bg-transparent border border-bgSecondary focus:outline-bgSecondary focus:border-bgSecondary rounded-lg py-3 px-5"
                        maxLength={80}
                        placeholder="Description e.g AI is the future and everybody loves it..."
                    />
                </div>


                <CustomTextEditor 
                    value = { formData.content }
                    onEDTChange={ onEDTChange }
                    placeholder= 'please type here...'
                />

                <div className='my-5 w-full'>
                    <p className=' ml-1 mb-1 text-sm font-[SatoshiMedium] text-white dark:text-white'>Keywords</p>
                    <CustomMultiselect 
                        options={keyWords} 
                        defaultVal={formData.tags}
                        onSelect={handleTagSelect} 
                        onRemove={handleTagRemove} 
                        placeholder='Select Keywords'
                    />
                </div>


                <div className='my-5 w-full'>
                    <p className=' ml-1 mb-1 text-sm font-[SatoshiMedium] text-white dark:text-white'>Image</p>
                    <div className='flex gap-x-2 items-center justify-between'>
                        <input
                            className="font-[SatoshiRegular] w-full text-sm bg-transparent border border-bgSecondary focus:outline-bgSecondary focus:border-bgSecondary rounded-lg py-3 px-5"
                            placeholder="Content e.g AI has taken over humans, many have integrated AI in their daily life activity..."
                            type='file'
                            onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                        />
                        {
                            isUploading && <Loader size={12} color='#00ff95' />
                        }
                    </div>
                </div>

                <button className="w-full font-[SatoshiMedium] flex gap-2 justify-center items-center text-base py-2 px-4 bg-bgSecondary rounded-[4px] hover:bg-emerald-400 transition-colors ease-in">
                    {
                        isLoading ? 
                            <Loader size={24} color='#01140d' /> :
                            <p className="pl-2 text-bgPrimary dark:text-bgPrimary ">Add Article</p>
                    }
                </button>
            </form>
        </>
    );
};

export default AddArticle;
