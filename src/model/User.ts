import mongoose, {Schema, Document, Date} from "mongoose";

export interface User extends Document{
    username : string,
    email : string,
    password: string,
    verifyCode : string,
    verifyCodeExpiry : Date
}
