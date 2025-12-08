import { useAppSelector } from "@/store/hooks";
import { Link, Navigate, Outlet } from "react-router-dom";
import { LeftSidebar } from "./LeftSidebar";
import { MobileNav } from "./MobileNav";
import { RightSidebar } from "./RightSidebar";
import { StoryPlayer } from "./StoryPlayer";

export const MainLayout: React.FC = () => {
    const { user } = useAppSelector(state => state.user);

    if (!user) {
        return (
            <Navigate to="/login" />
        );
    }
    
    return (
        <div className="relative font-sans flex flex-col justify-between min-h-screen bg-background-200">
            <main className="relative flex">
                <LeftSidebar />

                <section className="flex h-fit flex-1 flex-col px-4 sm:px-14">
                    <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
                        <div className="flex h-16 items-center justify-between md:hidden">
                            <Link to="/home" className="cursor-pointer">
                                <img 
                                    src="/logo.svg"
                                    width={35}
                                    height={35}
                                    alt="menu icon"
                                />
                            </Link>
                            <MobileNav />
                        </div>
                        <div className="flex flex-col pb-4">
                            <Outlet />
                        </div>
                    </div>
                </section>

                <RightSidebar />
            </main>

            <StoryPlayer />
        </div>
    );
};
