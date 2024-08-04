import User from '@/models/user.model'
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs';
import {sendEmail, mailerInterface} from '@/helpers/mailer';
import { UserInterface } from "@/models/user.model";
import dbConnect from '@/config/database';

dbConnect()

export async function POST(request : NextRequest){
    try{
        const reqBody : UserInterface = await request.json();
        const {username ,firstname, lastname, email, password} = reqBody;
        // validation
        console.log("REQ BODY : \n",reqBody);
        
        const user  = await User.findOne({email : email});
        console.log(" USER : ", user);
        
        if(user){
            if(user.isVerified == false){
                await User.findByIdAndDelete(user.id);
                console.log("user deleted")
            }else{
                return NextResponse.json({error: "User already exists"}, {status: 400});
            }
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            firstname,
            lastname,
            email,
            password : hashedPassword
        })

        const savedUser = await newUser.save();

        console.log("Saved in database : \n",savedUser);

        //send verification email
        // await sendEmail({email, emailType: "VERIFY", userId: savedUser._id});

        return NextResponse.json({
            message : "User registered successfully",
            success : true,
            savedUser
        })


    }catch(error: any){
        return NextResponse.json({error : error.message},{status : 500})
    }
}