import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect, useState } from 'react';
import CustomMultiselect from './CustomMultiselect';
import CustomTextEditor from './CustomTextEditor';
import { showToast } from '@/redux/slices/toast';
import Loader from './Loader';
import axios from 'axios';
import { PinataSDK } from 'pinata-web3';

export interface IFormData {
    title: string;
    image: File | null;
    description: string;
    tags: string[];
    content: string;
}

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
  pinataGateway: "apricot-certain-bison-572.mypinata.cloud",
});

const AddArticle = () => {
    const { keyWords } = useAppSelector(state => state.article);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ isUploading, setIsUploading ] = useState<boolean>(false);
    const [ url, setUrl ] = useState<string>("");
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

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setIsLoading(!isLoading);
        dispatch(showToast({ message: 'Article created successfully', type: 'success' }));
    };

    async function uploadImage(){
        if(formData.image){
            setIsUploading(true);
            const data = new FormData();
            data.append("file",formData.image);

            await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", 
            data, {
                headers:{
                    "pinata_api_key": process.env.NEXT_PUBLIC_PINATA_API_KEY,
                    "pinata_secret_api_key": process.env.NEXT_PUBLIC_PINATA_API_SECRET,
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(data=>{
                const uploadImage = data.data;
                console.log("uploadImage", uploadImage);
            }).catch(err=>{
                console.log("upload Error", err);
            }).finally(()=>{
                setIsUploading(false);
            });
        }

    };

    async function uploadImage2(){
        if(formData.image){
            try {
                const upload = await pinata.upload.file(formData.image);
                console.log("!11",upload);
              } catch (error) {
                console.log("222", error);
              }
        }
    }
    useEffect(()=>{
        if(formData.image){
            uploadImage2();
        }
        console.log("ttt", process.env.NEXT_PUBLIC_PINATA_API_KEY);
    },[formData.image]);
    

    return (
        <>
            <form onSubmit={(e)=>handleSubmit(e)} className="w-full sm:w-[55vw] pt-16 pb-5 px-4 flex flex-col justify-start items-center">
                <h1 className="mb-5 font-[SatoshiMedium] text-3xl">Add Article</h1>

                <div className='my-5 w-full'>
                    <p className=' ml-1 mb-1 text-sm font-[SatoshiMedium]'>Title</p>
                    <input
                        className="mb-5 font-[SatoshiRegular] w-full text-sm bg-transparent border border-bgSecondary focus:outline-bgSecondary focus:border-bgSecondary rounded-lg py-3 px-5"
                        type="text"
                        placeholder="Title e.g Introduction to AI"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>


                <div className='my-5 w-full'>
                    <p className='ml-1 mb-1 text-sm font-[SatoshiMedium]'>Description</p>
                    <textarea
                        className="h-[250px] mb-5 font-[SatoshiRegular] w-full text-sm bg-transparent border border-bgSecondary focus:outline-bgSecondary focus:border-bgSecondary rounded-lg py-3 px-5"
                        maxLength={80}
                        placeholder="Description e.g AI is the future and everybody loves it..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>


                <CustomTextEditor 
                    value = { formData.content }
                    onEDTChange={ onEDTChange }
                    placeholder= 'please type here...'
                />

                <div className='my-5 w-full'>
                    <p className=' ml-1 mb-1 text-sm font-[SatoshiMedium]'>Keywords</p>
                    <CustomMultiselect 
                        options={keyWords} 
                        defaultVal={formData.tags}
                        onSelect={handleTagSelect} 
                        onRemove={handleTagRemove} 
                        placeholder='Select Keywords'
                    />
                </div>


                <div className='my-5 w-full'>
                    <p className=' ml-1 mb-1 text-sm font-[SatoshiMedium]'>Image</p>
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

                <button className="w-full font-[SatoshiMedium] flex gap-2 justify-center items-center text-base text-bgPrimary py-2 px-4 bg-bgSecondary rounded-[4px] hover:bg-emerald-400 transition-colors ease-in">
                    {
                        isLoading ? 
                            <Loader size={24} color='#01140d' /> :
                            <p className="pl-2">Add Article</p>
                    }
                </button>
            </form>
        </>
    );
};

export default AddArticle;
