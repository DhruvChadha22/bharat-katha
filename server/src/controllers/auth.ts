import otpGenerator from "otp-generator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Request, Response, CookieOptions } from "express";
import { prisma } from "../config/db";
import { mailSender } from "../utils/mailSender";
import { emailVerificationTemplate } from "../mail-templates/emailVerification";
import { resetPasswordTemplate } from "../mail-templates/resetPassword";
import { 
    SendOtpRequestSchema,
    SignupRequestSchema,
    LoginRequestSchema,
    ForgotPasswordRequestSchema,
    ResetPasswordRequestSchema,
} from "../schemas/auth.schema";

export const sendOtp = async (req: Request, res: Response) => {
    try {
        const validation = SendOtpRequestSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Missing or Invalid Inputs",
            });
        }

        const { name, email } = validation.data;
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(403).json({
                success: false,
                message: "User is already registered",
            });
        }

        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        const hashedOtp = await bcrypt.hash(otp, 10);
        await prisma.otp.upsert({
            where: { email },
            update: {
                otp: hashedOtp,
                createdAt: new Date(),
                expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 mins from now
            },
            create: {
                email,
                otp: hashedOtp,
                expiresAt: new Date(Date.now() + 5 * 60 * 1000),
            },
        });

        await mailSender(email, "OTP for Email Verification", emailVerificationTemplate(otp, name));
        
        return res.status(200).json({
            success: true,
            message: "Otp generated and mailed successfully",
        });
    }
    catch (error: any) {
        console.log("Error while generating otp: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while generating OTP",
        });
    }
};

export const signup = async (req: Request, res: Response) => {
    try {
        const validation = SignupRequestSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Missing or Invalid Inputs",
            });
        }

        const { name, email, password, otp } = validation.data;
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(403).json({
                success: false,
                message: "User is already registered",
            });
        }
        
        const otpRecord = await prisma.otp.findUnique({
            where: { email },
            select: {
                otp: true,
                expiresAt: true,
            },
        });
        if (!otpRecord) {
            return res.status(404).json({
                success: false,
                message: "Otp NOT found",
            });
        }
        if (otpRecord.expiresAt < new Date()) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired",
            });
        }

        const otpMatch = await bcrypt.compare(otp, otpRecord.otp);
        if (!otpMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                imageUrl: `https://api.dicebear.com/9.x/initials/svg?backgroundColor=de5602&seed=${name}`,
            },
        });

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
        });
    }
    catch (error: any) {
        console.log("Error while registering User: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while registering User",
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const validation = LoginRequestSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Missing or Invalid Inputs",
            });
        }

        const { email, password } = validation.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User is NOT registered",
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password",
            });
        }

        const payload = {
            id: user.id,
            // email,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: "7d",
        });
        const cookieOptions: CookieOptions = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            httpOnly: true,
            secure: true,
            sameSite: "none",
        };
        const data = {
            id: user.id,
            name: user.name,
            imageUrl: user.imageUrl,
        };

        return res.cookie("token", token, cookieOptions).status(200).json({
            success: true,
            message: "User logged-in successfully",
            data,
        });
    }
    catch (error: any) {
        console.log("Error while logging in: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while logging in",
        });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        return res.status(200).json({
            success: true,
            message: "User logged out successfully",
        });
    } 
    catch (error: any) {
        console.log("Error while logging out: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while logging out",
        });
    }
};

// Generates and mails reset-password token
export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const validation = ForgotPasswordRequestSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Missing or Invalid Inputs",
            });
        }

        const { email } = validation.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User is NOT registered",
            });
        }
        
        const resetPwdToken = crypto.randomBytes(20).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(resetPwdToken).digest("hex");
        await prisma.user.update({
            where: { email },
            data: {
                resetPwdToken: hashedToken,
                resetPwdTokenExpiry: new Date(Date.now() + 5 * 60 * 1000),
            },
        });

        const url = `${process.env.FRONTEND_URL}/reset-password/${resetPwdToken}`;
        await mailSender(email, "Reset Password Link", resetPasswordTemplate(url, user.name));

        return res.status(200).json({
            success: true,
            message: "Email sent successfully, Please check your mail box and change password",
        });
    } 
    catch (error: any) {
        console.log("Error while generating reset-password token: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while generating reset-password token",
        });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const validation = ResetPasswordRequestSchema.safeParse({ 
            resetPwdToken: req.params.resetPwdToken, 
            password: req.body.password,
        });
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Missing or Invalid Inputs",
            });
        }

        const { resetPwdToken, password } = validation.data;
        const hashedToken = crypto.createHash("sha256").update(resetPwdToken).digest("hex");
        const user = await prisma.user.findFirst({
            where: {
                resetPwdToken: hashedToken,
                resetPwdTokenExpiry: {
                    gt: new Date(),
                },
            },
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset password token",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetPwdToken: null,
                resetPwdTokenExpiry: null,
            },
        });

        return res.status(200).json({
            success: true,
            message: "Password reset successful",
        });
    }
    catch (error: any) {
        console.log("Error while resetting password: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while resetting password",
        });
    }
};
