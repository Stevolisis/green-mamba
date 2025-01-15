import { useAppSelector } from '@/redux/hooks';
import { formatDate } from '@/utils/fomateDate';
import React from 'react'
import { FaGift, FaEnvelope } from 'react-icons/fa6';
import { HiSpeakerphone } from "react-icons/hi";

type Props = {}

const NotificationItem = (props: Props) => {
  const { notifications } = useAppSelector((state)=> state.notification);

  return (
    <div className=' w-full overflow-auto scrollbar-thumb-[#0C5A33] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scroll-smooth scrollbar-none sm:scrollbar'>
      {
        notifications.map((item, i)=>(
          <div key={i} className={`flex px-4 py-3 border-gradient gap-3 ${ !item.read && " bg-[#0F2D1B] "}`}>
            <div className=' mt-1 rounded-full w-6 h-6 bg-[#0C5A33] flex justify-center items-center'>
              {
                item.type==='message' ? <FaEnvelope size={12} className='text-bgSecondary' /> :
                item.type==='gift' ? <FaGift size={12} className='text-bgSecondary' /> :
                item.type==='announcement' ? <HiSpeakerphone size={14} className='text-bgSecondary' /> : ""
              }
            </div>
            <div>
              <p className='font-[SatoshiBold] text text-white dark:text-white'>{ item.heading } </p>
              <p className='font-[SatoshiRegular] text-sm text-white dark:text-white'>{ item.message } </p>
              <p className='font-[SatoshiRegular] text-[10px] text-gray-400 mt-1 dark:text-gray-400'>{ formatDate(item.createdAt, true) } </p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default NotificationItem