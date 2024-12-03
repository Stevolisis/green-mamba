"use client"
import TableList from '@/components/Table/TableList';
import { dummy_data } from '@/dummy_data';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import article, { setArticles } from '@/redux/slices/article';
import { setTable } from '@/redux/slices/table';
import { showToast } from '@/redux/slices/toast';
import { api } from '@/utils/axiosConfig';
import React, { useEffect } from 'react'

type Props = {}

const page = (props: Props) => {
    const dispatch = useAppDispatch();

    async function fetchArticles(){
      try{
        const result = await api.get("/articles/getArticles");
        const data = result.data.data;
        console.log("author: ",data[0]['author.name']);
        dispatch(setTable({
          title: "Your Articles",
          timeOptions: ["1D","1M","3M","1Y","ALL"],
          currentTimeOption: "1D",
          headings: ["#", "title", "Author", "Gifts", "Date"],
          dataKeys: [
            { key:"id", autoIndex: true }, 
            { key:"title", longText:true }, 
            { key:"author", author:true },
            { key: "gifts" }, 
            { key:"createdAt", time:true }
          ],
          data: data,
          actionBtn: true
        }));
  
        console.log(result);
      }catch(err:any){
        console.log("Err: ", err);
        dispatch(showToast({message:err.response.data.message, type:"error"}));
      }
    }


    useEffect(()=>{
      fetchArticles();
    }, []);


  return (
    <div className='px-4 sm:px-16 py-12 pt-0 font-[SatoshiRegular]'>
        <TableList/>
    </div>
  )
}

export default page