import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { useAuth } from "@/hooks/useAuth";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuGroup, 
    DropdownMenuItem, 
    DropdownMenuTrigger, 
} from "./ui/dropdown-menu";

export const UserButton: React.FC = () => {
    const { user } = useAppSelector(state => state.user);
    const { handleLogout } = useAuth();

    const navigate = useNavigate();

    return (
        <div className="pb-12">
            <DropdownMenu>
                <DropdownMenuTrigger className="flex gap-3 cursor-pointer w-fit">
                    <img
                        src={user?.imageUrl}
                        alt="profile-img"
                        width={30}
                        height={30}
                        className="rounded-full"
                    />
                    <div className="flex w-full items-center gap-4">
                        <h1 className="text-[16px] leading-normal truncate font-semibold">{user?.name}</h1>
                        <img 
                            src="/right-arrow.svg"
                            width={30}
                            height={30}
                            alt="right-arrow"
                        />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44" align="start">
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            onSelect={() => navigate(`profiles/${user?.id}`)}
                            className="flex gap-3 cursor-pointer"
                        >
                            <img
                                src="/user.svg"
                                width={20}
                                height={20}
                                alt="User icon"
                            />
                            <h2 className="text-[16px] leading-normal font-normal">My Profile</h2>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onSelect={handleLogout}
                            className="flex gap-3 cursor-pointer"
                        >
                            <img
                                src="/logout.svg"
                                width={20}
                                height={20}
                                alt="Logout icon"
                            />
                            <h2 className="text-[16px] leading-normal font-normal">Logout</h2>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
