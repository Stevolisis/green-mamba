import dbConnect from "@/db/dbConnect";
import Author from "@/db/Model/authorSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {  
    await dbConnect();

    try {
        const body = await req.formData();

        const newAuthor= new Author({
            walletAddress: body.get("walletAddress"),
            name: body.get("name"),
            title: body.get("title"),
            description: body.get("description"),
        });
        console.log("walletAddress: ",newAuthor);

        const addAuthor = await newAuthor.save();
        return NextResponse.json({ data: addAuthor, message:"User Account Created" },{ status: 200});  
    
    } catch (error:any) {  
        console.log("Error. ",error);
        return NextResponse.json({ message: error.message },{ status:500 });  
    }  
}

