import React from 'react'
import TimeOption from './TimeOption'
import Headers from './Headers'
import DataList from './DataList'
import { useAppSelector } from '@/redux/hooks'
import { FaHistory } from 'react-icons/fa'


const TableList = () => {
  const { title, data, dataKeys } = useAppSelector(state => state.table);

  return (
    <div className='rounded-md my-7 glassMorphism border border-[#ffffff1a] p-5 pt-12 md:pt-12 sm:p-12'>
        <div>
            <h1 className='pl-2 sm:pl-0 text-2xl md:text-3xl font-[SatoshiBold]'>{ title }</h1>
        </div>

        <TimeOption/>
        
        <div className='overflow-x-auto overflow-y-hidden md:overflow-x-visible'>
            <table className='w-full font-[SatoshiRegular] border-collapse'>
                {
                  data.length > 0 
                  ?
                    <>
                      <Headers/>
                      <DataList/>
                    </>
                  : 
                  <tbody>
                    <tr>
                        <td colSpan={dataKeys.length} className='flex items-center justify-center md:mt-5 text-gray-400 gap-2 font-[SatoshiRegular]'>
                            <FaHistory />
                            <h2>No Recent History</h2>
                        </td>
                    </tr>
                  </tbody>
                }
            </table>
        </div>


    </div>
  )
}

export default TableList