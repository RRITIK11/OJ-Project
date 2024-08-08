import {z} from 'zod';

export const usernameValidation = z
    .string()
    .min(4,"Username must be atleast 4 characters")
    .max(20,"Username must be no more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/,"Username must not contain special character")

export const UserSchema = z.object({
    username: usernameValidation,
    firstname : z.string().min(2,"Firstname must have at least 2 charcters"),
    lastname : z.string().nullable().optional(),
    email : z.string().email({message : "Invalid email address"}),
    isVerified: z.boolean().default(false),
    password : z.string().min(6,"Password must be at least 6 characters"),
    roles : z.object({
        isAdmin : z.boolean().default(false),
        isModerator : z.boolean().default(false),
    }),
    forgotPasswordToken : z.string().optional().nullable(),
    forgotPasswordTokenExpiry: z.date().optional().nullable(),
    verifyToken : z.string().optional().nullable(),
    verifyTokenExpiry : z.date().optional().nullable()
})

export type UserType = z.infer<typeof UserSchema>

