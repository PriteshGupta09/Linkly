import { NextResponse } from "next/server";
import User from "@/model/User";
import dbConnect from "@/lib/mongodb";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export async function POST(req) {
    const email = await req.json()

    await dbConnect()

    try {

        const user = await User.findOne({ email: email })

        if (!user || !user.isVerified) {
            return NextResponse.json({ message: 'User not Found or User is not Verified' }, { status: 400 })
        }

        async function SendGmail() {
            const token = jwt.sign({ email }, process.env.NEXT_PUBLIC_JWT_SECRET, {
                expiresIn: "10m",
            });

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PASS,
                },
            });
            // Email options
            const mailOptions = {
                from: process.env.GMAIL_USER,
                to: email,
                subject: "Forgot Password Link",
                html: `
                    <p>Click the link below to Create New Password:</p>
                    <a href="${process.env.NEXT_PUBLIC_HOST}/forgot-password?token=${token}">New Password</a>
                  `,
            };

            // Send the email
            await transporter.sendMail(mailOptions);

        }

        await SendGmail()

        return NextResponse.json({ message: 'Email Sent Successfully' }, { status: 200 })
    } catch (error) {
        console.log('Error Message is: ', error)
        return NextResponse.json({ message: 'Internal Server Error.' }, { status: 500 })
    }

}