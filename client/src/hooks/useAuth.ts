import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { setIsLoading, setSignupData } from "@/store/slices/authSlice";
import { setUser } from "@/store/slices/userSlice";
import { 
    forgotPassword,
    login,
    logout,
    resetPassword,
    sendOtp,
    signup, 
} from "@/services/operations/auth";
import type { SetStateAction } from "react";
import type { 
    LoginRequest, 
    ResetPasswordRequest, 
    SignupRequest, 
} from "@/types/auth";
import toast from "react-hot-toast";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSendOtp = async (
        name: string, 
        email: string,
        options?: { isResend: boolean },
    ) => {
        try {
            dispatch(setIsLoading(true));
            await sendOtp({
                name,
                email,
            });

            if (!options?.isResend) {
                navigate("/verify-email");
            }

            toast.success("Email sent successfully");
        }
        catch (error: any) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Internal Server Error");
            }
        }
        finally {
            dispatch(setIsLoading(false));
        }
    };

    const handleSignup = async ({
        name,
        email,
        password,
        otp,
    }: SignupRequest) => {
        try {
            dispatch(setIsLoading(true));
            await signup({
                name,
                email,
                password,
                otp,
            });
            dispatch(setSignupData(null));
            navigate("/login");
            toast.success("User registered successfully");
        }
        catch (error: any) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Internal Server Error");
            }
        }
        finally {
            dispatch(setIsLoading(false));
        }
    };

    const handleLogin = async ({
        email,
        password,
    }: LoginRequest) => {
        try {
            dispatch(setIsLoading(true));
            const result = await login({
                email,
                password,
            });
            dispatch(setUser(result.data));
            navigate("/home");
        }
        catch (error: any) {
            if (error.response && (error.response.status === 400 || error.response.status === 404)) {
                toast.error("Invalid username or password");
            } else {
                toast.error("Internal Server Error");
            }
        }
        finally {
            dispatch(setIsLoading(false));
        }
    };

    const handleLogout = async () => {
        try {
            dispatch(setIsLoading(true));
            await logout();
            dispatch(setUser(null));
            navigate("/");
        }
        catch (error: any) {
            toast.error("Internal Server Error");
        }
        finally {
            dispatch(setIsLoading(false));
        }
    };

    const handleForgotPassword = async (
        email: string,
        setEmailSent: React.Dispatch<SetStateAction<boolean>>,
    ) => {
        try {
            dispatch(setIsLoading(true));
            await forgotPassword({
                email,
            });
            setEmailSent(true);
            toast.success("Email sent successfully");
        }
        catch (error: any) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Internal Server Error");
            }
        }
        finally {
            dispatch(setIsLoading(false));
        }
    };

    const handleResetPassword = async ({
        resetPwdToken,
        password,
    }: ResetPasswordRequest) => {
        try {
            dispatch(setIsLoading(true));
            await resetPassword({
                resetPwdToken,
                password,
            });
            navigate("/login");
            toast.success("Password reset successful");
        }
        catch (error: any) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Internal Server Error");
            }
        }
        finally {
            dispatch(setIsLoading(false));
        }
    };

    return {
        handleSendOtp,
        handleSignup,
        handleLogin,
        handleLogout,
        handleForgotPassword,
        handleResetPassword,
    };
};
