import  {z} from "zod";

export const logInSchema = z.object({
    identifier : z.string(),
    password: z.string()
})
