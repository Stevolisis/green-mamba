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

type ISlug = {
  slug: string
}


const page = () => {
  const { slug }:ISlug = useParams();
  const { article } = useAppSelector(state => state.article);
  const dispatch = useAppDispatch();

  async function fetchArticles(){
    try{
      const result = await api.get(`/articles/getArticle/${slug}`);
      const data:IBlogApi = result.data.data;
      dispatch(setArticle(data));

      console.log(result);
    }catch(err){
      console.log("Err: ", err);
    }
  }
  useEffect(()=>{
    fetchArticles();
  }, []);

  function handleGifting(){
    return;
  };

  useEffect(() => {
    document.title = "About Us ";
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
      <div>
        <div className='pt-12 pb-6 sm:pb-4 px-4 sm:px-20'>
          <h1 className='text-3xl sm:text-4xl font-[SatoshiBold] text-gray-100'>{ article?.title }</h1>
        </div>

        <div className='flex flex-wrap gap-3 px-4 sm:px-20'>
          {
            article?.tags?.map((tag,i)=>(
              <p key={i} className='text-[10px] font-[SatoshiMedium] rounded-[4px] py-[5px] px-2 bg-bgSecondary text-bgPrimary'>{ tag }</p>
            ))
          }
        </div>

        <div className='flex justify-between items-center py-7 mx-4 sm:mx-20 border-gradient'>
          <div className='flex items-center gap-x-3'>
            <div>
              <FaUserCircle
                size={24}
                className="text-bgSecondary"
              />
            </div>

            <div>
              <h4 className='font-[SatoshiMedium] text-xs'>{ article?.author.name }</h4>
              <p className='font-[SatoshiLight] text-[10px]'>{ article && formatDate2(article.createdAt) }</p>
            </div>
          </div>

          <div className=''>
            <button className="font-[SatoshiMedium] flex gap-2 items-center text-xs text-bgPrimary py-2 px-4 bg-bgSecondary rounded-[4px] hover:bg-emerald-400 transition-colors ease-in">
              <FaGift className="text-lg" />
              <p className="hidden sm:block border-l border-l-bgPrimary pl-2">Gift Author</p>
            </button>
          </div>
        </div>

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
          <p className='font-[SatoshiRegular] text-[15px]'>
            { article && parse(article?.content as string) }
          </p>
        </div>

        <div className='flex justify-center items-center pb-12'>
            <button onClick={()=>handleGifting()} className="font-[SatoshiMedium] flex gap-2 items-center text-xs text-bgPrimary py-2 px-4 bg-bgSecondary rounded-[4px] hover:bg-emerald-400 transition-colors ease-in">
              <FaGift className="text-lg" />
              <p className="border-l border-l-bgPrimary pl-2">Gift Author</p>
            </button>
        </div>

      </div>
    </>
  )
}

export default page