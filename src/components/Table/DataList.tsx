import { useAppSelector } from '@/redux/hooks'
import React from 'react'
import DropDown from './DropDown'
import { formatDate2 } from '@/utils/fomateDate'
import { minifyAddress } from '@/utils/minifyAddress'


const DataList = () => {
    const { data, dataKeys, actionBtn } = useAppSelector(state => state.table);


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
                                    arg.time ? formatDate2(item[arg.key as keyof typeof item]) :
                                    arg.address ? minifyAddress(item[arg.key as keyof typeof item]) :
                                    arg.author ? item[arg.key as keyof typeof item].name :
                                    item[arg.key as keyof typeof item] 
                                }
                            </td>
                        ))
                    }
                    {actionBtn && <DropDown id={data[i].id} data={item} />}
                </tr>
            ))
        }
    </tbody>
  )
}

export default DataList