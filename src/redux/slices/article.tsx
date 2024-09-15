import { IBlog } from "@/dummy_data";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StaticImageData } from "next/image";

interface IInitialState{
    articles: IBlog[];
    article: IBlog | null;
    keyWords: string[];
};

const initialState:IInitialState = {
    articles: [],
    article: null,
    keyWords: [
        "Bitcoin", "Ethereum", "Blockchain", "Cryptocurrency", "Altcoins", "Smart Contracts", 
        "DeFi", "NFTs", "Crypto Trading", "Crypto Wallets", "Stablecoins", "ICO", "Staking", 
        "Yield Farming", "Decentralized Exchanges", "Crypto Mining", "Gas Fees", "Tokenomics", 
        "Layer 2 Solutions", "DAO", "Web3", "Private Keys", "Public Keys", "Metaverse", 
        "Proof of Work", "Proof of Stake", "dApps", "ERC-20 Tokens", "Bitcoin Halving", 
        "Liquidity Pools", "Crypto Security", "Crypto Regulations", "Crypto Taxes", "Layer 1 Solutions", 
        "Decentralized Identity", "Cross-Chain Interoperability", "Oracles", "Hashing Algorithms", 
        "Zero-Knowledge Proofs", "Airdrops", "Governance Tokens", "Multi-Signature Wallets", 
        "Lightning Network", "Atomic Swaps", "Scalability", "Privacy Coins", "Forks", 
        "Layer 2 Rollups", "Gasless Transactions", "MEV", "Crypto Arbitrage", "Cold Storage", 
        "Hot Wallets", "Layered Architecture", "Consensus Mechanisms", "Decentralized Storage", 
        "Flash Loans"
    ],
}

type UpdatableBlogKeys = 'title' | 'description' | 'content' | 'image' | 'tags';
type UpdatableBlogValue = string | string[] | StaticImageData;

export const articleSlice = createSlice({
    name: "article",
    initialState: initialState,
    reducers: {
        setArticles: (state, { payload }: PayloadAction<IBlog[]>) =>{
            state.articles = payload;
        },
        setArticle: (state, { payload }: PayloadAction<{data: IBlog[], id: number}>) =>{
            const article = payload.data.find(item => item.id === payload.id);
            state.article = article || null;
        },

    }
});

export const { setArticles, setArticle } = articleSlice.actions;
export default articleSlice.reducer;