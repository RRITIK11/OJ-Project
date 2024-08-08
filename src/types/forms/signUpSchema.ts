import {z} from "zod";
import { UserSchema } from "../models/user";

export const signUpSchema = UserSchema.pick({
    username : true,
    email : true,
    password : true,
    firstname : true,
    lastname : true
}) 

export type SignUpType = z.infer<typeof signUpSchema>;