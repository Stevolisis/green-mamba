"use client"
import { Logo } from "@/assets";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setType, showSlide } from "@/redux/slices/slider";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaWallet } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { BrowserProvider, Eip1193Provider, ethers } from "ethers";
import { setIsWalletConnected, setUserId, setWalletAddress } from "@/redux/slices/auth";
import { getWeb3Modal } from "@/config/web3ModalConfig";
import { authorContractABI, authorContractAddress } from "@/utils/contractConfig";
import { showToast } from '@/redux/slices/toast'
import { api } from "@/utils/axiosConfig";
import { useAppKit, useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";

const Header = () => {
  const [active, setActive]= useState(1);
  const { walletAddress } = useAppSelector((state)=>state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { open } = useAppKit();
  const { address, status, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155')

  async function handleClick() {
    try {
      if (!isConnected) {
        const connect = await open();
      }
    } catch (err: any) {
      console.error("Error in handleClick:", err);
      dispatch(showToast({ message: err.message, type: "error" }));
    }
  }

  useEffect(()=>{
    (async()=>{
      if(isConnected){
        try{
          if (address) {
            dispatch(setWalletAddress(address));
      
            if (!walletProvider) {
              throw new Error("Wallet provider not available.");
            }
      
            const provider = new BrowserProvider(walletProvider as Eip1193Provider);
            const signer = await provider.getSigner();
            console.log("Signer:", signer);
    
            const contract = new ethers.Contract(authorContractAddress, authorContractABI, signer);
            let tx;
    
            try {
              tx = await contract.getAuthor(address);
            } catch (err) {
              console.error("Error calling getAuthor:", err);
            }
            console.log("getAuthor result:", tx);
      
            if (!tx) {
              dispatch(showSlide());
              dispatch(setType("complete_profile"));
            } else {
              try {
                const { data }: any = await api.get(`/authors/getAuthor/${address}`);
                console.log("API data:", data);
      
                if (!data?.data) {
                  dispatch(showSlide());
                  dispatch(setType("complete_profile"));
                  return;
                }
                dispatch(setUserId(data.data._id));
                dispatch(showToast({ message: "User Data Fetched", type: "success" }));
              } catch (err) {
                console.error("Error fetching user data from API:", err);
              }
            }
          }
        }catch (err: any) {
          console.error("Error in handleClick:", err);
          dispatch(showToast({ message: err.message, type: "error" }));
        }
      }
    })();
  },[isConnected]);

  useEffect(()=>{
    dispatch(setIsWalletConnected(isConnected));
  },[isConnected]);

  console.log("Address: ", address);
  console.log("CaipAddress: ", status);
  console.log("isConnected: ", isConnected);
  
  return (
    <header className="blurMorphism z-50 flex justify-between items-center border-gradient w-full py-7 px-4 sm:px-16 fixed">
      <Link href="/" className="font-[SatoshiMedium] flex items-center gap-x-2 sm:gap-x-3">
        <Image
          src={Logo}
          alt="Logo"
          width={30}
          height={30}
        />
        <h1 className="text-base sm:text-lg text-white dark:text-white"> GREEN <span>MAMBA</span> </h1>
      </Link>

      <div className="font-[SatoshiLight] hidden gap-8 text-sm md:flex">
        <Link href="/" className={`-mb-[1.5px] transition-colors ease-in hover:text-bgSecondary ${ active === 1 && "text-bgSecondary"}`} onClick={()=>setActive(1)}>Blog</Link>
        <Link href="/" className={`-mb-[1.5px] transition-colors ease-in hover:text-bgSecondary ${ active === 2 && "text-bgSecondary"}`} onClick={()=>setActive(2)}>Product</Link>
        <Link href="/" className={`-mb-[1.5px] transition-colors ease-in hover:text-bgSecondary ${ active === 3 && "text-bgSecondary"}`} onClick={()=>setActive(3)}>NFT</Link>
        <Link href="/" className={`-mb-[1.5px] transition-colors ease-in hover:text-bgSecondary ${ active === 4 && "text-bgSecondary"}`} onClick={()=>setActive(4)}>Resources</Link>
        <Link href="/" className={`-mb-[1.5px] transition-colors ease-in hover:text-bgSecondary ${ active === 5 && "text-bgSecondary"}`} onClick={()=>setActive(5)}>Contact</Link>
      </div>

      <div className="font-[SatoshiMedium] pl-3">
            <button
              onClick={() => handleClick()}
              className="flex gap-2 items-center text-sm py-2 px-4 bg-bgSecondary rounded-[4px] hover:bg-emerald-400 transition-colors ease-in">
              <FaWallet className="text-lg" />
              {
                isConnected ? 
                walletAddress && (walletAddress.slice(0, 6) + "..." + walletAddress.slice(-5)) :
                <p className="border-l border-l-bgPrimary pl-2 text-bgPrimary dark:text-bgPrimary">Connect Wallet</p>
              }
            </button>

      </div>

    </header>
  )
}

export default Header