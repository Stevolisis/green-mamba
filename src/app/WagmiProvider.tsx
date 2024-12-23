import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "@/config/wagmiConfig";

const queryClient = new QueryClient();

createWeb3Modal({
  defaultChain: sepolia,
  wagmiConfig: wagmiConfig,
  projectId: "92f7d1a479bf40ada16cc4d7d17d33ea",
  enableAnalytics: true,
});


export function WagmiContextProvider({ children }:any) {
  return (
    <WagmiProvider config={wagmiConfig}>
      {
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      }
    </WagmiProvider>
  );
}
