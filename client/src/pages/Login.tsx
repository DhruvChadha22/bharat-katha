import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/store/hooks";
import { LoginFormSchema } from "@/types/form-schemas";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage, 
} from "@/components/ui/form";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle, 
} from "@/components/ui/card";

const Login: React.FC = () => {
    const { handleLogin } = useAuth();
    const { isLoading } = useAppSelector(state => state.auth);

    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = ({
        email,
        password,
    }: z.infer<typeof LoginFormSchema>) => {
        handleLogin({
            email,
            password,
        });
    };

    return (
        <Card className="w-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="text-[20px] leading-normal font-bold text-center">
                    Sign-In to Your Account
                </CardTitle>
                <CardDescription className="text-center">
                    Welcome back! Continue your storytelling journey.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 px-0 pb-0">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5">
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
                                    <div className="flex  items-center justify-between">
                                        <FormLabel className="text-[16px] leading-normal font-bold">Password</FormLabel>
                                        <p className="text-xs text-muted-foreground">
                                            <Link to="/forgot-password"><span className="text-sky-700 hover:underline">Forgot password?</span></Link>
                                        </p>
                                    </div>
                                    <FormControl>
                                        <Input 
                                            type="password" placeholder="Enter password" {...field} 
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
                                    Logging in
                                    <Loader2 className="size-5 animate-spin ml-2" />
                                </>
                            ) : (
                                "Continue"
                            )}
                        </Button>
                    </form>
                </Form>
                <p className="text-xs text-muted-foreground">
                    Don&apos;t have an account? <Link to="/signup"><span className="text-sky-700 hover:underline">Sign-up</span></Link>
                </p>
            </CardContent>
        </Card>
    );
};

export default Login;
