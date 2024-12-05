"use client"
import { Logo } from "@/assets";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setType, showSlide } from "@/redux/slices/slider";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaWallet } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import web3modal from "web3modal";
import { ethers } from "ethers";
import { setWalletAddress } from "@/redux/slices/auth";

const Header = () => {
  const [active, setActive]= useState(1);
  const { walletAddress, userId } = useAppSelector((state)=>state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  async function handleClick(){
    if(walletAddress && userId){
      return router.push("/dashboard");
    }

    const Web3Loader = new web3modal();
    const connection = await Web3Loader.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    dispatch(showSlide());
    dispatch(setWalletAddress(signer.address));
    dispatch(setType("complete_profile"));
    console.log("eeeeeeeeeeeeeeeee: ", signer);
  }

  
  return (
    <header className="blurMorphism z-50 flex justify-between items-center border-gradient w-full py-7 px-4 sm:px-16 fixed">
      <Link href="/" className="font-[SatoshiMedium] flex items-center gap-x-2 sm:gap-x-3">
        <Image
          src={Logo}
          alt="Logo"
          width={30}
          height={30}
        />
        <h1 className="text-base sm:text-lg"> GREEN <span>MAMBA</span> </h1>
      </Link>

      <div className="font-[SatoshiLight] hidden gap-8 text-sm md:flex">
        <Link href="/" className={`-mb-[1.5px] transition-colors ease-in hover:text-bgSecondary ${ active === 1 && "text-bgSecondary"}`} onClick={()=>setActive(1)}>Blog</Link>
        <Link href="/" className={`-mb-[1.5px] transition-colors ease-in hover:text-bgSecondary ${ active === 2 && "text-bgSecondary"}`} onClick={()=>setActive(2)}>Product</Link>
        <Link href="/" className={`-mb-[1.5px] transition-colors ease-in hover:text-bgSecondary ${ active === 3 && "text-bgSecondary"}`} onClick={()=>setActive(3)}>NFT</Link>
        <Link href="/" className={`-mb-[1.5px] transition-colors ease-in hover:text-bgSecondary ${ active === 4 && "text-bgSecondary"}`} onClick={()=>setActive(4)}>Resources</Link>
        <Link href="/" className={`-mb-[1.5px] transition-colors ease-in hover:text-bgSecondary ${ active === 5 && "text-bgSecondary"}`} onClick={()=>setActive(5)}>Contact</Link>
      </div>

      <div className="font-[SatoshiMedium] pl-3">
        {
          walletAddress ? 
            <button onClick={()=> handleClick()} className="flex gap-2 items-center text-sm text-bgPrimary py-2 px-4 bg-bgSecondary rounded-[4px] hover:bg-emerald-400 transition-colors ease-in">
              <FaWallet className="text-lg" />
              <p className="border-l border-l-bgPrimary pl-2">{walletAddress ? walletAddress.slice(0, 6) + "..." + walletAddress.slice(-5) : "Connect Wallet"}</p>
            </button>
          :
            <button onClick={()=> handleClick()} className="flex gap-2 items-center text-sm text-bgPrimary py-2 px-4 bg-bgSecondary rounded-[4px] hover:bg-emerald-400 transition-colors ease-in">
              <FaWallet className="text-lg" />
              <p className="border-l border-l-bgPrimary pl-2">Connect Wallet</p>
            </button>
        }
      </div>
    </header>
  )
}

export default Header