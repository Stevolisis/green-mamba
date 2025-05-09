"use client";
import React, { useState } from "react";
import { FaPlus, FaUser } from "react-icons/fa";

const Menu = () => {
  const [active, setActive] = useState<boolean>(false);

  const menuItems = [
    { name: "Dashboard", icon: <FaUser className="text-[14px] text-bgPrimary" />, active: false },
    { name: "Settings", icon: <FaUser className="text-[14px] text-bgPrimary" />, active: false },
    { name: "Profile", icon: <FaUser className="text-[14px] text-bgPrimary" />, active: false },
    { name: "Messages", icon: <FaUser className="text-[14px] text-bgPrimary" />, active: false },
    { name: "Notifications", icon: <FaUser className="text-[14px] text-bgPrimary" />, active: false },
    { name: "Logout", icon: <FaUser className="text-[14px] text-bgPrimary" />, active: false },
  ];

  return (
    <>
      {/* Blur background when active */}
      <div
        className={`${
          active ? "glassMorphism !flex" : "hidden"
        } transition-all duration-300 z-[49] justify-center items-center w-full h-full fixed top-0 left-0 bg-black bg-opacity-50`}
      ></div>

      {/* Menu items container */}
      <div
        className={`fixed bottom-0 left-0 right-0 flex flex-col items-center gap-y-10 z-[52] transition-transform duration-300 ease-in-out ${
          active ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {menuItems.map((item, i) => (
          <div
            key={i}
            className={`menu-item flex flex-col justify-center items-center transform transition-transform duration-${300 + i * 100} ease-in-out ${
              active ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <button className="bg-bgSecondary text-slideUp rounded-full w-12 h-12 flex justify-center items-center mb-2">
              {item.icon}
            </button>
            <p className="text-white text-xs">{item.name}</p>
          </div>
        ))}
      </div>

      {/* Button to activate menu */}
      <button
        className="z-[52] fixed bottom-12 right-12 shadow-md shadow-gray-400 bg-bgSecondary text-slideUp rounded-full w-12 h-12 flex justify-center items-center"
        onClick={() => setActive(!active)}
      >
        <FaPlus className="text-[16px]" />
      </button>
    </>
  );
};

export default Menu;
