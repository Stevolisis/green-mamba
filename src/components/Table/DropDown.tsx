import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import React, { useEffect, useRef, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi'
import { IBlog } from "@/dummy_data";
import { setArticle } from '@/redux/slices/article'
import { setType, showSlide } from '@/redux/slices/slider'
import { deleteListItem } from '@/redux/slices/table'
import { showToast } from '@/redux/slices/toast'

type Props = {
  id:number
}

const DropDown = (props: Props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number>(-1)
  const { data } = useAppSelector(state => state.table);
  const dispatch = useAppDispatch();
  const isIBlogArray = (arr: any[]): arr is IBlog[] => {
    return arr.every(item => 
      'id' in item &&
      'image' in item &&
      'title' in item &&
      'slug' in item &&
      'description' in item &&
      'tags' in item &&
      'authorName' in item &&
      'authorAddress' in item &&
      'gifts' in item &&
      'content' in item &&
      'createdAt' in item
    );
  };

  let blogs: IBlog[] = [];
  if (isIBlogArray(data)) {
    blogs = data;
  }
  const editItem= (data: IBlog[], id: number)=> {
    dispatch(setArticle({data: data, id: id}));
    dispatch(showSlide());
    dispatch(setType("edit_article"));
  };

  const deleteItem= (id:number)=> {
    dispatch(deleteListItem(id));
    dispatch(showToast({ message: 'Article deleted successfully', type: 'error' }));
  };

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
              <PiDotsThreeOutlineVerticalFill onClick={() => setActive(active === props.id ? -1 : props.id)} className='cursor-pointer' size={20} />
          </div>
          {
            active === props.id && (
                <div 
                    ref={dropdownRef}
                    className={`absolute ${
                        props.id >= data.length - 2 ? '-top-[80px]' : 'top-full'
                    } right-0 mt-2 w-40 bg-gray-900 rounded-lg shadow-lg z-10`}>
                    <button onClick={()=> editItem(blogs, props.id)} className='w-full rounded-tr-lg rounded-tl-lg border-b border-b-gray-800 px-5 py-4 hover:bg-blue-600 hover:text-white flex items-center text-blue-600'>
                        <BiEdit size={16} />
                        <p className='text-xs ml-2'>EDIT</p>
                    </button>
                    <button onClick={()=> deleteItem(props.id)} className='w-full rounded-br-lg rounded-bl-lg px-5 py-4 hover:bg-red-600 hover:text-white flex items-center text-red-600'>
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