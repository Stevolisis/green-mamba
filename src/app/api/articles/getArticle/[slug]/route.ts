import Article from "@/db/Model/articleSchema";
import dbConnect from "@/db/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from 'next/cache';

export async function GET(req: NextRequest,{params}:any) {  
    await dbConnect();

    try {  
        revalidatePath('/api/articles/getArticle/[slug]');
        const slug:string = params.slug;
        console.log(slug);
        const getArticle = await Article.findOne({slug:slug}).populate("author");
        return NextResponse.json({ data: getArticle, message:"success" },{ status: 200});  

    } catch (error:any) {  
        console.log("Error. ",error.message);
        return NextResponse.json({ message: error.message },{ status:500 });  
    }  
}