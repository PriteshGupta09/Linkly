import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/model/User';
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export async function POST(request) {
    // Parse the JSON body from the incoming request
    const data = await request.json();
    const { email, password, confPass } = data;

    if (email == '' || password == '' || confPass == '') {
        return NextResponse.json(
            { error: "Enter Values in all Fields." },
            { status: 400 }
          );
    }

    if (password !== confPass) {
        return NextResponse.json(
            { error: "Enter same Enter in both fields." },
            { status: 400 }
          );
    }

    function isPasswordValid(password) {
        const passwordRegex =
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        return passwordRegex.test(password);
      }
    
      if (!isPasswordValid(password)) {
        return NextResponse.json(
          { error: "Enter a Secure Password between 8 and 16" },
          { status: 400 }
        );
      }

    const HashPassword = await bcrypt.hash(password, 10)

    await dbConnect()
    try {

        const userData = await User.find({ email })
        
        if (userData[0] && userData[0].isVerified) {
            return NextResponse.json(
                { message: 'User is already Created' },
                { status: 400 }
            );
        }

        if (userData[0] && !userData[0].isVerified) {
            const UpdateUserPassword = await User.findOneAndUpdate({email: email}, {password: HashPassword})

            await SendGmail()

            return NextResponse.json(
                { message: 'Email Sent Sucessfully.' },
                { status: 200 }
            );
        }

        const CreateUser = await User.create({
            email: email,
            password: HashPassword,
            isVerified: false,
        })

        async function SendGmail() {
            const token = jwt.sign({ email }, process.env.NEXT_PUBLIC_JWT_SECRET, {
                expiresIn: "5m",
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
                subject: "Your Verification Link",
                html: `
            <p>Click the link below to verify your email:</p>
            <a href="${process.env.NEXT_PUBLIC_HOST}/verify?token=${token}">Verify Email</a>
          `,
            };

            // Send the email
            await transporter.sendMail(mailOptions);
        
        }

        await SendGmail()

        return NextResponse.json(
            { message: 'Email Sent Successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error processing POST request:', error);
        return NextResponse.json(
            { message: 'An error occurred while processing the request' },
            { status: 500 }
        );
    }
}
