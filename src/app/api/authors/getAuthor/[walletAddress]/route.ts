import Author from "@/db/Model/authorSchema";
import dbConnect from "@/db/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{params}:any) {  
    await dbConnect();

    try {  
        const walletAddress:string = params.walletAddress;
        const getAuthor = await Author.findOne({walletAddress:walletAddress});
        console.log(getAuthor);

        return NextResponse.json({ data: getAuthor, message:"success" },{ status: 200});  

    } catch (error:any) {  
        console.log("Error. ",error.message);
        return NextResponse.json({ message: error.message },{ status:500 });  
    }  
}