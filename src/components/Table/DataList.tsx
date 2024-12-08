import React from 'react'
import DropDown from './DropDown'
import { formatDate2 } from '@/utils/fomateDate'
import { minifyAddress } from '@/utils/minifyAddress'
import { MdDelete } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { showToast } from '@/redux/slices/toast';


const DataList = () => {
    const { data, dataKeys, actionBtn } = useAppSelector(state => state.table);
    const dispatch = useAppDispatch();

    function deleteArticle(){
        dispatch(showToast({message:"Article Deleted", type:"success"}));
    }

  return (
    <tbody>
        {
            data.map((item, i)=>(
                <tr key={i}>
                    {
                        dataKeys.map((arg, j)=>(
                            <td key={j} className={`${
                                arg.autoIndex ? " text-xs text-gray-400 " :
                                arg.longText ? "  pr-3  whitespace-normal break-words min-w-[250px] " : 
                                arg.time ? " whitespace-nowrap pr-3 " : 
                                "  pr-3 "} 
                                ${j === 0 ? " pl-3 " : j === data.length- 1 ? "  pr-0 " : ""} py-4 text-sm`}
                            >
                                { 
                                    arg.autoIndex ? ((i + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })) :
                                    arg.time && item[arg.key as keyof typeof item] ? formatDate2(item[arg.key as keyof typeof item]) :
                                    // arg?.address ? minifyAddress(item[arg.key as keyof typeof item]) :
                                    arg.author ? item[arg.key as keyof typeof item]?.name :
                                    item[arg.key as keyof typeof item] 
                                }
                            </td>
                        ))
                    }
                    <td className='pl-2 py-4 pr-3 text-sm '>
                        <MdDelete onClick={()=>deleteArticle()} size={22} className="text-red-600 cursor-pointer"/>
                    </td>
                    {/* {actionBtn && <DropDown id={data[i].id} data={item} />} */}
                </tr>
            ))
        }
    </tbody>
  )
}

export default DataList