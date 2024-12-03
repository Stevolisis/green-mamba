"use client"
import { Hero } from "@/assets";
import Image from "next/image";
import { IBlog, dummy_data } from "@/dummy_data";
import ArticleCard from "@/components/ArticleCard";
import { IBlogApi, setArticles } from "@/redux/slices/article";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { api } from "../utils/axiosConfig";
import { showToast } from "@/redux/slices/toast";


export default function Home() {
  const dispatch = useAppDispatch();
  const { articles } = useAppSelector(state => state.article);

  async function fetchArticles(){
    try{
      const result = await api.get("/articles/getArticles");
      const data = result.data.data;
      dispatch(setArticles(data));

      console.log(result);
    }catch(err:any){
      console.log("Err: ", err);
      dispatch(showToast({message:err.response.data.message, type:"error"}));
    }
  }
  useEffect(()=>{
    fetchArticles();
  }, []);

  return (
    <main className="px-4 sm:px-16 py-12">
      <div className="py-5 sm:py-10 gap-y-14 sm:gap-y-0 flex justify-evenly items-center flex-wrap sm:flex-nowrap">
        <div className="w-full flex flex-col gap-8">
          <div className="font-[SatoshiBold] text-5xl md:text-7xl">
            <h1>Green Mamba</h1>
            <h1>Blog</h1>
          </div>
          
          <div>
            <p className="text-sm font-[SatoshiRegular]">Get daily Web3, Crypto and Tech News and Updates</p>
          </div>

          <div>
            <button className=" text-sm text-bgPrimary py-2 px-4 bg-bgSecondary rounded-[4px]">
              <p className="font-[SatoshiMedium]">Get Started</p>
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
          articles.map((blog:IBlogApi, i:number)=>(
            <ArticleCard blog={blog} key={i} />
          ))
        }
      </div>
    </main>
  );
}
