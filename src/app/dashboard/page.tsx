"use client"
import HighChart from '@/components/HighChart'
import { dummy_data, dummy_gifts } from '@/dummy_data'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { addChart } from '@/redux/slices/chart'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { BsBank2 } from 'react-icons/bs'
import { IoNotifications } from 'react-icons/io5'
import { MdArticle } from 'react-icons/md'
import TableList from '../../components/Table/TableList'
import { deleteListItem, setTable, setTimeOption } from '@/redux/slices/table'
import { setVisibility } from '@/redux/slices/notification'


const page = () => {
  const dispatch = useAppDispatch();
  const { currentMonth, currentYear} = useAppSelector(state => state.charts);
  const { unReadNotifications } = useAppSelector((state)=> state.notification);

  useEffect(()=>{
    dispatch(addChart({name:"Gifts",title:"Finance Report",data:dummy_gifts}));
    dispatch(addChart({name:"Gifters",title:"Finance Report",data:dummy_data}));
  },[dispatch, currentMonth, currentYear]);

  useEffect(()=>{
    dispatch(setTable({
      title: "Financial History",
      timeOptions: ["1D","1M","3M","1Y","ALL"],
      currentTimeOption: "1M",
      timeUpdateFunc: (e)=> dispatch(setTimeOption(e)),
      headings: ["#", "Sender", "Amount", "Blockchain", "Blog Title", "Date"],
      dataKeys: [
        { key:"id", autoIndex: true }, 
        { key:"userAddress", address:true }, 
        { key:"amount" },
        { key: "chain" }, 
        { key:"articleSlug", longText:true }, 
        { key:"createdAt", time:true }
      ],
      data: dummy_gifts,
      actionBtn: false,
    }));
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
              <Link href={""} onClick={()=>dispatch(setVisibility(true))} className="text-sm underline text-gray-400">View all</Link>
            </div>
          </div>

          <div className='flex justify-between items-baseline'>
            
            <div>
              <p className="text-sm mb-2 text-gray-400">
                Recent Notification
              </p>
              <h2 className="text-3xl font-[SatoshiBold]">
                { unReadNotifications }
              </h2>
            </div>

            {/* <div className='h-full'>
              <IoStatsChartSharp className='text-[50px] opacity-50' />
            </div> */}
          </div>
        </div>
      </div>

      <HighChart name="Gifts"/>

      <TableList/>
    </div>
  )
}

export default page