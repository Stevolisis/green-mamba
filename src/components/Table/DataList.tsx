import { dummy_data } from '@/dummy_data'
import { useAppSelector } from '@/redux/hooks'
import React, { useEffect, useRef, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi'


const DataList = () => {
    const [active, setActive] = useState(-1)
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { data, dataKeys } = useAppSelector(state => state.table);

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
    <tbody>
        {
            dummy_data.map((data, i) => (
                <tr key={i}>
                    <td className='text-gray-400 py-4 text-xs pl-3'>{(i + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}</td>
                    <td className='pr-4 py-4 text-sm whitespace-normal break-words min-w-[250px]'>{data.title}</td>
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
  )
}

export default DataList