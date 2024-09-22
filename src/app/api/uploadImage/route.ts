import { pinata } from "@/utils/pinataConfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {  
    try {  
        const body = await req.formData();
        const file:File | null = body.get("file") as unknown as File;
        
        if(file){
            const uploadFile = pinata.upload.file(file);
            console.log("333 ",uploadFile);
            const url = await pinata.gateways.convert((await uploadFile).IpfsHash);
            return NextResponse.json({ data: url, message:"Image Uploaded Successfully" },{ status: 200});  

        }else{
            return NextResponse.json({ message:"File not found" },{ status: 404});  
        }
    
    } catch (error:any) {  
        console.log("Error. ",error.message);
        return NextResponse.json({ error });  
    }  
}