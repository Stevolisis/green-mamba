'use client'
import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { sepolia } from '@reown/appkit/networks'
import { ReactNode } from 'react'

// 1. Get projectId at https://cloud.reown.com
const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || '';

// 2. Create a metadata object
const metadata = {
  name: 'Green Mamba: Web3 Blog',
  description: 'Get all Crypto News and Update',
  url: 'https://green-mamba.vercel.app',
  icons: ['https://green-mamba.vercel.app/logo.png']
}

// 3. Create the AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [sepolia],
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

interface AppKitProviderProps {
    children: ReactNode;
}
export function AppKitProvider({children}:AppKitProviderProps) {
  return <>{children}</>
}