import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

export const LeftSidebar: React.FC = () => {
    const location = useLocation();
    const { user } = useAppSelector(state => state.user);
    const { audio, isStoryDetailsOpen } = useAppSelector(state => state.audio);

    return (
        <section className={cn("sticky left-0 top-0 flex w-fit flex-col justify-between border-none bg-background-300 h-screen overflow-y-auto pt-4 max-md:hidden lg:w-[270px] lg:pl-8", {
            "h-[calc(100vh-118px)]": audio?.audioUrl && !isStoryDetailsOpen,
        })}>
            <nav className="flex flex-col gap-6">
                <Link to="/home" className="flex cursor-pointer items-center gap-1 pb-8 max-lg:justify-center">
                    <img 
                        src="/full-logo.png" 
                        alt="logo" 
                        width={200} 
                    />
                </Link>

                {sidebarLinks.map((link) => {
                    const route = 
                        link.route === "/profiles" && user?.id
                            ? `/profiles/${user?.id}`
                            : link.route;
                    const isActive = location.pathname.startsWith(link.route);

                    return <Link to={route} key={link.label} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-start", {
                        "bg-[linear-gradient(270deg,_#FFF0B3_0%,_#EDEDF2_100%)] border-r-4 border-primary-300": isActive
                    })}>
                        <img src={link.imageUrl} alt={link.label} width={30} height={30} />
                        <p className="text-[18px] font-medium">{link.label}</p>
                    </Link>
                })}
            </nav>
        </section>
    );
};
