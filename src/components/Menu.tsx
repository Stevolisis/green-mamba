"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { FaGift, FaTimes, FaUserAlt } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { MdArticle } from "react-icons/md";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { RiEditFill, RiLogoutBoxRFill } from "react-icons/ri";
import { useAppDispatch } from "@/redux/hooks";
import { setType, showSlide } from "@/redux/slices/slider";
import { showToast } from "@/redux/slices/toast";
import { setVisibility } from "@/redux/slices/notification";
import { setUserId, setWalletAddress } from "@/redux/slices/auth";

const Menu = () => {
  const [active, setActive] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  interface IMenuItems{
    name: string;
    func: ()=> void;
    icon: React.ReactNode;
    active: boolean;
  }
  const menuItems:IMenuItems[] = [
    { name: "Dashboard", func :()=>{ router.push("/dashboard"); setActive(false)}, icon: <FaUserAlt className="text-[20px] text-bgPrimary" />, active: false },
    { name: "Articles", func :()=>{ router.push("/dashboard/articles"); setActive(false)}, icon: <MdArticle className="text-[20px] text-bgPrimary" />, active: false },
    { name: "Add Article", func :()=>{ dispatch(showSlide()); dispatch(setType("add_article")); setActive(false)}, icon: <RiEditFill className="text-[20px] text-bgPrimary" />, active: false },
    { name: "Gifts", func :()=>{ router.push("/dashboard/gifts"); setActive(false)}, icon: <FaGift className="text-[20px] text-bgPrimary" />, active: false },
    { name: "Notification", func :()=>{ dispatch(setVisibility(true)); setActive(false)}, icon: <IoNotifications className="text-[20px] text-bgPrimary" />, active: false },
    { name: "Logout", func :()=>{ 
      router.push("/"); 
      dispatch(showToast({ message: 'Logged Out Successfully', type: 'success' })); 
      setActive(false); 
      // dispatch(setWalletAddress("")); 
      // dispatch(setUserId(""));
    }, 
      icon: <RiLogoutBoxRFill className="text-[20px] text-bgPrimary" />, active: false },
  ];

  return (
    <>
      <div
        className={`${
          active ? "glassMorphism !flex" : "hidden"
        } transition-all duration-300 z-[52] justify-center items-center w-full h-full fixed top-0 left-0 bg-black bg-opacity-50`}
      ></div>

      {/* Menu items container */}
      <div
        className={`fixed bottom-0 left-0 right-0 flex items-center justify-center z-[52] transition-transform duration-700 ease-in-out ${
          active ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          top: "50%", // Position the container to move from the bottom to middle
          transform: active ? "translateY(-50%)" : "translateY(100%)",
        }}
      >
        <div className="grid grid-cols-3 gap-10">
          {menuItems.map((item, i) => (
            <div
              key={i}
              className={`flex flex-col justify-center items-center transform transition-transform duration-700 ease-in-out ${
                active ? `translate-y-0 delay-${i * 300}ms` : "translate-y-full"
              }`}

            >
              <button onClick={item.func} className="bg-bgSecondary text-slideUp rounded-full w-[70px] h-[70px] flex justify-center items-center mb-2">
                {item.icon}
              </button>
              <p className="text-white text-xs font-[SatoshiRegular]">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Button to activate menu */}
      <button
        className="z-[52] fixed bottom-12 right-12 shadow-md shadow-gray-400 bg-bgSecondary text-slideUp rounded-full w-12 h-12 flex justify-center items-center"
        onClick={() => setActive(!active)}
      >
        {active ? <FaTimes  className="text-[16px]" /> : <PiDotsThreeOutlineVerticalFill   className="text-[20px]" />}
      </button>
    </>
  );
};

export default Menu;
