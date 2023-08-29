import { TypeOf, number, string, z } from "zod";

export const userLoginSchema = z.object({
    email: z.string()
    .min(1, "Email Address is required")
    .email("Email Address is invalid"),
    
    password: z.string()
    .min(1, "Password is Required"),
});

export type LoginUserInput = TypeOf<typeof userLoginSchema>;



export const createUserSchema = z.object({
    email: z.string()
    .min(1, "Email Address is required")
    .email("Email Address is invalid"),
    password: z.string()
    .min(8, "Must be at least 8 characters in length")
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One integer")
    .max(16, "Password must be less than 16 characters"),
    passwordConfirm: string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.passwordConfirm, {
    path:["passwordConfirm"],
    message:"Passwords do no match",
})

export type CreateUserInput = TypeOf<typeof createUserSchema>;


export const updateFitnessInfoSchema = z.object({
    email: z.string(),
    age: z.number(),
    height: z.number(),
    gender: z.string(),
    weight: z.number(),
    workoutTime: z.string(),
    fitnessGoals: z.string(),
    exerciseLevel: z.string()
})

export type UpdateFitnessInput = TypeOf<typeof updateFitnessInfoSchema>;