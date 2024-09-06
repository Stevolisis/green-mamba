"use client"
import HighChart from '@/components/HighChart'
import { dummy_data, dummy_gifts } from '@/dummy_data'
import { useAppDispatch } from '@/redux/hooks'
import { addChart } from '@/redux/slices/chart'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { BsBank2 } from 'react-icons/bs'
import { IoNotifications } from 'react-icons/io5'
import { MdArticle } from 'react-icons/md'


const page = () => {
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(addChart({name:"Gifts",title:"Finance Report",data:dummy_gifts}));
    dispatch(addChart({name:"Gifters",title:"Finance Report",data:dummy_data}));
  },[]);

  return (
    <div className="px-4 sm:px-16 py-12 font-[SatoshiRegular]">
      <div className='flex justify-between gap-3 flex-wrap sm:flex-nowrap'>

        <div className='w-full p-7 rounded-lg shadow-lg bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% flex flex-col gap-y-14'>
          <div className='flex justify-between items-center'>
            
            <div className='rounded-md p-3 glassMorphism'>
              <BsBank2 size={18} />
            </div>

            <div>
              <p className="text-sm">Steven Joseph</p>
            </div>
          </div>

          <div className='flex justify-between items-baseline'>
            
            <div>
              <p className="text-sm mb-2">
                Balance
              </p>
              <h2 className="text-3xl font-[SatoshiBold]">
                12,455 ETH
              </h2>
            </div>

            {/* <div className='h-full'>
              <IoStatsChartSharp className='text-[50px] opacity-50' />
            </div> */}
          </div>
        </div>

        <div className='w-full p-7 rounded-lg shadow-lg glassMorphism border border-[#ffffff1a] flex flex-col gap-y-14'>
          <div className='flex justify-between items-center'>
            
            <div className='rounded-md p-3 glassMorphism'>
              <MdArticle size={18} />
            </div>

            <div>
              <Link href="/articles" className="text-sm underline text-gray-400">View all</Link>
            </div>
          </div>

          <div className='flex justify-between items-baseline'>
            
            <div>
              <p className="text-sm mb-2 text-gray-400">
                Number Of Articles
              </p>
              <h2 className="text-3xl font-[SatoshiBold]">
                43
              </h2>
            </div>

            {/* <div className='h-full'>
              <IoStatsChartSharp className='text-[50px] opacity-50' />
            </div> */}
          </div>
        </div>

        <div className='w-full p-7 rounded-lg shadow-lg glassMorphism border border-[#ffffff1a] flex flex-col gap-y-14'>
          <div className='flex justify-between items-center'>
            
            <div className='rounded-md p-3 glassMorphism'>
              <IoNotifications size={18} />
            </div>

            <div>
              <Link href="/articles" className="text-sm underline text-gray-400">View all</Link>
            </div>
          </div>

          <div className='flex justify-between items-baseline'>
            
            <div>
              <p className="text-sm mb-2 text-gray-400">
                Recent Notification
              </p>
              <h2 className="text-3xl font-[SatoshiBold]">
                17
              </h2>
            </div>

            {/* <div className='h-full'>
              <IoStatsChartSharp className='text-[50px] opacity-50' />
            </div> */}
          </div>
        </div>
      </div>

      <HighChart name="Gifts"/>
    </div>
  )
}

export default page