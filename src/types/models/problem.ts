import { Difficulty, Verification } from "@/config/constants"
import {z} from "zod"
import { solutionSchema } from "../Data/problemSolution"

export const testCaseSchema = z.object({
    input : z.string(),
    output : z.string().optional(),
    visible : z.boolean().default(false),
    explanation : z.string().optional()
})

export const problemSchema = z.object({ 
    number : z.string(),
    title : z.string(),
    description : z.string(),
    difficulty : z.nativeEnum(Difficulty).default(Difficulty.Easy),
    topics : z.array(z.string()).optional(),
    companies : z.array(z.string()).optional(),
    hints : z.array(z.string()).optional(),
    testCases : z.array(testCaseSchema).optional(),
    inputFormat : z.array(z.string()),
    outputFormat : z.array(z.string()),
    constraints : z.array(z.string()).optional(),
    followUp : z.string().optional(),
    _createdBy : z.string(),
    _approvedBy : z.string().optional(),
    _rejectedBy : z.string().optional(),
    verification : z.nativeEnum(Verification).default(Verification.Pending),
    reasonForContribution : z.string().optional(),
    solution : solutionSchema
})

export type problemType = z.infer<typeof problemSchema>