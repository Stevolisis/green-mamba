"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import Image from "next/image";
import { FaGift, FaUserCircle } from "react-icons/fa";
import { formatDate, formatDate2 } from '@/utils/fomateDate';
import Head from 'next/head';
import { api } from '@/utils/axiosConfig';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { IBlogApi, setArticle } from '@/redux/slices/article';
import parse from 'html-react-parser';
import { ethers } from 'ethers';
import { articleContractABI, articleContractAddress } from '@/utils/contractConfig';
import { showToast } from '@/redux/slices/toast';
import Loader from '@/components/Loader';
import { getWeb3Modal } from '../../../config/web3ModalConfig';

type ISlug = {
  slug: string
}

const page = () => {
  const { slug }:ISlug = useParams();
  const { article } = useAppSelector(state => state.article);
  const [loading, setLoading] = useState<boolean>(false);
  const [giftSending, setGiftSending] = useState<boolean>(false);
  const dispatch = useAppDispatch();


  async function handleGifting() {
    if(article){
      try {
        setGiftSending(true);
        const web3Modal = getWeb3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();
  
        // Initialize contract
        const contract = new ethers.Contract(articleContractAddress, articleContractABI, signer);

        // Set the amount to gift (e.g., 0.01 Ether)
        const giftAmount = ethers.parseEther("0.001"); // Adjust the amount as needed

        // Call the `giftAuthor` function (ensure the article's author address is available)
        const tx = await contract.sendGift(article._id, { value: giftAmount });
        console.log("Transaction sent:", tx);

        // Wait for the transaction to be confirmed
        const receipt = await tx.wait();
        console.log("Transaction confirmed:", receipt);

        // Notify the user
        dispatch(showToast({ message: "Gift Sent Successfully", type: "success" }));

      } catch (err: any) {
        console.error("Error sending gift:", err);
        dispatch(showToast({message:"Error Occured", type:"error"}));
      } finally{
        setGiftSending(false);
      }
    }
  };


  async function fetchArticles(){
    setLoading(true);
    try{
      const result = await api.get(`/articles/getArticle/${slug}`);
      const data:IBlogApi = result.data.data;
      dispatch(setArticle(data));

      console.log(result);
    }catch(err){
      console.log("Err: ", err);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchArticles();
  }, []);

  useEffect(() => {
    document.title = "Article";
  }, []);

  
  return (
    <>
      <Head>
        <title>{document.title}</title>
        <meta
          name="description"
          content="example description"
        />
      </Head>
      <div className="bg-bgPrimary">
        <div className='pt-12 pb-6 sm:pb-4 px-4 sm:px-20'>
          <h1 className='text-3xl sm:text-4xl font-[SatoshiBold] text-gray-100 dark:text-gray-100'>{ article?.title }</h1>
        </div>

        <div className='flex flex-wrap gap-3 px-4 sm:px-20'>
          {
            article?.tags?.map((tag,i)=>(
              <p key={i} className='text-[10px] font-[SatoshiMedium] rounded-[4px] py-[5px] px-2 bg-bgSecondary text-bgPrimary dark:text-bgPrimary'>{ tag }</p>
            ))
          }
        </div>

        {
          loading ?
          <div className='w-full flex justify-center items-center'>
            <Loader size={32} color="#00ff95" />
          </div> 
          :<div className='flex justify-between items-center py-7 mx-4 sm:mx-20 border-gradient'>
            <div className='flex items-center gap-x-3'>
              <div>
                <FaUserCircle
                  size={24}
                  className="text-bgSecondary"
                />
              </div>

              <div>
                <h4 className='font-[SatoshiMedium] text-xs text-white dark:text-white'>{ article?.author?.name }</h4>
                <p className='font-[SatoshiLight] text-[10px] text-white dark:text-white'>{ article && formatDate2(article.createdAt) }</p>
              </div>
            </div>

            <div className=''>
              <button onClick={()=>handleGifting()} className="font-[SatoshiMedium] flex gap-2 items-center text-xs text-bgPrimary py-2 px-4 bg-bgSecondary rounded-[4px] hover:bg-emerald-400 transition-colors ease-in">
                <FaGift className="text-lg" />
                {
                  giftSending ? 
                  <p className='border-l border-l-bgPrimary pl-2'>
                    <Loader size={20} color="#01140d" />
                  </p> :
                  <p className="hidden sm:block border-l border-l-bgPrimary pl-2 text-bgPrimary dark:text-bgPrimary">Gift Author</p>
                }
              </button>
            </div>
          </div>
        }

        <div className='py-6'>
            {article && <Image
              src={ article.img.url }
              alt="content image"
              width={400}
              height={400}
              className='!w-full aspect-[4/2.2] sm:aspect-[4/1.5] object-cover'
              placeholder='blur'
              blurDataURL={article.img.url}
            />}
        </div>

        <div className='px-4 sm:px-20 py-5 sm:py-7'>
          <p className='font-[SatoshiRegular] text-[15px] text-white dark:text-white'>
            { article && parse(article?.content as string) }
          </p>
        </div>

        <div className='flex justify-center items-center pb-12'>
            <button onClick={()=>handleGifting()} className="font-[SatoshiMedium] flex gap-2 items-center text-xs text-bgPrimary py-2 px-4 bg-bgSecondary rounded-[4px] hover:bg-emerald-400 transition-colors ease-in">
              <FaGift className="text-lg" />
              {
                giftSending ? 
                <p className='border-l border-l-bgPrimary pl-2'>
                  <Loader size={20} color="#01140d" />
                </p> :
                <p className="border-l border-l-bgPrimary pl-2">Gift Author</p>
              }
            </button>
        </div>

      </div>
    </>
  )
}

export default page