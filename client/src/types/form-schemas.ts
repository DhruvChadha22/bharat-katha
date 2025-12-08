import { z } from "zod";

export const SignupFormSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }).max(20, {
        message: "Username must not exceed 20 characters.",
    }),
    email: z.email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const LoginFormSchema = z.object({
    email: z.email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});

export const ResetPwdFormSchema = z.object({
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const StoryInfoFormSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z.string({
        message: "Please enter a description",
    }),
});

export const UpdateProfileFormSchema = z.object({
    name: z.string()
        .min(2, { message: "Name must be at least 2 characters." })
        .max(20, { message: "Name must not excedd 20 characters." }),
});
