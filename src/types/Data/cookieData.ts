import {z} from "zod"
import { UserSchema } from "@/types/models/user"

export const CookieDataSchema = UserSchema.pick({
  username : true,
  roles : true
})

export type CookieDataInterface = z.infer<typeof CookieDataSchema>