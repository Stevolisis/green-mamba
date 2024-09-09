import { dummy_data } from '@/dummy_data'
import React from 'react'
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi'

type Props = {}

const TableContainer = (props: Props) => {
  return (
    <div className='rounded-md my-7 glassMorphism border border-[#ffffff1a] p-5 sm:p-12'>
        <div>
            <h1 className='text-2xl md:text-3xl font-[SatoshiBold]'>Finance History</h1>
        </div>

        <div className='flex justify-between items-center text-xs font-[SatoshiRegular] py-3 text-gray-400'>
            <div>
                <p>In The Last 24 Hours</p>
            </div>

            <div className='flex gap-3 items-center border border-gray-400 rounded-full'>
                {
                    ["1W","1M","3M","1Y","ALL"].map((item,i)=>(
                        <button className='w-[70px] py-2 px-5 rounded-3xl hover:bg-bgSecondary hover:text-bgPrimary transition-colors ease-in delay-75' key={i}>{item}</button> 
                    ))
                }
            </div>
        </div>

        <div>
            <table className='w-full overscroll-none md:overflow-y-auto font-[SatoshiRegular] border-collapse'>
                <thead className='mb4'>
                    <tr className=' text-gray-400 text-sm'>
                        <td className='py-4 px-4 rounded-s-2xl glassMorphism'>#</td>
                        <td className='glassMorphism'>Market</td>
                        <td className='glassMorphism'>Index price</td>
                        <td className='glassMorphism'>Change</td>
                        <td className='glassMorphism'>Market Cap</td>
                        <td className='px-4 pl-0 rounded-r-2xl glassMorphism'></td>
                    </tr>
                </thead>

                <tbody>
                    {
                        dummy_data.map((data, i)=>(
                            <tr className=''>
                                <td className='text-gray-400 py-4 text-xs pl-3'>{(i+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</td>
                                <td className='pr-4 py-4 text-sm'>{data.title}</td>
                                <td className='pr-4 py-4 text-sm'>{data.createdAt}</td>
                                <td className='pr-4 py-4 text-sm whitespace-nowrap'>{data.authorName}</td>
                                <td className='py-4 pr-0 text-sm'>{data.createdAt}</td>
                                <td className='pl-2 py-4 pr-3 text-sm'>
                                    <div className='flex justify-end'>
                                        <PiDotsThreeOutlineVerticalFill className='cursor-pointer' size={20} />
                                    </div>
                                </td>   
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default TableContainer