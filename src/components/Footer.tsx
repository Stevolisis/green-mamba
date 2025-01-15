import React from 'react'
import Image from 'next/image';
import { Logo } from '@/assets';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className='flex flex-col md:flex-row flex-wrap md:flex-nowrap sm:justify-between py-24 md:py-32 px-4 md:px-16 bg-gradient-to-r from-grGreen to-grBlue'>
      <div className='pb-7 flex-1 md:pb-0'>
        
        <div>
          <div className="font-[SatoshiMedium] flex items-center gap-x-3">
            <Image
              src={Logo}
              alt="Logo"
              width={30}
              height={30}
            />
            <h1 className="text-lg text-white dark:text-white"> GREEN <span>MAMBA</span> </h1>
          </div>
          <div className='py-3'>
            <p className='font-[SatoshiLight] text-sm text-white dark:text-white'>Revolutionary Approach to Wealth Creation</p>
          </div>
        </div>

        <div className=''>
          <div className='pt-6 pb-4'>
            <h3 className='font-[SatoshiBold] text-white dark:text-white'>Stay Informed</h3>
          </div>

          <div className='flex gap-6'>
            <Link href="/" className='text-[10px] text-white dark:text-white rounded-full p-2 border border-white dark:border-white hover:bg-bgSecondary hover:text-bgPrimary'>
              <FaFacebookF />
            </Link>
            <Link href="/" className='text-[10px] text-white dark:text-white rounded-full p-2 border border-white dark:border-white hover:bg-bgSecondary hover:text-bgPrimary'>
              <FaTwitter />
            </Link>
            <Link href="/" className='text-[10px] text-white dark:text-white rounded-full p-2 border border-white dark:border-white hover:bg-bgSecondary hover:text-bgPrimary'>
              <FaInstagram  />
            </Link>
            <Link href="/" className='text-[10px] text-white dark:text-white rounded-full p-2 border border-white dark:border-white hover:bg-bgSecondary hover:text-bgPrimary'>
              <FaLinkedinIn />
            </Link>

          </div>
        </div>

      </div>

      <div className='flex-1 flex justify-between items-center gap-4 md:gap-0 '>
          
        <div className='py-7 md:py-0'>
          <div className='pb-6'>
            <h3 className='font-[SatoshiBold]'>Products</h3>
          </div>
          <div className='flex flex-col gap-y-4'>
            <Link href="/" className='font-[SatoshiLight] text-sm transition-colors ease-in hover:text-bgPrimary'>NFT</Link>
            <Link href="/" className='font-[SatoshiLight] text-sm transition-colors ease-in hover:text-bgPrimary'>Resources</Link>
            <Link href="/" className='font-[SatoshiLight] text-sm transition-colors ease-in hover:text-bgPrimary'>Trade</Link>
          </div>
        </div>

        <div className='py-7 md:py-0'>
          <div className='pb-6'>
            <h3 className='font-[SatoshiBold]'>Support</h3>
          </div>
          <div className='flex flex-col gap-y-4'>
            <Link href="/" className='font-[SatoshiLight] text-sm transition-colors ease-in hover:text-bgPrimary'>Help Center</Link>
            <Link href="/" className='font-[SatoshiLight] text-sm transition-colors ease-in hover:text-bgPrimary'>Trading fees</Link>
            <Link href="/" className='font-[SatoshiLight] text-sm transition-colors ease-in hover:text-bgPrimary'>Contact Us</Link>
          </div>
        </div>

        <div className='py-7 md:py-0'>
          <div className='pb-6'>
            <h3 className='font-[SatoshiBold]'>Legal</h3>
          </div>
          <div className='flex flex-col gap-y-4'>
            <Link href="/" className='font-[SatoshiLight] text-sm transition-colors ease-in hover:text-bgPrimary'>Privacy Policy</Link>
            <Link href="/" className='font-[SatoshiLight] text-sm transition-colors ease-in hover:text-bgPrimary'>Terms Of Service</Link>
            <Link href="/" className='font-[SatoshiLight] text-sm transition-colors ease-in hover:text-bgPrimary'>Wallet Agreements</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer