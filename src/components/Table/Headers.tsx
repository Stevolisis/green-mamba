import { useAppSelector } from '@/redux/hooks';
import React from 'react'

type Props = {}

const Headers = (props: Props) => {
  const { headings, actionBtn } = useAppSelector(state => state.table);

  return (
    <thead>
        <tr className='text-gray-400 dark:text-gray-400 rounded-2xl text-sm'>
            {
              headings.map((heading, i)=>(
                <td key={i} className={`glassMorphism   
                  ${
                    i === 0 ? "py-4 px-4 rounded-s-2xl " :   
                    !actionBtn && i === headings.length - 1 ? "px-4 pl-0 rounded-r-2xl " 
                    : " pr-4 "
                  }`} >
                    { heading }
                </td>
              ))
            }
            {
              actionBtn && <td className='px-4 pl-0 rounded-r-2xl glassMorphism'></td>
            }
        </tr>
    </thead>
  )
}

export default Headers