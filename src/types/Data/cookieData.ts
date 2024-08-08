import {z} from "zod"

import { UserSchema } from "@/types/models/user"

interface Role {
  isAdmin : boolean,
  isModerator : boolean
}

export const CookieDataSchema = UserSchema.pick({
  username : true,
  roles : true
})

export type CookieDataInterface = z.infer<typeof CookieDataSchema>