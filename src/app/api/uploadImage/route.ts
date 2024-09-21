import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {  
    try {  
        const body = await req.formData()
        console.log(body.get("image"))
        return NextResponse.json({ data: "Is Working", message:body },{ status: 202});  
    } catch (error) {  
        return NextResponse.json({ error });  
    }  
}