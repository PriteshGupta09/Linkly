import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/model/User';
import jwt from "jsonwebtoken";

export async function POST(request) {
    const token  = await request.json()
    if (!token) {
        return NextResponse.json(
            { message: 'Link is invalid or Expired.' },
            { status: 400 }
        );
    }
    await dbConnect()
    try {
        const {email} = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET)

        const VerifyUser = await User.findOneAndUpdate({ email: email }, { isVerified: true })
        
        if(!VerifyUser){
            return NextResponse.json(
                { message: 'User Not exist.' },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { message: 'User Verified Sucessfully.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error processing POST request:', error);
        return NextResponse.json(
            { message: 'Link is invalid or expired, Try again.' },
            { status: 500 }
        );
    }
}
