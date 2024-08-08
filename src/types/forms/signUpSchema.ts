import {z} from "zod";
import { UserSchema } from "../models/user";

// export const usernameValidation = z
//     .string()
//     .min(4,"Username must be atleast 4 characters")
//     .max(20,"Username must be no more than 20 characters")
//     .regex(/^[a-zA-Z0-9_]+$/,"Username must not contain special character")

// export const signUpSchema = z.object({
//     username : usernameValidation,
//     email : z.string().email({message : "Invalid email address"}),
//     password : z.string().min(6,{message : "password must be atleast 6 characters"}),
//     firstname : z.string().min(2,{message : "Firstname must hava atleast 2 character"}),
//     lastname : z.string().optional()
// })


export const signUpSchema = UserSchema.pick({
    username : true,
    email : true,
    password : true,
    firstname : true,
    lastname : true
}) 

export type SignUpType = z.infer<typeof signUpSchema>;