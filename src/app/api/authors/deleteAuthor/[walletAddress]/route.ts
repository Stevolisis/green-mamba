import Author from "@/db/Model/authorSchema";
import dbConnect from "@/db/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest,{params}:any) {  
    await dbConnect();

    try {  
        const walletAddress:string = params.walletAddress;
        const deleteAuthor = await Author.deleteOne({walletAddress:walletAddress});
        return NextResponse.json({ data: deleteAuthor, message:"success" },{ status: 200});      

    } catch (error:any) {  
        console.log("Error. ",error.message);
        return NextResponse.json({ message: error.message },{ status:500 });  
    }  
}