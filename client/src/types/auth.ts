
export interface SignupData {
    name: string;
    email: string;
    password: string;
};

export interface AuthState {
    signupData: SignupData | null;
    isLoading: boolean;
};

export interface SendOtpRequest {
    name: string;
    email: string;
};

export interface SignupRequest extends SignupData {
    otp: string;
};

export interface LoginRequest {
    email: string;
    password: string;
};

export interface ForgotPasswordRequest {
    email: string;
};

export interface ResetPasswordRequest {
    resetPwdToken: string;
    password: string;
};
