import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/store/hooks";
import { Link, useParams } from "react-router-dom";
import { ResetPwdFormSchema } from "@/types/form-schemas";
import { Loader2, MoveLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle, 
} from "@/components/ui/card";

const ResetPassword: React.FC = () => {
    const { resetPwdToken } = useParams();

    const { handleResetPassword } = useAuth();
    const { isLoading } = useAppSelector(state => state.auth);

    const form = useForm<z.infer<typeof ResetPwdFormSchema>>({
        resolver: zodResolver(ResetPwdFormSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = ({
        password,
    }: z.infer<typeof ResetPwdFormSchema>) => {
        handleResetPassword({
            resetPwdToken: resetPwdToken || "",
            password,
        });
    };

    return (
        <Card className="w-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="text-[20px] leading-normal font-bold text-center">
                    Reset Password
                </CardTitle>
                <CardDescription className="text-center">
                    Enter your new password to continue.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 px-0 pb-0">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5">
                        <FormField 
                            control={form.control}
                            name="password"
                            disabled={isLoading}
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2.5">
                                    <FormLabel className="text-[16px] leading-normal font-bold">New Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="password" placeholder="Create new password" {...field} 
                                            className="text-[16px] leading-normal placeholder:text-[16px] placeholder:leading-normal bg-background-300 rounded-[6px] border-none focus-visible:ring-offset-primary-300"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="confirmPassword"
                            disabled={isLoading}
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2.5">
                                    <FormLabel className="text-[16px] leading-normal font-bold">Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="password" placeholder="Re-enter password" {...field} 
                                            className="text-[16px] leading-normal placeholder:text-[16px] placeholder:leading-normal bg-background-300 rounded-[6px] border-none focus-visible:ring-offset-primary-300"    
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button 
                            type="submit"
                            disabled={isLoading}
                            className="mt-2 cursor-pointer text-[16px] leading-normal w-full bg-primary-300 py-4 font-extrabold transition-all duration-500 hover:bg-primary-400" 
                        >
                            {isLoading ? (
                                <>
                                    Resetting Password
                                    <Loader2 className="size-5 animate-spin ml-2" />
                                </>
                            ) : (
                                "Reset Password"
                            )}
                        </Button>
                    </form>
                </Form>
                <Link to="/login">
                    <p className="flex items-center gap-x-2 text-xs text-sky-700 hover:underline">
                        <MoveLeft className="size-6" /> Back to Login
                    </p>
                </Link>
            </CardContent>
        </Card>
    );
};

export default ResetPassword;
