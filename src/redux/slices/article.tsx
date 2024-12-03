import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StaticImageData } from "next/image";

export interface IBlogApi{
    _id: string,
    img: {public_id:string,url:string};
    title: string;
    slug: string;
    description: string;
    tags: string[],
    author: any;
    gifts: number;
    content: string;
    [key: string]: any;
}
interface IInitialState{
    articles: IBlogApi[];
    article: IBlogApi | null;
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


export const articleSlice = createSlice({
    name: "article",
    initialState: initialState,
    reducers: {
        setArticles: (state, { payload }: PayloadAction<IBlogApi[]>) =>{
            state.articles = payload;
        },
        setArticle: (state, { payload }: PayloadAction<IBlogApi>) =>{
            state.article = payload ;
        },

    }
});

export const { setArticles, setArticle } = articleSlice.actions;
export default articleSlice.reducer;