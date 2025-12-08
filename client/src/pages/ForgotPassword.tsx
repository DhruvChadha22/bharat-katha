import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Loader2, MoveLeft } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/store/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [emailSent, setEmailSent] = useState<boolean>(false);

    const { handleForgotPassword } = useAuth();
    const { isLoading } = useAppSelector(state => state.auth);

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleForgotPassword(
            email,
            setEmailSent
        );
    };

    return (
        <Card className="w-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="text-[20px] leading-normal font-bold text-center">
                    {!emailSent ? "Reset your password" : "Check your Email"}
                </CardTitle>
                <CardDescription className="text-center">
                    {
                        !emailSent 
                        ? 
                            "We'll email you instructions to reset your password."
                        : 
                            <p>We have sent the reset password instructions to <span className="text-sky-700">{email}</span></p>
                    }
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 px-0 pb-0">
                <form onSubmit={handleOnSubmit}>
                    {
                        !emailSent && (
                            <div className="flex flex-col gap-2.5">
                                <Label htmlFor="email" className="text-[16px] leading-normal font-bold">
                                    Email Address
                                </Label>
                                <Input
                                    required
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading}
                                    placeholder="Enter email"
                                    className="text-[16px] leading-normal placeholder:text-[16px] placeholder:leading-normal bg-background-300 rounded-[6px] border-none focus-visible:ring-offset-primary-300"
                                />
                            </div>
                        )
                    }

                    <Button 
                        type="submit"
                        disabled={isLoading}
                        className="mt-4 cursor-pointer text-[16px] leading-normal w-full bg-primary-300 py-4 font-extrabold transition-all duration-500 hover:bg-primary-400" 
                    >
                        {isLoading ? (
                            <>
                                Sending Email
                                <Loader2 className="size-5 animate-spin ml-2" />
                            </>
                        ) : (
                            !emailSent ? "Send Email" : "Resend Email"
                        )}
                    </Button>
                </form>

                <Link to="/login">
                    <p className="flex items-center gap-x-2 text-xs text-sky-700 hover:underline">
                        <MoveLeft className="size-6" /> Back to Login
                    </p>
                </Link>
            </CardContent>
        </Card>
    );
};

export default ForgotPassword;
