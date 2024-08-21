import { Hero } from "@/assets";
import Image from "next/image";
import { IBlog, dummy_data } from "@/dummy_data";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";


export default function Home() {

  function formatTime(time:number): string {
    return "ghg"
  }

  return (
    <main className="px-16 py-12">
      <div className="py-10 flex justify-evenly items-center ">
        <div className="flex flex-col gap-8">
          <div className="font-[SatoshiBold] text-7xl">
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

      <div className="py-12 flex flex-wrap justify-center gap-7">
        {
          dummy_data.map((blog:IBlog,i:number)=>(
            <Link href={"/" + blog.slug} className="p-8 glassMorphism rounded-lg w-[45%] hover:border hover:border-[#ffffff1a]">

              <div className="">
                <Image
                  src={blog.image} 
                  alt={blog.title}
                  width={500}
                  height={300}
                  className="aspect-[4/2.5] max-h-[300px] object-cover"
                /> 
              </div>  

              <div className="p-6">
                <div className="py-5">
                  <h2 className="font-[SatoshiBold] text-2xl">{ blog.title }</h2>
                </div>
                <div>
                  <p className="font-[SatoshiLight] text-sm">{ blog.description }</p>
                </div>
                <div className="pt-7 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <FaUserCircle 
                      size={17}
                      className="text-bgSecondary"
                    />
                    <p className="font-[SatoshiLight] text-xs">{ blog.authorName }</p>
                  </div>
                  <div>
                    <p className="font-[SatoshiLight] text-xs">{ blog.createdAt }</p>
                  </div>
                </div>
              </div>

            </Link>
          ))
        }
      </div>
    </main>
  );
}
