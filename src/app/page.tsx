import { Hero } from "@/assets";
import Image from "next/image";
import { IBlog, dummy_data } from "@/dummy_data";
import ArticleCard from "@/components/ArticleCard";


export default function Home() {


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
            width={500}
            height={500}
          />
        </div>
      </div>

      <div className="py-12 flex flex-wrap justify-center gap-12 sm:gap-7">
        {
          dummy_data.map((blog:IBlog,i:number)=>(
            <ArticleCard blog={blog}/>
          ))
        }
      </div>
    </main>
  );
}
