import { z } from "zod";
import { 
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "../trpc";
import { TRPCError } from "@trpc/server";
import { createUserSchema, updateFitnessInfoSchema, userLoginSchema } from "~/schema/user";


export const userRouter = createTRPCRouter({
    all: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.user.findMany({});
    }),

    me: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.user;
    }),

    authenticateUser: publicProcedure
    .input(userLoginSchema)
    .mutation(async({ ctx, input }) => {
        try {
            console.log("Input:", { input } );
            const user = await ctx.prisma.user.findFirst({
                where: { email: input?.email},
            });
            if (!user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found"
                })
              }
              const passCheck = await ctx.prisma.user.findFirst({
                where: { email: input?.email, password: input?.password},
            });
            if (!passCheck) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "Incorrect Password"
                })
              }
              console.log({ passCheck });
              const isValidPassword = { password: input?.password === user.password };
              if (!isValidPassword) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "Incorrect Password"
                })
              }
              if (isValidPassword){
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    age: user.age,
                    gender: user.gender,
                    height: user.height,
                    weight: user.weight,
                    workoutTime: user.workoutTime,
                    fitnessGoals: user.fitnessGoals,
                    exerciseLevel: user.exerciseLevel,
    
                  }
              }     
        } catch (error: any) {
            console.log({error});
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: error.message,
            });
        }
    }),


    createUser: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ ctx, input }) => {
        try {
            console.log(input, "input");
            if(!input.email) {
                throw new TRPCError({
                    code:"FORBIDDEN",
                    message:'Email is required',
                });
            } else {
                const exists = await ctx.prisma.user.findFirst({
                    where: {
                        email: input.email
                    },
                });
                if(exists) {
                    throw new TRPCError({
                        code: "CONFLICT",
                        message: "User already exists.",
                    });
                }
                const result = await ctx.prisma.user.create({
                    data: {
                        email: input.email,
                        password: input.password
                    }
                });
                return {
                    status: 201,
                    message: "Account created successfully",
                    result: result.email,
                }             
            }       
        } catch (error: any) {
            console.log("Data Error", error);
            if (error.message == "One uppercase character"){
                console.log("Upper Case Error");
                throw new TRPCError({
                    code: "PRECONDITION_FAILED",
                    message: "Password must have 1 Uppercase character"
                })
            }
            if (error.message == "One lowercase character") {
                console.log("Lower Case Error");
                throw new TRPCError({
                    code: "PRECONDITION_FAILED",
                    message: "Password must have 1 Lowercase character",
                    })
            }
            if (error.message == "One integer") {
                console.log("Integer Error");
                throw new TRPCError({
                    code: "PRECONDITION_FAILED",
                    message: "Password must have 1 integer",
                    })
            }
            if (error.message == "too_small") {
                console.log("character Error");
                throw new TRPCError({
                    code: "PRECONDITION_FAILED",
                    message: "Password must be atlease 8 characters long",
                    })
            } else {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: error.message,
                });
            }

        }
    }),


    updateFitness: publicProcedure
    .input(updateFitnessInfoSchema)
    .mutation(async ({ ctx, input }) => {
        try {
            console.log(input, "User fitness update info");
            let option: any = {};
            option.where = {
                email: input.email
            };
            if(!option){
                throw new TRPCError({
                    code:"NOT_FOUND",
                    message: "User Not Found"
                })
            }
            option.data = {
                age: input.age,
                height: input.height,
                gender: input.gender,
                weight: input.weight,
                workoutTime: input.workoutTime,
                fitnessGoals: input.fitnessGoals,
                exerciseLevel: input.exerciseLevel,
            }
            const updateResponse = await ctx.prisma.user.update(option);
            console.log(updateResponse, "updateResponse");
            return updateResponse
        } catch (error: any) {
            console.log("Error in update",error);
            throw new TRPCError({
                code:"INTERNAL_SERVER_ERROR",
                message:error.message,
            })
            
            
        }
    })


})