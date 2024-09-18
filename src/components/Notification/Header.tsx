import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setVisibility } from '@/redux/slices/notification'
import React from 'react'
import { FaTimes } from 'react-icons/fa'

type Props = {}

const Header = (props: Props) => {
    const dispatch = useAppDispatch();
    const { unReadNotifications } = useAppSelector((state)=> state.notification);

  return (
    <div className=' w-full px-4 py-6 sm:py-4 flex justify-between items-center  rounded-none md:rounded-tr-xl md:rounded-tl-xl bg-bgSecondary text-bgPrimary'>
        <div>
            <h3 className='font-[SatoshiBold] text-xl sm:text-lg'>{ unReadNotifications ? `Notifications (${unReadNotifications})` : 'Notifications' } </h3>
        </div>

        <div>
            <FaTimes size={20} onClick={()=> dispatch(setVisibility(false))} className='cursor-pointer'/>
        </div>
    </div>
  )
}

export default Header