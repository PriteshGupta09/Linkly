import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/model/Post';

export async function POST(request) {

    const {ShortLink} = await request.json();
    const FinalLink = `${process.env.NEXT_PUBLIC_HOST}/${ShortLink}`

    await dbConnect();
    try {

        const post = await Post.findOne({ShortLink: FinalLink})

        if(!post){
            return NextResponse.json({ message: 'Link is not found.' }, { status: 400 });
        }

        const Link = post.OriginalLink

        post.clicks += 1
        await post.save()

        return NextResponse.json({ message: Link}, { status: 200 });
    } catch (error) {
        console.error('Error while processing request:', error);
        return NextResponse.json({ message: 'Internal Server Error. Try again later' }, { status: 500 });
    }
}
