import { authOptions } from "@/lib/auth";
import { connectToDataBase } from "@/lib/db"
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDataBase();
        const Videos = await Video.find({}).sort({createdAt:-1});
        if(!Videos || Videos.length === 0 ){
            return NextResponse.json([],{status:200})
        }
        return NextResponse.json(Videos);

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {error:"Failed to featch Videos"},
            {status:500}
        )
    }
}
export async function POST(request:NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if(!session) return NextResponse.json(
            {error:"Unauthorized"},
            {status:401}
        );
        await connectToDataBase();
        let body:IVideo = await request.json();
        if(
            !body.title ||
            !body.description ||
            !body.videoUrl ||
            !body.thumbnaiUrl
        ) return NextResponse.json({error:"Missing Require Fields"},{status:401});
        let videoData = {
            ...body,
            controls:body.controls ?? true,
            transformation:{
                height:1920,
                width:1080,
                quality:body?.transformation?.quality ?? 100 
            }
        }
        const newVideo = await Video.create(videoData);
        return NextResponse.json(newVideo);

    } catch (error) {
        console.log(error);
        NextResponse.json({error:"Something went Wrong",data:error},{status:401})
    }
}