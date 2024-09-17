import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect, useState } from 'react';
import CustomMultiselect from './CustomMultiselect';
import CustomTextEditor from './CustomTextEditor';
import { showNotification } from '@/redux/slices/notification';
import Loader from './Loader';

export interface IFormData {
    title: string;
    image: File | null;
    description: string;
    tags: string[];
    content: string;
}

const EditArticle = () => {
    const { article, keyWords } = useAppSelector(state => state.article);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
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
        dispatch(showNotification({ message: 'Article updated successfully', type: 'success' }));
    };
    
    useEffect(() => {
        if (article && (formData.title !== article.title)) { 
            setFormData({
                title: article.title || "",
                image: null, 
                description: article.description || "",
                tags: article.tags || [],
                content: article.content || ""
            });
        }

    }, [article, formData.title]);

    console.log("form.. ",formData.image)

    return (
        <>
            <form onSubmit={(e)=>handleSubmit(e)} className="w-full sm:w-[55vw] pt-16 pb-5 px-4 flex flex-col justify-start items-center">
                <h1 className="mb-5 font-[SatoshiMedium] text-3xl">Edit Article</h1>

                <div className='my-5 w-full'>
                    <p className=' ml-1 mb-1 text-sm'>Title</p>
                    <input
                        className="mb-5 font-[SatoshiRegular] w-full text-sm bg-transparent border border-bgSecondary focus:outline-bgSecondary focus:border-bgSecondary rounded-lg py-3 px-5"
                        type="text"
                        placeholder="Title e.g Introduction to AI"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>


                <div className='my-5 w-full'>
                    <p className='ml-1 mb-1 text-sm'>Description</p>
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
                    <p className=' ml-1 mb-1 text-sm'>Keywords</p>
                    <CustomMultiselect 
                        options={keyWords} 
                        defaultVal={formData.tags}
                        onSelect={handleTagSelect} 
                        onRemove={handleTagRemove} 
                        placeholder='Select Keywords'
                    />
                </div>


                <div className='my-5 w-full'>
                    <p className=' ml-1 mb-1 text-sm'>Image</p>
                    <input
                        className="font-[SatoshiRegular] w-full text-sm bg-transparent border border-bgSecondary focus:outline-bgSecondary focus:border-bgSecondary rounded-lg py-3 px-5"
                        placeholder="Content e.g AI has taken over humans, many have integrated AI in their daily life activity..."
                        type='file'
                        onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                    />
                </div>

                <button className="w-full font-[SatoshiMedium] flex gap-2 justify-center items-center text-base text-bgPrimary py-2 px-4 bg-bgSecondary rounded-[4px] hover:bg-emerald-400 transition-colors ease-in">
                    {
                        isLoading ? 
                            <Loader size={20} color='#01140d' /> :
                            <p className="pl-2">Update Article</p>
                    }
                </button>
            </form>
        </>
    );
};

export default EditArticle;
