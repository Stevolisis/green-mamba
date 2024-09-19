import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setTimeOption } from '@/redux/slices/table';
import React from 'react'

type Props = {}

const TimeOption = (props: Props) => {
    const { timeOptions, currentTimeOption } = useAppSelector(state => state.table);
    const dispatch = useAppDispatch();

  return (
    <div className='flex justify-between items-center flex-col md:flex-row text-xs font-[SatoshiRegular] py-3 text-gray-400'>
        <div className='hidden md:block'>
            <p>In The Last { currentTimeOption }</p>
        </div>

        <div className='my-3 md:my-0 flex gap-1 sm:gap-3 items-center border border-gray-400 rounded-full'>
            {
                timeOptions.map((item,i)=>(
                    <button onClick={()=> dispatch(setTimeOption(item))} className={`${ item === currentTimeOption && "bg-bgSecondary text-bgPrimary"} w-auto md:w-[70px] py-2 px-5 rounded-3xl hover:bg-bgSecondary hover:text-bgPrimary transition-colors ease-in delay-75`} key={i}>{item}</button> 
                ))
            }
        </div>
    </div>
  )
}

export default TimeOption