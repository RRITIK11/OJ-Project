import { Language } from "@/config/constants"
import {z} from "zod"

export const solutionSchema = z.object({
    code : z.string(),
    language : z.nativeEnum(Language)
})

export type solutionType = z.infer<typeof solutionSchema>