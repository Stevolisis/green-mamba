import React from 'react'
import Link from 'next/link'
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import { formatDate2 } from '@/utils/fomateDate';

// let Props = {
//     blog: IBlog
// }

const ArticleCard = ({ blog }:any ) => {
  return (
    <Link href={"/article/" + blog.slug} className="md:max-w-[45%] min-w-[250px] p-4 sm:p-6 md:p-8 glassMorphism rounded-lg hover:border hover:border-[#ffffff1a] flex-1 sm:flex-auto">

    <div className="">
      <Image
        src={blog.img.url} 
        alt={blog.title}
        width={500}
        height={300}
        className="aspect-[4/2.5] max-h-[300px] object-cover rounded"
        placeholder="blur"
        blurDataURL={blog.img.url}
      /> 
    </div>  

    <div className="p-2 md:p-6">
      <div className="py-5">
        <h2 className="font-[SatoshiBold] line-clamp-3 text-xl md:text-2xl text-white dark:text-white">{ blog.title }</h2>
      </div>
      <div>
        <p className="font-[SatoshiLight] line-clamp-3 text-sm text-white dark:text-white">{ blog.description }</p>
      </div>
      <div className="pt-7 flex justify-between items-center">
        <div className="flex items-center gap-2 sm:gap-3">
          <FaUserCircle 
            size={17}
            className="text-bgSecondary"
          />
          <p className="font-[SatoshiLight] text-xs text-white dark:text-white">{ blog?.author?.name }</p>
        </div>
        <div>
          <p className="font-[SatoshiLight] text-xs text-white dark:text-white">{ formatDate2(blog.createdAt) }</p>
        </div>
      </div>
    </div>

  </Link>
  )
}

export default ArticleCard