"use client"
import TableList from '@/components/Table/TableList';
import { dummy_data } from '@/dummy_data';
import { useAppDispatch } from '@/redux/hooks';
import article from '@/redux/slices/article';
import { setTable } from '@/redux/slices/table';
import React, { useEffect } from 'react'

type Props = {}

const page = (props: Props) => {
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(setTable({
          title: "Your Articles",
          timeOptions: ["1D","1M","3M","1Y","ALL"],
          currentTimeOption: "1D",
          headings: ["#", "title", "Author", "Gifts", "Date"],
          dataKeys: [
            { key:"id", autoIndex: true }, 
            { key:"title", longText:true }, 
            { key:"authorName" },
            { key: "gifts" }, 
            { key:"createdAt", time:true }
          ],
          data: dummy_data,
          actionBtn: true
        }));
    },[article]);


  return (
    <div className='px-4 sm:px-16 py-12 pt-0 font-[SatoshiRegular]'>
        <TableList/>
    </div>
  )
}

export default page