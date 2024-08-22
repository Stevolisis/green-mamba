"use client"
import React from 'react'
import { dummy_data, IBlog } from '@/dummy_data';
import { useParams } from 'next/navigation';
import Image from "next/image";
import { FaGift, FaUserCircle } from "react-icons/fa";
import { User } from '@/assets';

type ISlug = {
  slug: string
}

const page = () => {
  const { slug }:ISlug = useParams();
  const blog: IBlog = dummy_data.filter((blog: IBlog )=> blog.slug === slug )[0];
  console.log(blog);
  
  return (
    <div>
      <div className='pt-12 pb-6 sm:pb-4 px-4 sm:px-20'>
        <h1 className='text-3xl sm:text-4xl font-[SatoshiBold] text-gray-100'>{ blog.title }</h1>
      </div>

      <div className='flex flex-wrap gap-3 px-4 sm:px-20'>
        {
          blog?.tags?.map((tag,i)=>(
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
            <h4 className='font-[SatoshiMedium] text-xs'>{ blog.authorName }</h4>
            <p className='font-[SatoshiLight] text-[10p+x]'>{ blog.createdAt }</p>
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
          <Image
            src={ blog.image }
            alt="content image"
            width={400}
            height={400}
            className='!w-full aspect-[4/2.2] sm:aspect-[4/1.5] object-cover'
            placeholder='blur'
          />
      </div>

      <div className='px-4 sm:px-20 py-5 sm:py-7'>
        <p className='font-[SatoshiRegular] text-[15px]'>
          { blog.content }
        </p>
      </div>

      <div className='flex justify-center items-center pb-12'>
          <button className="font-[SatoshiMedium] flex gap-2 items-center text-xs text-bgPrimary py-2 px-4 bg-bgSecondary rounded-[4px] hover:bg-emerald-400 transition-colors ease-in">
            <FaGift className="text-lg" />
            <p className="border-l border-l-bgPrimary pl-2">Gift Author</p>
          </button>
      </div>

    </div>
  )
}

export default page