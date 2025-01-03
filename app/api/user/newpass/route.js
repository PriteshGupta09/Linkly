import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export async function POST(req) {
    const data = await req.json()
    const { Password, Confirm_Pass, token } = data

    function isPasswordValid(password) {
        const passwordRegex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        return passwordRegex.test(password);
    }

    if (!isPasswordValid(Password)) {
        return NextResponse.json(
            { error: "Enter a Secure Password between 8 and 16" },
            { status: 400 }
        );
    }

    if(Password !== Confirm_Pass){
        return NextResponse.json({ message: 'Enter the same password in both fields.' }, { status: 400 })
    }

    if (!Password || !Confirm_Pass) {
        return NextResponse.json({ message: 'Missing Values of Password.' }, { status: 400 })
    }

    if(!token){
        return NextResponse.json({ message: 'Link is expired or invalid.' }, { status: 400 })
    }

    await dbConnect()

    try {
        const { email } = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET)
        const HashPassword = await bcrypt.hash(Password, 10)

        const user = await User.findOne({email: email})

        if(!user){
            return NextResponse.json({ message: 'User not exist.' }, { status: 400 })
        }

        user.password = HashPassword
        await user.save()

        return NextResponse.json({ message: 'Password Update Successfully' }, { status: 200 })
    } catch (error) {
        console.log('Error message is: ', error)
        return NextResponse.json({ message: 'Link is expired or invalid, Try again.' }, { status: 500 })
    }

}