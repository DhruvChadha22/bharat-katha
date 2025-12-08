import { apiConnector } from "../apiConnector";
import { authAPI } from "../apiRoutes";
import type { ApiResponse } from "@/types/api-response";
import type { User } from "@/types/users";
import type { 
    ForgotPasswordRequest, 
    LoginRequest, 
    ResetPasswordRequest, 
    SendOtpRequest, 
    SignupRequest 
} from "@/types/auth";

const {
    SEND_OTP,
    SIGNUP,
    LOGIN,
    LOGOUT,
    FORGOT_PASSWORD,
    RESET_PASSWORD,
} = authAPI;

export const sendOtp = async ({
    name, 
    email,
}: SendOtpRequest) => {
    await apiConnector("post", SEND_OTP, {
        name,
        email,
    });
};

export const signup = async ({
    name,
    email,
    password,
    otp,
}: SignupRequest) => {
    await apiConnector("post", SIGNUP, {
        name,
        email,
        password,
        otp,
    });
};

export const login = async ({
    email,
    password,
}: LoginRequest) => {
    const response = await apiConnector("post", LOGIN, {
        email,
        password,
    });
    const result: ApiResponse<User> = response.data;
    return result;
};

export const logout = async () => {
    await apiConnector("post", LOGOUT);
};

export const forgotPassword = async ({
    email,
}: ForgotPasswordRequest) => {
    await apiConnector("post", FORGOT_PASSWORD, {
        email,
    });
};

export const resetPassword = async ({
    resetPwdToken,
    password,
}: ResetPasswordRequest) => {
    await apiConnector("patch", `${RESET_PASSWORD}/${resetPwdToken}`, {
        password,
    });
};
