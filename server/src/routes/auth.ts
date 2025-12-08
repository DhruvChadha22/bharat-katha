import express from "express";
import {
    sendOtp,
    signup,
    login,
    logout,
    forgotPassword,
    resetPassword,
} from "../controllers/auth";

const authRouter = express.Router();

authRouter.post("/send-otp", sendOtp);
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/forgot-password", forgotPassword);
authRouter.patch("/reset-password/:resetPwdToken", resetPassword);

export default authRouter;
