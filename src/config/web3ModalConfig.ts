import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

export const getWeb3Modal = () => {
    return new Web3Modal({
        cacheProvider: true,
        theme: "dark",
        providerOptions: {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId: "92f7d1a479bf40ada16cc4d7d17d33ea",
                },
            },
        },
    });
};
