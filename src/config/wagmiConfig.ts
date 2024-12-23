import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { sepolia } from "wagmi/chains";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "92f7d1a479bf40ada16cc4d7d17d33ea";


const metadata = {
  name: "Green Mamba",
  description: "Web3 Blog",
  url: "https://green-mamba.vercel.app/",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains:any = [sepolia];
export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});
