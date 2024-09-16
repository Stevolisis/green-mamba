"use client"
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { hideNotification } from '@/redux/slices/notification';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Notification = () => {
  const { message, type } = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();
  const successToastStyle= {
    border: '1px solid #00ff95',
    borderRadius: '10px',
    background: '#01140d',
    color: '#fff',
}
const errorToastStyle= {
    border: '1px solid red',
    borderRadius: '10px',
    background: '#01140d',
    color: '#fff',
}

  useEffect(() => {
    if (type) {
        switch (type) {
            case "success":{
                toast.success(message,{
                    style: successToastStyle,
                });
                break;
            }   
            case "error":{
                toast.error(message,{
                    style: errorToastStyle,
                });
                break;
            }        
            default:{
                break;
            }
                
        }

        const timer = setTimeout(() => {
            dispatch(hideNotification());
        }, 3000);
        return () => clearTimeout(timer);
    }
  }, [type, dispatch]);


  return (
    <Toaster 
        position="top-center"
        reverseOrder={false}
    />
  )
};

export default Notification;
