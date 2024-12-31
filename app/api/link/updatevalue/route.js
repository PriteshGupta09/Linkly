import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/model/Post";

export async function POST(req) {
    try {
        const {ShortLink} = await req.json();
        await dbConnect();

        const post = await Post.findOne({ ShortLink });
        if (!post) {
            return NextResponse.json({ message: 'Link not found.' }, { status: 400 });
        }

        post.clicks += 1; // Increment clicks
        await post.save(); // Save updated post

        return NextResponse.json({ message: 'Click count updated successfully.' }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Internal Server Error. Try again later.' }, { status: 500 });
    }
}
