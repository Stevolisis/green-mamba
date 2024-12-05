"use client"
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { hideToast } from '@/redux/slices/toast';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Toast = () => {
    const { message, type } = useAppSelector((state) => state.toast);
    const dispatch = useAppDispatch();
    const successToastStyle= {
        border: '1px solid #00ff95',
        borderRadius: '10px',
        background: '#01140d',
        color: '#fff',
    }
    const infoToastStyle= {
        border: '1px solid dodgerblue',
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
                case "info":{
                    toast.success(message,{
                        style: infoToastStyle,
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
                dispatch(hideToast());
            }, 2500);
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

export default Toast;
