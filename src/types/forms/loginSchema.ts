import {z} from "zod";
import { UserSchema } from "../models/user";


export const loginSchema = UserSchema.pick({
    username : true,
    email : true,
}).partial().extend({
    password : z.string().min(6,"Password must be at least 6 character long")
})

export type LoginType = z.infer<typeof loginSchema>;