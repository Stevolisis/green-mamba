import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {  
    try {  
        const body = req.json();
        return NextResponse.json({ data: "Is Working", message:"Yo Fam" },{ status: 202});  
    } catch (error) {  
        return NextResponse.json({ error });  
    }  
}