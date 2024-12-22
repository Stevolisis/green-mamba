"use client"
import React, { useEffect, useRef, useState } from 'react'
import GiftDataList from '@/components/Table/GiftDataList';
import TableList from '@/components/Table/TableList';
import { useAppDispatch } from '@/redux/hooks';
import { setTable } from '@/redux/slices/table';
import { articleContractABI, articleContractAddress } from '@/utils/contractConfig';
import { ethers } from 'ethers';
import web3modal from "web3modal";
import { showToast } from '@/redux/slices/toast';
import Loader from '@/components/Loader';
import { getWeb3Modal } from '@/config/web3ModalConfig';

type Props = {}

const page = (props: Props) => {
  const [ gifts, setGifts ] = useState<any[] | null>(null);
  const onceTriggeredOnLoad = useRef<number>(0)
  const dispatch = useAppDispatch();

  async function loadAuthorGifts(){
    try{
      const web3Modal = getWeb3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(connection);
      const signer = await provider.getSigner();

      //Article Contract
      const contractAddress2 = articleContractAddress;
      const contractABI2 = articleContractABI;
      const contract2 = new ethers.Contract(contractAddress2, contractABI2, signer);
      const tx2 = await contract2.getAuthorGifts(signer.address);

      let totalBalance = BigInt(0);

      const tx2Length = tx2.length;
      let index = 0;
    
      while (index < tx2Length) {
        const giftAmount = ethers.toBigInt(tx2[index][0]); // Convert to BigInt
        totalBalance += giftAmount; // Add the gift amount
        index++;
      }

      setGifts(tx2);

    }catch(err:any){
      console.log(err);
      dispatch(showToast({ message: err.message, type: "error" }));
    }
  }

  useEffect(()=>{
    if(onceTriggeredOnLoad.current === 0){
      loadAuthorGifts();
      onceTriggeredOnLoad.current = 1;
      console.log("HIIIIIIIIIIIIIIIIII");
    }
  },[]);

  useEffect(()=>{
      dispatch(setTable({
        title: "Gifts History",
        timeOptions: ["1D","1M","3M","1Y","ALL"],
        currentTimeOption: "1M",
        headings: ["#", "Sender", "Amount", "Blockchain", "Blog Title"],
        dataKeys: [
          { key:"id", autoIndex: true }, 
          { key:"userAddress", address:true }, 
          { key:"amount" },
          { key: "chain" }, 
          { key:"articleSlug", longText:true }, 
          { key:"createdAt", time:true }
        ],
        data: [''],
        actionBtn: false,
      }));
    },[]);
    
  return (
    <div className='px-4 sm:px-16 py-12 pt-0 font-[SatoshiRegular]'>
      <TableList>
        {!gifts ? 
          <div className='pl-3 py-4'>
            <Loader size={16} color="#00ff95" />
          </div> 
        : <GiftDataList data={gifts} />}
      </TableList>
    </div>
  )
}

export default page