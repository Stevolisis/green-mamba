"use client"
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import React, { useEffect } from 'react'
import Header from './Header';
import NotificationItem from './NotificationItem';
import { markAllAsRead, setNotification } from '@/redux/slices/notification';
import { dummy_notifications } from '@/dummy_data';



const Notification = () => {
  const { visible } = useAppSelector((state)=> state.notification);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(setNotification(dummy_notifications));
  }, []);

  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => {
        dispatch(markAllAsRead());
      }, 3000);

      return () => clearTimeout(timeout); 
    }
  }, [visible, dispatch]);

  return (
    <>          
      <div className={`transition-transform duration-300 ease-in-out 
        ${
          visible ? "transform translate-y-0" : "transform translate-y-full"
        } 
        overflow-none shadow-md border border-[#0A4B2A] !z-[52] flex flex-col justify-start items-center w-full md:w-[400px] fixed h-full md:h-[80vh] md:right-12 bottom-0 
         rounded-none md:rounded-tr-xl md:rounded-tl-xl bg-slideUp`}
      >
        <Header />
        <NotificationItem />

      </div>
    </>
  )
}

export default Notification;