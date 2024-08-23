import React from 'react'
import Link from 'next/link'
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import { IBlog } from '@/dummy_data';
import { formatDate } from '@/utils/fomateDate';

// let Props = {
//     blog: IBlog
// }

const ArticleCard = ({ blog }:any ) => {
  return (
    <Link href={"/article/" + blog.slug} className=" max-w-[45%] min-w-[250px] p-4 sm:p-6 md:p-8 glassMorphism rounded-lg hover:border hover:border-[#ffffff1a] flex-1 sm:flex-auto">

    <div className="">
      <Image
        src={blog.image} 
        alt={blog.title}
        width={500}
        height={300}
        className="aspect-[4/2.5] max-h-[300px] object-cover rounded"
        placeholder="blur"
      /> 
    </div>  

    <div className="p-2 md:p-6">
      <div className="py-5">
        <h2 className="font-[SatoshiBold] line-clamp-3 text-xl md:text-2xl">{ blog.title }</h2>
      </div>
      <div>
        <p className="font-[SatoshiLight] line-clamp-3 text-sm">{ blog.description }</p>
      </div>
      <div className="pt-7 flex justify-between items-center">
        <div className="flex items-center gap-2 sm:gap-3">
          <FaUserCircle 
            size={17}
            className="text-bgSecondary"
          />
          <p className="font-[SatoshiLight] text-xs">{ blog.authorName }</p>
        </div>
        <div>
          <p className="font-[SatoshiLight] text-xs">{ formatDate(blog.createdAt) }</p>
        </div>
      </div>
    </div>

  </Link>
  )
}

export default ArticleCard