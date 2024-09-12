import { useAppSelector } from '@/redux/hooks'
import React, { useEffect, useRef, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi'

type Props = {
  index:number
}

const DropDown = (props: Props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number>(-1)
  const { data, actionFunc } = useAppSelector(state => state.table);

  
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
    <>
      <td className='pl-2 py-4 pr-3 text-sm relative'>
          <div className='flex justify-end'>
              <PiDotsThreeOutlineVerticalFill onClick={() => setActive(active === props.index ? -1 : props.index)} className='cursor-pointer' size={20} />
          </div>
          {
              actionFunc && active === props.index && (
                  <div 
                      ref={dropdownRef}
                      className={`absolute ${
                          props.index >= data.length - 2 ? '-top-[80px]' : 'top-full'
                      } right-0 mt-2 w-40 bg-gray-900 rounded-lg shadow-lg z-10`}>
                      <button onClick={()=>actionFunc.edit(props.index)} className='w-full rounded-tr-lg rounded-tl-lg border-b border-b-gray-800 px-5 py-4 hover:bg-blue-600 hover:text-white flex items-center text-blue-600'>
                          <BiEdit size={16} />
                          <p className='text-xs ml-2'>EDIT</p>
                      </button>
                      <button onClick={()=> actionFunc.delete(props.index)} className='w-full rounded-br-lg rounded-bl-lg px-5 py-4 hover:bg-red-600 hover:text-white flex items-center text-red-600'>
                          <MdDelete size={16} />
                          <p className='text-xs ml-2'>DELETE</p>
                      </button>
                  </div>
              )
          }
      </td>
    </>

  )
}

export default DropDown