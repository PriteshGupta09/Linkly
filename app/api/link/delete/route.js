import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/model/Post';
import User from '@/model/User';
import jwt from 'jsonwebtoken';

export async function POST(request) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized User.' }, { status: 400 });
    }

    // Parse the ShortLink from the request body
    const { ShortLink } = await request.json();

    await dbConnect();
    try {
        // Verify the JWT token and extract user email
        const { data } = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
        const { email } = data;

        const post = await Post.find({})

        // Find the user by email and populate the `data` array
        const user = await User.findOne({ email }).populate('data');

        if (!user) {
            return NextResponse.json({ message: 'Unauthorized User.' }, { status: 400 });
        }

        // Find the Post object with the matching ShortLink in the user's data array
        const postToRemove = user.data.find((post) => post.ShortLink == ShortLink);


        if (!postToRemove) {
            return NextResponse.json({ message: 'Link is not found.' }, { status: 400 });
        }

        // Remove the post from the user's `data` array
        user.data = user.data.filter((post) => post.ShortLink !== ShortLink);

        // Save the updated user document
        await user.save();

        // Optionally, delete the Post document from the `Post` collection if needed
        await Post.findByIdAndDelete(postToRemove._id);

        return NextResponse.json({ message: 'Successfully deleted the ShortLink' }, { status: 200 });
    } catch (error) {
        console.error('Error while processing request:', error);
        return NextResponse.json({ message: 'Internal Server Error. Try again later' }, { status: 500 });
    }
}
