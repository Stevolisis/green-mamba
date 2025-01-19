"use client"
import { Hero } from "@/assets";
import Image from "next/image";
import { IBlog, dummy_data } from "@/dummy_data";
import ArticleCard from "@/components/ArticleCard";
import { IBlogApi, setArticles } from "@/redux/slices/article";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { api } from "../utils/axiosConfig";
import { showToast } from "@/redux/slices/toast";
import Loader from "@/components/Loader";


export default function Home() {
  const dispatch = useAppDispatch();
  const { articles } = useAppSelector(state => state.article);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchArticles(){
    setLoading(true);
    try{
      const result = await api.get("/articles/getArticles");
      const data = result.data.data;
      dispatch(setArticles(data));

      console.log(result);
    }catch(err:any){
      console.log("Err: ", err);
      dispatch(showToast({message:err.response.data.message, type:"error"}));
    }finally{
      setLoading(false);
    }
  }
  useEffect(()=>{
    fetchArticles();
  }, []);

  return (
    <main className="px-4 sm:px-16 py-12 bg-bgPrimary">
      <div className="py-5 sm:py-10 gap-y-14 sm:gap-y-0 flex justify-evenly items-center flex-wrap sm:flex-nowrap">
        <div className="w-full flex flex-col gap-8">
          <div className="font-[SatoshiBold] text-5xl md:text-7xl">
            <h1 className="text-white dark:text-white">Green Mamba</h1>
            <h1 className="text-white dark:text-white">Blog</h1>
          </div>
          
          <div>
            <p className="text-sm font-[SatoshiRegular] text-white dark:text-white">Get daily Web3, Crypto and Tech News and Updates</p>
          </div>

          <div>
            <button className=" text-sm py-2 px-4 bg-bgSecondary rounded-[4px]">
              <p className="font-[SatoshiMedium] text-bgPrimary dark:text-bgPrimary">Get Started</p>
            </button>
          </div>
        </div>

        <div>
          <Image 
            src={Hero}
            alt="Hero"
            width={1000}
            height={1000}
            placeholder="blur"
            priority
          />
        </div>
      </div>

      <div className="py-12 flex flex-wrap justify-center gap-12 sm:gap-7">
        {
          loading ?
          <div className='w-full flex justify-center items-center'>
            <Loader size={32} color="#00ff95" />
          </div> 
          :articles.map((blog:IBlogApi, i:number)=>(
              <ArticleCard blog={blog} key={i} />
          ))
        }
      </div>
    </main>
  );
}
