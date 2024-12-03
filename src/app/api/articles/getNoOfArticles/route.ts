import dbConnect from "@/db/dbConnect";
import Article from "@/db/Model/articleSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {  
    await dbConnect();

    try {  
        const articles = await Article.countDocuments();
        return NextResponse.json({ data: articles, message:"success" },{ status: 200});  

    } catch (error:any) {  
        console.log("Error. ",error.message);
        return NextResponse.json({ message: error.message },{ status:500 });  
    }  
}