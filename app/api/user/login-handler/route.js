import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/model/User';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(request) {
    // Parse the JSON body from the incoming request
    const data = await request.json();
    const { email, password } = data;

    if (email == '' || password == '') {
        return NextResponse.json(
            { error: "Enter Values in all Fields." },
            { status: 400 }
          );
    }

    await dbConnect()

    try {
        const userData = await User.find({ email: email })
        
        if (!userData[0]) {
            return NextResponse.json(
                { message: 'User not Found. Firstly Create an Account' },
                { status: 400 }
            );
        }

        if (!userData[0].isVerified) {
            return NextResponse.json(
                { message: 'User is not Verifed.' },
                { status: 400 }
            );
        }

        const UserPassword = userData[0].password

        const VerifyPassword = bcrypt.compare(password, UserPassword)
        
        if(!VerifyPassword){
                return NextResponse.json(
                    { message: 'Password is incorrect.' },
                    { status: 400 }
                );
        }

        const UpdateUser = await User.findOneAndUpdate({email: email}, {isActive: true})

        const {isVerified, isActive} = userData[0]

        const data = {
            email: email,
            isVerified: isVerified,
        }

        const data_token = jwt.sign({ data }, process.env.NEXT_PUBLIC_JWT_SECRET, {
            expiresIn: "1d",
          });
      
          // setting cookie
      
          const serializedCookie = serialize("token", data_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 30 * 24 * 60 * 60, // 1 month in seconds
            path: "/",
            SameSite: "Strict",
          });
      
          const response = NextResponse.json(
            { message: "User Login Sucessfully" },
            { status: 200 }
          );
          response.headers.append("Set-Cookie", serializedCookie);
      
          return response;

    } catch (error) {
        console.error('Error processing POST request:', error);
        return NextResponse.json(
            { message: 'An error occurred while processing the request' },
            { status: 500 }
        );
    }
}
