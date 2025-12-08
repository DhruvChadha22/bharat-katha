import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { sidebarLinks } from "@/constants";
import { useAppSelector } from "@/store/hooks";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

export const MobileNav: React.FC = () => {
    const location = useLocation();
    const { user } = useAppSelector(state => state.user);

    return (
        <section>
            <Sheet>
                <SheetTrigger>
                    <Menu className="size-6 cursor-pointer" />
                </SheetTrigger>
                <SheetContent side="left" className="border-none bg-background-300 pt-4 pl-4 min-h-screen overflow-y-scroll">
                    <Link to="/home" className="flex cursor-pointer items-center gap-1 pb-10 pl-2">
                        <img 
                            src="/full-logo.png" 
                            alt="logo" 
                            width={200} 
                        />
                    </Link>
                    <div className="flex flex-col justify-between">
                        <SheetClose asChild>
                            <nav className="flex h-full flex-col gap-6">
                                {sidebarLinks.map((link) => {
                                    const route = 
                                        link.route === "/profiles" && user?.id
                                            ? `/profiles/${user?.id}`
                                            : link.route;
                                    const isActive = location.pathname.startsWith(link.route);

                                    return (
                                        <SheetClose asChild key={route}>
                                            <Link to={route} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-start", {
                                                "bg-[linear-gradient(270deg,_#FFF0B3_0%,_#EDEDF2_100%)] border-r-4 border-primary-300": isActive
                                            })}>
                                                <img src={link.imageUrl} alt={link.label} width={30} height={30} />
                                                <p className="text-[18px] font-medium">{link.label}</p>
                                            </Link>
                                        </SheetClose>
                                    );
                                })}
                            </nav>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    );
};
