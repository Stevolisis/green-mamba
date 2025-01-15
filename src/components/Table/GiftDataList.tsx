import React from 'react'
import { useAppSelector } from '@/redux/hooks';
import { ethers } from 'ethers';


const GiftDataList = ({data}:any) => {
    const { dataKeys, actionBtn } = useAppSelector(state => state.table);
    console.log("data: ", data);

  return (
    <tbody>
        {
            data.map((item:any, i:number)=>{
                console.log("item: ", item);
                return  <tr key={i}>
                            <td className='pl-3 py-4 text-sm text-gray-400 dark:text-gray-100'>
                                {i + 1}
                            </td>
                            <td className='pr-3 py-4 text-sm text-gray-400 dark:text-gray-100'>
                                {item[3]}
                            </td>
                            <td  className='pr-3 py-4 text-sm text-gray-400 dark:text-gray-100'>
                                {ethers.formatEther(item[0])}
                            </td>
                            <td  className='pr-3 py-4 text-sm text-gray-400 dark:text-gray-100'>
                                ETH
                            </td>
                            <td className='whitespace-nowrap pr-3 py-4 text-sm  text-gray-400 dark:text-gray-100'>
                                {item[2]}
                            </td>
                        </tr>

            })
        }
    </tbody>
  )
}

export default GiftDataList