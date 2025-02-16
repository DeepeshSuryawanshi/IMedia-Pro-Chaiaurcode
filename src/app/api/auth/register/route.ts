import { NextRequest,NextResponse } from "next/server";
import { connectToDataBase } from "@/lib/db";
import User from "@/models/User";

export async function POST(request:NextRequest,response:NextResponse) {
    try {
        const {email,password} = await request.json();
        if(!email || !password){
            return NextResponse.json(
                {error:"Email and Password are Required"},
                {status:400}
            )
        }
        await connectToDataBase();
        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json(
                {error:"User already register with this email"},
                {status:400}
            )
        }
        await User.create({
            email,
            password
        })
        return NextResponse.json(
            {message:"User register Sucessfully."},
            {status:201}
        )
    } catch (error) {
        return NextResponse.json(
            {error:"Fail to register user",data:error},
            {status:500}
        )       
    }        
}