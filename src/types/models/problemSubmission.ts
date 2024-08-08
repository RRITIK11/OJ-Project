import {z} from "zod"
import { solutionSchema } from "../Data/problemSolution"
import { Success } from "@/config/constants"

export const statusSchema = z.object({
    success : z.nativeEnum(Success),
    message : z.string()
})

export const verdictSchema = z.object({
    testcasePassed : z.number().default(0),
    totalTestcase : z.number().default(0),
    status : statusSchema
})

export const problemSubmissionSchema = z.object({
    whoSolved : z.string(),
    problemTitle : z.string(),
    solution : solutionSchema,
    verdict : verdictSchema
})

export type problemSubmissionType = z.infer<typeof problemSubmissionSchema>

