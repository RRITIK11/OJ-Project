import User from '@/models/user.model'
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs';
import {sendEmail} from '@/helpers/mailer';
import { UserInterface } from "@/models/user.model";
import dbConnect from '@/config/database';
import { signUpSchema, SignUpType } from '@/types/forms/signUpSchema';

dbConnect()

export async function POST(request : NextRequest){
    try{
        const reqBody : SignUpType = await request.json();

        console.log(reqBody)
        
        const {username ,firstname, lastname, email, password} = signUpSchema.parse(reqBody);
        
        const user : UserInterface | null = await User.findOne({
            $or : [{email : email}, {username : username} ]
        });
        
        if(user){
            if(user.isVerified == false){
                await User.findByIdAndDelete(user._id);
            }else{
                return NextResponse.json({error: "User already exists"}, {status: 400});
            }
        }
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        const newUser : UserInterface = new User({
            username,
            firstname,
            lastname,
            email,
            password : hashedPassword
        })
        
        const savedUser : UserInterface = await newUser.save();
        
        
        //send verification email
        await sendEmail({email, emailType: "VERIFY", username : savedUser.username});
        
        return NextResponse.json({
            message : "Verification link send to your provided email",
            success : true,
        })
        
    }catch(error: any){
        return NextResponse.json({error : error.message},{status : 500})
    }
}