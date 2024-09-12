"use client"
import TableList from '@/components/Table/TableList';
import { dummy_gifts } from '@/dummy_data';
import { useAppDispatch } from '@/redux/hooks';
import { setTable, setTimeOption } from '@/redux/slices/table';
import React, { useEffect } from 'react'

type Props = {}

const page = (props: Props) => {
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(setTable({
          title: "Gifts History",
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
          // actionFunc:{
          //   edit: ()=> dispatch(deleteListItem(22)),
          //   delete: (id:number)=> dispatch(deleteListItem(id)),
          // }
        }));
      },[]);
    
  return (
    <div className='px-4 sm:px-16 py-12 pt-0 font-[SatoshiRegular]'>
        <TableList/>
    </div>
  )
}

export default page