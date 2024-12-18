import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export async function POST(request, response) {

    try {
        const cookieStore = await cookies()
        cookieStore.delete('token')
        return NextResponse.json({ message: 'Logout Sucessfully' },
            { status: 200 })
    }
    catch (error) {
        console.error('Error processing POST request:', error);
        return NextResponse.json( { message: 'Internal Server Errorw' },
            { status: 500 })
    }

}
