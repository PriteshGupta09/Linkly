import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/model/Post';
import jwt from 'jsonwebtoken';
import User from '@/model/User';

export async function POST(request) {
    const token = request.cookies.get('token')?.value
    // Parse the JSON body from the incoming request
    const data = await request.json();
    const { OriginalLink, ShortLink, ORCode, clicks } = data;
    if(OriginalLink == '' || ShortLink == '' || ORCode == ''){
        return NextResponse.json({message: 'Their is an Error while Processing Link. Try again Later.'}, {status: 400})
    }

    await dbConnect()

    try {
        const PostData = await Post.create({
            ShortLink: ShortLink,
            OriginalLink: OriginalLink,
            ORcode: ORCode,
            clicks: clicks,
        })

        const { data } = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET)

        const email = data.email

        const UserData = await User.find({ email: email })
        .select('-password')

        const ID = UserData[0]._id

        const UpdatedData = await User.findOneAndUpdate({_id: ID},{$push: { data: PostData}})

        return NextResponse.json({message: 'Successfully Short Link Generated'}, {status: 200})
    } catch (error) {
        console.error('Error while submiting request:', error)
        return NextResponse.json({message: 'Internal Sevrer Error. Try again Later'}, {status: 500})
    }
}
