import {z} from "zod"
import { UserSchema } from "../models/user"

export const updateRoleSchema = UserSchema.pick({
    username : true,
    roles : true
})

export type updateRoleType = z.infer<typeof updateRoleSchema> 