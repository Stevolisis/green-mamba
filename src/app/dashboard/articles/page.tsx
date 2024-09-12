"use client"
import TableList from '@/components/Table/TableList';
import { dummy_data, dummy_gifts } from '@/dummy_data';
import { useAppDispatch } from '@/redux/hooks';
import { deleteListItem, setTable, setTimeOption } from '@/redux/slices/table';
import React, { useEffect } from 'react'

type Props = {}

const page = (props: Props) => {
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(setTable({
          title: "Your Articles",
          timeOptions: ["1D","1M","3M","1Y","ALL"],
          currentTimeOption: "1D",
          timeUpdateFunc: (e)=> dispatch(setTimeOption(e)),
          headings: ["#", "title", "Author", "Gifts", "Date"],
          dataKeys: [
            { key:"id", autoIndex: true }, 
            { key:"title", longText:true }, 
            { key:"authorName" },
            { key: "gifts" }, 
            { key:"createdAt", time:true }
          ],
          data: dummy_data,
          actionBtn: true,
          actionFunc:{
            edit: ()=> dispatch(deleteListItem(22)),
            delete: (id:number)=> dispatch(deleteListItem(id)),
          }
        }));
    },[]);
    
  return (
    <div className='px-4 sm:px-16 py-12 pt-0 font-[SatoshiRegular]'>
        <TableList/>
    </div>
  )
}

export default page