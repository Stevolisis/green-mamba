import Article from "@/db/Model/articleSchema";
import Author from "@/db/Model/authorSchema";
import dbConnect from "@/db/dbConnect";
import { uploadImage } from "@/utils/uploadImage";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function PATCH(req: NextRequest,{params}:any) {  
    await dbConnect();

    try {  
        const id:string = params.id;
        const body = await req.formData();
        console.log(body);
        const file:File | null = body.get("file") as unknown as File;
        const slug:FormDataEntryValue= body.get("title")!.toString();
        const slugged = slugify(slug.replace(/[^\w\s']|_/g,' ').replaceAll("'",' '));

        let newArticle:{
            title: FormDataEntryValue | null;
            slug: string;
            description: FormDataEntryValue | null;
            content: FormDataEntryValue | null;
            author: FormDataEntryValue | null;
            tags: FormDataEntryValue | null;
            gifts: number;
            img?: {
                public_id: string;
                url: string;
            };
        }={
            title: body.get("title"),
            slug: slugged,
            description: body.get("description"),
            content: body.get("content"),
            author: body.get("author"),
            tags: body.get("tags"),
            gifts: 0
        };

        if(file){
            const imgData:any = await uploadImage(file);
            newArticle.img = { public_id:imgData.public_id, url:imgData.secure_url }
        }


        const updatedArticle= await Article.updateOne({_id:id},{
            $set:newArticle
        });
        return NextResponse.json({ data: updatedArticle, message:"Article updated Successfully" },{ status: 200});  

    
    } catch (error:any) {  
        console.log("Error. ",error.message);
        return NextResponse.json({ message: error.message },{ status:500 });  
    }  
}

