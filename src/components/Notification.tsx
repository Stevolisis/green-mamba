import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { hideNotification } from '@/redux/slices/notification';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Notification = () => {
  const { message, type, visible } = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (visible) {
        switch (type) {
            case "success":{
                toast.success(message);
                break;
            }   
            case "error":{
                toast.error(message);
                break;
            }        
            default:{
                break;
            }
                
        }
    }
  }, [visible, dispatch]);

  if (!visible) return null;

  return (
    <Toaster 
        position="bottom-center"
        reverseOrder={false}
    />
  )
};

export default Notification;
