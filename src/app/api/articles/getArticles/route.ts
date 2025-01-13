import dbConnect from "@/db/dbConnect";
import { Article } from "@/db/Model";
import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache';

export async function GET() {  
    await dbConnect();

    try {  
        revalidatePath('/api/articles/getArticles');
        const articles = await Article.find({}).populate('author').sort({ createdAt: -1 });;
        return NextResponse.json({ data: articles, message:"success" },{ status: 200});  

    } catch (error:any) {  
        console.log("Error. ",error.message);
        return NextResponse.json({ message: error.message },{ status:500 });  
    }  
}