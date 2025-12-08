import * as z from "zod";

export const SendOtpRequestSchema = z.object({
    name: z.string().min(2).max(20),
    email: z.email(),
});

export const SignupRequestSchema = z.object({
    name: z.string().min(2).max(20),
    email: z.email(),
    password: z.string().min(6),
    otp: z.string().length(6),
});

export const LoginRequestSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
});

export const ForgotPasswordRequestSchema = z.object({
    email: z.email(),
});

export const ResetPasswordRequestSchema = z.object({
    resetPwdToken: z.string(),
    password: z.string().min(6),
});
