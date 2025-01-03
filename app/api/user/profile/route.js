import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/model/User';
import Post from '@/model/Post';
import jwt from "jsonwebtoken";

export async function POST(request) {
    const token = request.cookies.get('token')?.value

    if (!token) {
        return NextResponse.json({ message: 'Register or Login into your account. ' },
            { status: 400 })
    }
   await dbConnect()
    try {
        const { data } = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET)

        const email = data.email

        const UserData = await User.find({ email: email })
            .select('-password')
            .populate('data')


        if (!UserData[0]) {
            return NextResponse.json({ message: 'Unauthorised user.' },
                { status: 400 })
        }
        return NextResponse.json({ message: UserData[0] },
            { status: 200 })

    } catch (error) {
        console.error('Error processing POST request:', error);
        return NextResponse.json({ message: 'Unauthorised User.' },
            { status: 500 })
    }
}
