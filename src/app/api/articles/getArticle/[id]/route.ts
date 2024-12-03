import Article from "@/db/Model/articleSchema";
import dbConnect from "@/db/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{params}:any) {  
    await dbConnect();

    try {  
        const id:string = params.id;
        console.log(id);
        const getArticle = await Article.findOne({_id:id}).populate("author");
        return NextResponse.json({ data: getArticle, message:"success" },{ status: 200});  

    } catch (error:any) {  
        console.log("Error. ",error.message);
        return NextResponse.json({ message: error.message },{ status:500 });  
    }  
}