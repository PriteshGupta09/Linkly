import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/model/User";
import jwt from "jsonwebtoken";

export async function POST(req) {
    const token = await req.json()

    if(!token){
        return NextResponse.json({message:'Token is not Given.'}, {status:400})
    }
    await dbConnect()
    try {

        const {email} = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET)

        const user = await User.findOne({email: email})

        if(!user){
            return NextResponse.json({message: 'Token is not Valid'}, {status:400})
        }

        return NextResponse.json({message: 'User Verrified Successfully.'}, {status:200})
    } catch (error) {
        console.log("Error Message is: ", error)
        return NextResponse.json({message: 'Token is invalid or Expired.'},{status:500})
    }

}