import { Blog1, Blog2, Blog3, Blog4 } from "@/assets";
import { StaticImageData } from 'next/image';

export interface IBlog{
    image: StaticImageData;
    title: string;
    slug: string;
    description: string;
    authorName: string;
    gifts: number;
    content: string;
    createdAt: number;
}
export const dummy_data: IBlog[] = [
    {
        image: Blog1,
        title: "5 Tips for Beginner Cryptocurrency Traders",
        slug: "5-Tips-for-Beginner-Cryptocurrency-Traders",
        description: "5 things to know to get started in crypto trading",
        authorName: "Steven Joseph",
        gifts: 43,
        content: "Aliquet urna dictum metus eu velit lobortis elit quam donec sociosqu blandit est praesent molestie euismod eleifend sapien augue montes commodo morbi rhoncus neque orci bibendum elementum si duis primis inceptos sit nam fusce nunc tellus",
        createdAt: 1723905599
    },
    {
        image: Blog2,
        title: "What Investors Should Know About Crypto",
        slug: "What-Investors-Should-Know-About-Crypto",
        description: "The essentials of understanding digital assets as a novel asset class",
        authorName: "Lydia Samson",
        gifts: 43,
        content: "Aliquet urna dictum metus eu velit lobortis elit quam donec sociosqu blandit est praesent molestie euismod eleifend sapien augue montes commodo morbi rhoncus neque orci bibendum elementum si duis primis inceptos sit nam fusce nunc tellus",
        createdAt: 1723906838
    },
    {
        image: Blog3,
        title: "The Next Generation Of Collectibles: Non-Fungible Tokens",
        slug: "The-Next-Generation-Of-Collectibles-Non-Fungible-Tokens",
        description: "What are NFTs and why have they become so popular so quickly?",
        authorName: "Adams Shaw",
        gifts: 43,
        content: "Aliquet urna dictum metus eu velit lobortis elit quam donec sociosqu blandit est praesent molestie euismod eleifend sapien augue montes commodo morbi rhoncus neque orci bibendum elementum si duis primis inceptos sit nam fusce nunc tellus",
        createdAt: 1723905599
    },
    {
        image: Blog4,
        title: "What Is Bitcoin Mining And Why Is It Necessary?",
        slug: "What-Is-Bitcoin-Mining-And-Why-Is-It-Necessary",
        description: "How are transaction processed and where do new coins come from?",
        authorName: "Michael Randy",
        gifts: 43,
        content: "Aliquet urna dictum metus eu velit lobortis elit quam donec sociosqu blandit est praesent molestie euismod eleifend sapien augue montes commodo morbi rhoncus neque orci bibendum elementum si duis primis inceptos sit nam fusce nunc tellus",
        createdAt: 1723905599
    },
]