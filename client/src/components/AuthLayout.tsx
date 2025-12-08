import { useAppSelector } from "@/store/hooks";
import { Link, Navigate, Outlet } from "react-router-dom";

export const AuthLayout: React.FC = () => {
    const { user } = useAppSelector(state => state.user);

    if (user) {
        return (
            <Navigate to="/home" />
        );
    }

    return (
        <div className="bg-background-200 w-screen h-screen overflow-x-hidden">
            <Link to="/" className="flex cursor-pointer items-center gap-1 pb-8 pt-4 pl-8 max-lg:justify-center">
                <img 
                    src="/full-logo.png" 
                    alt="logo" 
                    width={200} 
                />
            </Link>
            <div className="flex items-center justify-evenly">
                <div className="w-full max-w-md">
                    <Outlet />
                </div>

                <div className="relative rounded-full max-lg:hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FFF3A6,#FFF8D1)] rounded-full blur-3xl z-0"></div>
                    <img
                        src="/auth-img.png"
                        alt="auth-img"
                        width={500}
                        height={500}
                        className="relative z-10"
                    />
                </div>
            </div>
        </div>
    );
};
