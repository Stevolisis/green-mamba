import cloudinary from "@/config/cloudinary";
import Article from "@/db/Model/articleSchema";
import dbConnect from "@/db/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest,{params}:any) {  
    await dbConnect();

    try {  
        const id:string = params.id;
        const getArticle = await Article.findOne({_id:id});

        if(getArticle){
            const deleteImage= await cloudinary.uploader.destroy(getArticle.img.public_id);
            console.log("deleteImage: ",deleteImage);
            const deleteArticle = await Article.deleteOne({_id:id});
            return NextResponse.json({ data: deleteArticle, message:"success" },{ status: 200});      
        }
        return NextResponse.json({ message:"success" },{ status: 200});      

    } catch (error:any) {  
        console.log("Error. ",error.message);
        return NextResponse.json({ message: error.message },{ status:500 });  
    }  
}