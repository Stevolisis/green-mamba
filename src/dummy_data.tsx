import { Blog1, Blog2, Blog3, Blog4 } from "@/assets";
import { StaticImageData } from 'next/image';

export interface IBlog{
    id: number,
    image: StaticImageData;
    title: string;
    slug: string;
    description: string;
    tags: string[],
    authorName: string;
    authorAddress: string;
    gifts: number;
    content: string;
    createdAt: number;
}

export const dummy_data: IBlog[] = [
    {
        id: 0,
        image: Blog1,
        title: "5 Tips for Beginner Cryptocurrency Traders",
        slug: "5-Tips-for-Beginner-Cryptocurrency-Traders",
        description: "5 things to know to get started in crypto trading",
        authorName: "Steven Joseph",
        authorAddress: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
        tags: ["Crypto", "Finance", "Stocks"],
        gifts: 43,
        content: "Aliquet urna dictum metus eu velit lobortis elit quam donec sociosqu blandit est praesent molestie euismod eleifend sapien augue montes commodo morbi rhoncus neque orci bibendum elementum si duis primis inceptos sit nam fusce nunc tellus",
        createdAt: 1723905599
    },
    {
        id: 1,
        image: Blog2,
        title: "What Investors Should Know About Crypto",
        slug: "What-Investors-Should-Know-About-Crypto",
        description: "The essentials of understanding digital assets as a novel asset class",
        authorName: "Lydia Samson",
        authorAddress: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
        tags: ["Finance", "Web3", "Stock Market"],
        gifts: 43,
        content: "Aliquet urna dictum metus eu velit lobortis elit quam donec sociosqu blandit est praesent molestie euismod eleifend sapien augue montes commodo morbi rhoncus neque orci bibendum elementum si duis primis inceptos sit nam fusce nunc tellus",
        createdAt: 1690896000
    },
    {
        id: 2,
        image: Blog3,
        title: "The Next Generation Of Collectibles: Non-Fungible Tokens",
        slug: "The-Next-Generation-Of-Collectibles-Non-Fungible-Tokens",
        description: "What are NFTs and why have they become so popular so quickly?",
        authorName: "Adams Shaw",
        authorAddress: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
        tags: ["Crypto", "Web3", "NFTs"],
        gifts: 43,
        content: "Aliquet urna dictum metus eu velit lobortis elit quam donec sociosqu blandit est praesent molestie euismod eleifend sapien augue montes commodo morbi rhoncus neque orci bibendum elementum si duis primis inceptos sit nam fusce nunc tellus",
        createdAt: 1723905599
    },
    {
        id: 3,
        image: Blog4,
        title: "What Is Bitcoin Mining And Why Is It Necessary?",
        slug: "What-Is-Bitcoin-Mining-And-Why-Is-It-Necessary",
        description: "How are transaction processed and where do new coins come from?",
        authorName: "Michael Randy",
        authorAddress: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
        tags: ["Bitcoin", "Blockchain", "Binance"],
        gifts: 43,
        content: "Aliquet urna dictum metus eu velit lobortis elit quam donec sociosqu blandit est praesent molestie euismod eleifend sapien augue montes commodo morbi rhoncus neque orci bibendum elementum si duis primis inceptos sit nam fusce nunc tellus",
        createdAt: 1693315200
    },
];







export interface IDummyGift {
    id: number,
    userAddress: string;
    authorAddress: string;
    articleSlug: string;
    amount: number;
    chain: string;
    createdAt: number;
};

export const dummy_gifts: IDummyGift[] = [
    {
        id: 0,
        userAddress: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
        authorAddress: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
        articleSlug: "What-Is-Bitcoin-Mining-And-Why-Is-It-Necessary",
        amount: 10,
        chain: "ETH",
        createdAt: 1690896000,  
    },
    {
        id: 1,
        userAddress: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
        authorAddress: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
        articleSlug: "What-Is-Bitcoin-Mining-And-Why-Is-It-Necessary",
        amount: 10,
        chain: "ETH",
        createdAt: 1690896000,  
    },
    {
        id: 2,
        userAddress: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
        authorAddress: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
        articleSlug: "What-Is-Bitcoin-Mining-And-Why-Is-It-Necessary",
        amount: 10,
        chain: "ETH",
        createdAt: 1723905599,  
    },
    {
        id: 3,
        userAddress: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
        authorAddress: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
        articleSlug: "What-Investors-Should-Know-About-Crypto",
        amount: 10,
        chain: "ETH",
        createdAt: 1723905599,  
    },
    {
        id: 4,
        userAddress: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
        authorAddress: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
        articleSlug: "What-Investors-Should-Know-About-Crypto",
        amount: 10,
        chain: "ETH",
        createdAt: 1723905599,  
    },
    {
        id: 5,
        userAddress: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
        authorAddress: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
        articleSlug: "5-Tips-for-Beginner-Cryptocurrency-Traders",
        amount: 10,
        chain: "ETH",
        createdAt: 1723905599,  
    },
    {
        id: 6,
        userAddress: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
        authorAddress: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
        articleSlug: "5-Tips-for-Beginner-Cryptocurrency-Traders",
        amount: 10,
        chain: "ETH",
        createdAt: 1723905599,  
    },
    {
        id: 7,
        userAddress: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
        authorAddress: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
        articleSlug: "5-Tips-for-Beginner-Cryptocurrency-Traders",
        amount: 10,
        chain: "ETH",
        createdAt: 1723905599,  
    },
    {
        id: 8,
        userAddress: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
        authorAddress: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
        articleSlug: "5-Tips-for-Beginner-Cryptocurrency-Traders",
        amount: 10,
        chain: "ETH",
        createdAt: 1692710400,  
    },
    {
        id: 9,
        userAddress: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
        authorAddress: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
        articleSlug: "5-Tips-for-Beginner-Cryptocurrency-Traders",
        amount: 10,
        chain: "ETH",
        createdAt: 1692710400,  
    },
    {
        id: 10,
        userAddress: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
        authorAddress: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
        articleSlug: "5-Tips-for-Beginner-Cryptocurrency-Traders",
        amount: 10,
        chain: "ETH",
        createdAt: 1692710400,  
    },
    {
        id: 11,
        userAddress: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
        authorAddress: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
        articleSlug: "5-Tips-for-Beginner-Cryptocurrency-Traders",
        amount: 10,
        chain: "ETH",
        createdAt: 1723905599,  
    },
    {
        id: 12,
        userAddress: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
        authorAddress: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
        articleSlug: "The-Next-Generation-Of-Collectibles-Non-Fungible-Tokens",
        amount: 10,
        chain: "ETH",
        createdAt: 1693315200,  
    },
]