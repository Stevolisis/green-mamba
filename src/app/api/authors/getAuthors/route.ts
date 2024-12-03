import dbConnect from "@/db/dbConnect";
import Author from "@/db/Model/authorSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{params}:any) {  
    await dbConnect();

    try {  
        const authors = await Author.find();
        return NextResponse.json({ data: authors, message:"success" },{ status: 200});  

    } catch (error:any) {  
        console.log("Error. ",error.message);
        return NextResponse.json({ message: error.message },{ status:500 });  
    }  
}