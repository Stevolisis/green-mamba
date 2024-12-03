import Article from "@/db/Model/articleSchema";
import dbConnect from "@/db/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{params}:any) {  
    await dbConnect();

    try {  
        const id:string = params.id;
        const getArticles = await Article.find({author:id});
        return NextResponse.json({ data: getArticles, message:"success" },{ status: 200});  

    } catch (error:any) {  
        console.log("Error. ",error.message);
        return NextResponse.json({ message: error.message },{ status:500 });  
    }  
}