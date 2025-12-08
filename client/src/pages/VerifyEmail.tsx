import OtpInput from "react-otp-input";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import { History, Loader2, MoveLeft } from "lucide-react";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle, 
} from "@/components/ui/card";

const VerifyEmail: React.FC = () => {
    const [otp, setOtp] = useState<string>("");

    const { handleSendOtp, handleSignup } = useAuth();
    const { signupData, isLoading } = useAppSelector(state => state.auth);

    const navigate = useNavigate();
    
    useEffect(() => {
        if (!signupData) {
            navigate("/signup");
        }
    }, []);

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSignup({ 
            ...signupData!, 
            otp, 
        });
    };

    const resendOtp = () => {
        handleSendOtp(
            signupData!.name,
            signupData!.email,
            { isResend: true },
        );
        setOtp("");
    };

    return (
        <Card className="w-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="text-[20px] leading-normal font-bold text-center">
                    Check Your Email
                </CardTitle>
                <CardDescription className="text-center">
                    We've sent a 6-digit code to verify your account.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 px-0 pb-0">
                <form onSubmit={handleOnSubmit}>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderInput={(props) => (
                            <input
                                {...props}
                                placeholder="-"
                                className="min-w-12 text-xl rounded-[0.5rem] aspect-square text-center bg-background-300 focus:border-0 focus:outline-2 focus:outline-primary-300"
                            />
                        )}
                        containerStyle={{
                            justifyContent: "space-evenly",
                        }}
                    />

                    <Button 
                        type="submit"
                        disabled={isLoading}
                        className="mt-4 cursor-pointer text-[16px] leading-normal w-full bg-primary-300 py-4 font-extrabold transition-all duration-500 hover:bg-primary-400" 
                    >
                        {isLoading ? (
                            <>
                                Submitting
                                <Loader2 className="size-5 animate-spin ml-2" />
                            </>
                        ) : (
                            "Verify Email"
                        )}
                    </Button>
                </form>

                <div className="mt-6 flex items-center justify-between">
                    <Link to="/login">
                        <p className="flex items-center gap-x-2 text-xs text-sky-700 hover:underline">
                            <MoveLeft className="size-6" /> Back to Sign-up
                        </p>
                    </Link>

                    <Button
                        variant="link"
                        onClick={resendOtp}
                        disabled={isLoading}
                        className="cursor-pointer text-sky-700"
                    >
                        <History />
                        Resend OTP
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default VerifyEmail;
