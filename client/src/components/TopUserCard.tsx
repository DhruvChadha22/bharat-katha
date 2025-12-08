import type { TopUser } from "@/types/users";
import { useNavigate } from "react-router-dom";

export const TopUserCard: React.FC<TopUser> = ({
    id,
    name,
    imageUrl,
    totalStories,
}) => {
    const navigate = useNavigate();

    return (
        <div key={id} className="flex cursor-pointer justify-between" onClick={() => navigate(`/profiles/${id}`)}>
            <figure className="flex items-center gap-2">
                <img
                    src={imageUrl}
                    alt={name}
                    width={44}
                    height={44}
                    className="aspect-square rounded-lg"
                />
                <h2 className="text-[14px] leading-normal truncate font-semibold">{name}</h2>
            </figure>
            <div className="flex items-center">
                <p className="text-[12px] leading-normal font-normal">{totalStories} Stories</p>
            </div> 
        </div>
    );
};
