"use client"
import { Logo } from "@/assets";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setType, showSlide } from "@/redux/slices/slider";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaWallet } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { ethers } from "ethers";
import { setUserId, setWalletAddress } from "@/redux/slices/auth";
import { getWeb3Modal } from "@/config/web3ModalConfig";
import { authorContractABI, authorContractAddress } from "@/utils/contractConfig";
import { showToast } from '@/redux/slices/toast'
import { api } from "@/utils/axiosConfig";

const Header = () => {
  const [active, setActive]= useState(1);
  const { walletAddress, userId } = useAppSelector((state)=>state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  // const { open } = useWeb3Modal();
  
  async function handleClick() {
    if (walletAddress && userId) {
        return router.push("/dashboard");
    }

    try{
      // Connect Wallet Logic
      const web3Modal = getWeb3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(connection);
      const signer = await provider.getSigner();
      console.log("tx: ", signer);

      if(signer.address){
        dispatch(setWalletAddress(signer.address));

        const contractAddress = authorContractAddress;
        const contractABI = authorContractABI;
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        let tx;

        try {
            tx = await contract.getAuthor(signer.address);
        } catch (err) {
            console.error("Error calling getAuthor:", err);
            // throw new Error("Unable to fetch author details.");
        }
        console.log("getAuthor result:", tx);

        if(!tx){
          // if (!userId) {
              dispatch(showSlide());
              dispatch(setType("complete_profile"));
          // }
        }else{
          try{
            const {data}:any = await api.get(`/authors/getAuthor/${signer.address}`);
            console.log("data: ", data);
            dispatch(setUserId(data.data._id));
            dispatch(showToast({ message: "User Data Fetched", type: "success" }));
          }catch(err){
            console.error("Error calling getAuthor:", err);
          }
        }
        //fetch author from api and set redux auths
      }
      console.log("Wallet Connected:", signer.address);

    }catch(err:any){
      console.log(err);
      dispatch(showToast({ message: err.message, type: "error" }));
    }

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
          walletAddress ? (
            userId ? (
              // If walletAddress and userId exist, show button to navigate to Dashboard
              <button
                onClick={() => router.push("/dashboard")}
                className="flex gap-2 items-center text-sm text-bgPrimary py-2 px-4 bg-bgSecondary rounded-[4px] hover:bg-emerald-400 transition-colors ease-in"
              >
                <FaWallet className="text-lg" />
                <p className="border-l border-l-bgPrimary pl-2">
                  {walletAddress.slice(0, 6) + "..." + walletAddress.slice(-5)}
                </p>
              </button>
            ) : (
              // If walletAddress exists but userId does not, show Complete Profile flow
              <button
                onClick={() => handleClick()}
                className="flex gap-2 items-center text-sm text-bgPrimary py-2 px-4 bg-bgSecondary rounded-[4px] hover:bg-emerald-400 transition-colors ease-in"
              >
                <FaWallet className="text-lg" />
                <p className="border-l border-l-bgPrimary pl-2">
                  {walletAddress.slice(0, 6) + "..." + walletAddress.slice(-5)}
                </p>
              </button>
            )
          ) : (
            // If no walletAddress, show Connect Wallet button
            <button
              onClick={() => handleClick()}
              className="flex gap-2 items-center text-sm text-bgPrimary py-2 px-4 bg-bgSecondary rounded-[4px] hover:bg-emerald-400 transition-colors ease-in"
            >
              <FaWallet className="text-lg" />
              <p className="border-l border-l-bgPrimary pl-2">Connect Wallet</p>
            </button>
          )
        }
      </div>

    </header>
  )
}

export default Header