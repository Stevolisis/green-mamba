"use client"
import { Logo } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaWallet } from "react-icons/fa";

type Props = {}
console.log("Image: ", Image)
const Header = (props: Props) => {
  const [active, setActive]= useState(1);
  
  return (
    <header className="blurMorphism z-50 flex justify-between items-center border-gradient w-full py-7 px-16 fixed">
      <div className="font-[SatoshiMedium] flex items-center gap-x-3">
        <Image
          src={Logo}
          alt="Logo"
          width={30}
          height={30}
        />
        <h1 className="text-lg"> GREEN <span>MAMBA</span> </h1>
      </div>

      <div className="font-[SatoshiLight] flex gap-8 text-sm">
        <Link href="/" className={`-mb-[1.5px] transition-colors ease-in hover:text-bgSecondary ${ active === 1 && "text-bgSecondary"}`} onClick={()=>setActive(1)}>Blog</Link>
        <Link href="/" className={`-mb-[1.5px] transition-colors ease-in hover:text-bgSecondary ${ active === 2 && "text-bgSecondary"}`} onClick={()=>setActive(2)}>Product</Link>
        <Link href="/" className={`-mb-[1.5px] transition-colors ease-in hover:text-bgSecondary ${ active === 3 && "text-bgSecondary"}`} onClick={()=>setActive(3)}>NFT</Link>
        <Link href="/" className={`-mb-[1.5px] transition-colors ease-in hover:text-bgSecondary ${ active === 4 && "text-bgSecondary"}`} onClick={()=>setActive(4)}>Resources</Link>
        <Link href="/" className={`-mb-[1.5px] transition-colors ease-in hover:text-bgSecondary ${ active === 5 && "text-bgSecondary"}`} onClick={()=>setActive(5)}>Contact</Link>
      </div>

      <div className="font-[SatoshiMedium]">
        <button className="flex gap-2 items-center text-sm text-bgPrimary py-2 px-4 bg-bgSecondary rounded-[4px]">
          <FaWallet  className="text-lg" />
          <p className="border-l border-l-bgPrimary pl-2">Connect Wallet</p>
        </button>
      </div>
    </header>
  )
}

export default Header