import { NextResponse } from "next/server";

export async function POST(request) {
    const data = await request.json()
    const {url} = data

    const checkUrlAvailability = async (url) => {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            console.log(response)
            return { message: 'URL is correct', success: true };
        } catch {
            return { message: 'This URL not exist.', success: false };
        }
    };

    try {
        const isURLValid = await checkUrlAvailability(url)

        if (!isURLValid.success) {
            return NextResponse.json({ message: isURLValid.message }, { status: 400 })
        }

        return NextResponse.json({ message: isURLValid.message }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error, Try again later.' }, { status: 500 })
    }
}