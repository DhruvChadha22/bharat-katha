import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSignupData } from "@/store/slices/authSlice";
import { SignupFormSchema } from "@/types/form-schemas";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle
} from "@/components/ui/card";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel,
    FormMessage, 
} from "@/components/ui/form";

const SignUp: React.FC = () => {
    const { handleSendOtp } = useAuth();

    const { isLoading } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const form = useForm<z.infer<typeof SignupFormSchema>>({
        resolver: zodResolver(SignupFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = ({
        name,
        email,
        password,
    }: z.infer<typeof SignupFormSchema>) => {
        dispatch(setSignupData({
            name,
            email,
            password,
        }));
        handleSendOtp(name, email);
    };

    return (
        <Card className="w-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="text-[20px] leading-normal font-bold text-center">
                    Sign-Up to Bharat Katha
                </CardTitle>
                <CardDescription className="text-center">
                    Begin your journey into the world of Indian tales.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 px-0 pb-0">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5">
                        <FormField 
                            control={form.control}
                            name="name"
                            disabled={isLoading}
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2.5">
                                    <FormLabel className="text-[16px] leading-normal font-bold">Username</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="Create username" {...field} 
                                            className="text-[16px] leading-normal placeholder:text-[16px] placeholder:leading-normal bg-background-300 rounded-[6px] border-none focus-visible:ring-offset-primary-300"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="email"
                            disabled={isLoading}
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2.5">
                                    <FormLabel className="text-[16px] leading-normal font-bold">Email</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="Enter email" {...field} 
                                            className="text-[16px] leading-normal placeholder:text-[16px] placeholder:leading-normal bg-background-300 rounded-[6px] border-none focus-visible:ring-offset-primary-300"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="password"
                            disabled={isLoading}
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2.5">
                                    <FormLabel className="text-[16px] leading-normal font-bold">Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="password" placeholder="Create password" {...field} 
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
                                    Submitting
                                    <Loader2 className="size-5 animate-spin ml-2" />
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </Button>
                    </form>
                </Form>
                <p className="text-xs text-muted-foreground">
                    Already have an account? <Link to="/login"><span className="text-sky-600 hover:underline">Sign-in</span></Link>
                </p>
            </CardContent>
        </Card>
    );
};

export default SignUp;
