import Article from "@/db/Model/articleSchema";
import dbConnect from "@/db/dbConnect";
import { uploadImage } from "@/utils/uploadImage";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req: NextRequest) {  
    await dbConnect();
    const body = await req.formData();

    try {  
        const file:File | null = body.get("file") as unknown as File;

        if(file && body.get("title")){
            // let imgData:any = await uploadImage(file);
            const slug:FormDataEntryValue= body.get("title")!.toString();
            const slugged = slugify(slug.replace(/[^\w\s']|_/g,' ').replaceAll("'",' '));
            const tags = JSON.parse(body.get("tags") as string);

            const newArticle= new Article({
                title: body.get("title"),
                slug: slugged,
                description: body.get("description"),
                img:{ public_id:"imgData.public_id", url:"imgData.secure_url" },
                content: body.get("content"),
                author: body.get("author"),
                tags: tags,
                gifts: 0
            });

            const addArticle= await newArticle.save();
            return NextResponse.json({ data: addArticle, message:"Article posted Successfully" },{ status: 200});  

        }else{
            return NextResponse.json({ message:"File or Title not found" },{ status: 404});  
        }
    
    } catch (error:any) {  
        console.log("Error. ",error);
        return NextResponse.json({ message: error, data:[body.get("title"),body.get("description"),body.get("file")] },{ status:500 });  
    }  
}

