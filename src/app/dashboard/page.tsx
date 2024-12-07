"use client"
import HighChart from '@/components/HighChart'
import { dummy_data, dummy_gifts } from '@/dummy_data'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { addChart } from '@/redux/slices/chart'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsBank2 } from 'react-icons/bs'
import { IoNotifications } from 'react-icons/io5'
import { MdArticle } from 'react-icons/md'
import TableList from '../../components/Table/TableList'
import { setTable, setTimeOption } from '@/redux/slices/table'
import { setVisibility } from '@/redux/slices/notification'
import { articleContractABI, articleContractAddress, authorContractABI, authorContractAddress } from '@/utils/contractConfig'
import { ethers } from 'ethers'
import web3modal from "web3modal";
import { showToast } from '@/redux/slices/toast'

interface IGift{
  amout: number;
  articlIndex: number;
  title: string;
  sender: string;
}
interface IUser{
  name:string;
  title:string;
  exists: boolean;
}

const page = () => {
  const dispatch = useAppDispatch();
  const { currentMonth, currentYear} = useAppSelector(state => state.charts);
  const { unReadNotifications } = useAppSelector((state)=> state.notification);
  const [ gifts, setGifts ] = useState<IGift[]>([]);
  const [ articlesCount, setArticlesCount ] = useState<number>(0);
  const [ balance, setBalance ] = useState<any>(0);
  const [ user, setUser ] = useState<IUser|null>(null);

  async function loadAuthorGifts(){
    try{
      const Web3Loader = new web3modal();
      const connection = await Web3Loader.connect();
      const provider = new ethers.BrowserProvider(connection);
      const signer = await provider.getSigner();

      // Author Contract
      const contractAddress = authorContractAddress;
      const contractABI = authorContractABI;
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contract.getAuthor(signer.address);
      console.log("zzzzzzz: ", tx[0]);
      setUser({name:tx[0],title:tx[1],exists:tx[2]});

      //Article Contract
      const contractAddress2 = articleContractAddress;
      const contractABI2 = articleContractABI;
      const contract2 = new ethers.Contract(contractAddress2, contractABI2, signer);
      const tx2 = await contract2.getAuthorGifts(signer.address);
      const tx3 = await contract2.getAllActiveArticles();

      let totalBalance = BigInt(0); 

      const tx2Length = tx2.length;
      let index = 0;
    
      while (index < tx2Length) {
        const giftAmount = ethers.toBigInt(tx2[index][0]); // Convert to BigInt
        totalBalance += giftAmount; // Add the gift amount
        console.log("hhhhh (Gift Amount):", ethers.formatEther(giftAmount)); // Debugging
        index++;
      }

      console.log("vvvvvvv: ", ethers.formatEther(totalBalance));
      console.log("rrrrrrr: ", tx3);
      setGifts(tx2);
      setBalance(ethers.formatEther(totalBalance));
      setArticlesCount(tx3.length);

    }catch(err:any){
      console.log(err);
      dispatch(showToast({ message: err.message, type: "error" }));
    }
  }

  useEffect(()=>{
    loadAuthorGifts();
  },[]);

  useEffect(()=>{
    dispatch(addChart({name:"Gifts",title:"Finance Report",data:dummy_gifts}));
    dispatch(addChart({name:"Gifters",title:"Finance Report",data:dummy_data}));
  },[dispatch, currentMonth, currentYear]);

  useEffect(()=>{
    dispatch(setTable({
      title: "Financial History",
      timeOptions: ["1D","1M","3M","1Y","ALL"],
      currentTimeOption: "1M",
      headings: ["#", "Sender", "Amount", "Blockchain", "Blog Title", "Date"],
      dataKeys: [
        { key:"id", autoIndex: true }, 
        { key:"userAddress", address:true }, 
        { key:"amount" },
        { key: "chain" }, 
        { key:"articleSlug", longText:true }, 
        { key:"createdAt", time:true }
      ],
      data: [],
      actionBtn: false,
    }));
  },[]);



  return (
    <div className="px-4 sm:px-16 py-12 font-[SatoshiRegular]">
      <div className='flex justify-between gap-3 flex-wrap sm:flex-nowrap'>

        <div className='w-full p-7 rounded-lg shadow-lg bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% flex flex-col gap-y-14'>
          <div className='flex justify-between items-center'>
            
            <div className='rounded-md p-3 glassMorphism'>
              <BsBank2 size={18} />
            </div>

            <div>
              <p className="text-sm">{!user ? "...loading" : user?.name}</p>
            </div>
          </div>

          <div className='flex justify-between items-baseline'>
            
            <div>
              <p className="text-sm mb-2">
                Balance
              </p>
              <h2 className="text-3xl font-[SatoshiBold]">
                {balance} ETH
              </h2>
            </div>

            {/* <div className='h-full'>
              <IoStatsChartSharp className='text-[50px] opacity-50' />
            </div> */}
          </div>
        </div>

        <div className='w-full p-7 rounded-lg shadow-lg glassMorphism border border-[#ffffff1a] flex flex-col gap-y-14'>
          <div className='flex justify-between items-center'>
            
            <div className='rounded-md p-3 glassMorphism'>
              <MdArticle size={18} />
            </div>

            <div>
              <Link href="/articles" className="text-sm underline text-gray-400">View all</Link>
            </div>
          </div>

          <div className='flex justify-between items-baseline'>
            
            <div>
              <p className="text-sm mb-2 text-gray-400">
                Number Of Articles
              </p>
              <h2 className="text-3xl font-[SatoshiBold]">
                {articlesCount}
              </h2>
            </div>

            {/* <div className='h-full'>
              <IoStatsChartSharp className='text-[50px] opacity-50' />
            </div> */}
          </div>
        </div>

        <div className='w-full p-7 rounded-lg shadow-lg glassMorphism border border-[#ffffff1a] flex flex-col gap-y-14'>
          <div className='flex justify-between items-center'>
            
            <div className='rounded-md p-3 glassMorphism'>
              <IoNotifications size={18} />
            </div>

            <div>
              <Link href={""} onClick={()=>dispatch(setVisibility(true))} className="text-sm underline text-gray-400">View all</Link>
            </div>
          </div>

          <div className='flex justify-between items-baseline'>
            
            <div>
              <p className="text-sm mb-2 text-gray-400">
                Recent Notification
              </p>
              <h2 className="text-3xl font-[SatoshiBold]">
                { unReadNotifications }
              </h2>
            </div>

            {/* <div className='h-full'>
              <IoStatsChartSharp className='text-[50px] opacity-50' />
            </div> */}
          </div>
        </div>
      </div>

      <HighChart name="Gifts"/>

      <TableList/>
    </div>
  )
}

export default page;