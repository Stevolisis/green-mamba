import dbConnect from "@/db/dbConnect";
import { Article } from "@/db/Model";
import { NextResponse } from "next/server";

export async function GET() {  
    await dbConnect();

    try {  
        const articles = await Article.find({}).populate('author');
        return NextResponse.json({ data: articles, message:"success" },{ status: 200});  

    } catch (error:any) {  
        console.log("Error. ",error.message);
        return NextResponse.json({ message: error.message },{ status:500 });  
    }  
}