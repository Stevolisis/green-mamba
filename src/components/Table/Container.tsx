import { dummy_data } from '@/dummy_data'
import React, { useEffect, useRef, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi'

type Props = {}

const TableContainer = (props: Props) => {
    const [active, setActive] = useState(-1)
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event:MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setActive(-1);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    
  return (
    <div className='rounded-md my-7 glassMorphism border border-[#ffffff1a] p-5 pt-12 md:pt-12 sm:p-12'>
        <div>
            <h1 className='text-2xl md:text-3xl font-[SatoshiBold]'>Finance History</h1>
        </div>

        <div className='flex justify-between items-center flex-col md:flex-row text-xs font-[SatoshiRegular] py-3 text-gray-400'>
            <div className='hidden md:block'>
                <p>In The Last 24 Hours</p>
            </div>

            <div className='my-5 md:my-0 flex gap-3 items-center border border-gray-400 rounded-full'>
                {
                    ["1W","1M","3M","1Y","ALL"].map((item,i)=>(
                        <button className='w-auto md:w-[70px] py-2 px-5 rounded-3xl hover:bg-bgSecondary hover:text-bgPrimary transition-colors ease-in delay-75' key={i}>{item}</button> 
                    ))
                }
            </div>
        </div>
        
        <div className='overflow-x-auto overflow-y-hidden md:overflow-x-visible'>
            <table className='w-full font-[SatoshiRegular] border-collapse'>
                <thead>
                    <tr className='text-gray-400 rounded-2xl text-sm'>
                        <td className='py-4 px-4 rounded-s-2xl glassMorphism'>#</td>
                        <td className='glassMorphism whitespace-normal break-words min-w-[250px]'>Market</td>
                        <td className='glassMorphism'>Index price</td>
                        <td className='glassMorphism'>Change</td>
                        <td className='glassMorphism'>Market Cap</td>
                        <td className='px-4 pl-0 rounded-r-2xl glassMorphism'></td>
                    </tr>
                </thead>

                <tbody>
                    {
                        dummy_data.map((data, i) => (
                            <tr key={i}>
                                <td className='text-gray-400 py-4 text-xs pl-3'>{(i + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}</td>
                                <td className='pr-4 py-4 text-sm'>{data.title}</td>
                                <td className='pr-4 py-4 text-sm'>{data.createdAt}</td>
                                <td className='pr-4 py-4 text-sm whitespace-nowrap'>{data.authorName}</td>
                                <td className='py-4 pr-0 text-sm'>{data.createdAt}</td>
                                <td className='pl-2 py-4 pr-3 text-sm relative'>
                                    <div className='flex justify-end'>
                                        <PiDotsThreeOutlineVerticalFill onClick={() => setActive(active === i ? -1 : i)} className='cursor-pointer' size={20} />
                                    </div>
                                    {
                                        active === i && (
                                            <div 
                                                ref={dropdownRef}
                                                className={`absolute ${
                                                    i >= dummy_data.length - 2 ? '-top-[80px]' : 'top-full'
                                                } right-0 mt-2 w-40 bg-gray-900 rounded-lg shadow-lg z-10`}>
                                                <button className='w-full rounded-tr-lg rounded-tl-lg border-b border-b-gray-800 px-5 py-4 hover:bg-blue-600 hover:text-white flex items-center text-blue-600'>
                                                    <BiEdit size={16} />
                                                    <p className='text-xs ml-2'>EDIT</p>
                                                </button>
                                                <button className='w-full rounded-br-lg rounded-bl-lg px-5 py-4 hover:bg-red-600 hover:text-white flex items-center text-red-600'>
                                                    <MdDelete size={16} />
                                                    <p className='text-xs ml-2'>DELETE</p>
                                                </button>
                                            </div>
                                        )
                                    }
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