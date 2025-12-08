import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToggleFavorite } from "@/hooks/useToggleFavorite";
import type { StoryCardProps } from "@/types/props";

export const StoryCard: React.FC<StoryCardProps> = ({
    id,
    title,
    imageUrl,
    author,
    language,
    isFavorite,
    onUnfavorite,
}) => {
    const navigate = useNavigate();

    const { 
        isFavoriteState,
        isLoading,
        handleToggleFavorite,
    } = useToggleFavorite(id, isFavorite);

    const handleOnClickStory = () => {
        navigate(`/stories/${id}`);
    };
    
    const handleOnClickFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        const newState = await handleToggleFavorite();
        if (newState === false && onUnfavorite) {
            onUnfavorite(id);
        }
    };

    return (
        <div className="cursor-pointer bg-background-100 rounded-xl shadow-sm shadow-background-400 hover:shadow-md hover:bg-[radial-gradient(circle_at_center,#FCF0EB,#FAD9C8)] transition-all" onClick={handleOnClickStory}>
            <figure className="relative flex flex-col gap-2">
                <button
                    onClick={handleOnClickFavorite}
                    className={cn("absolute top-1 right-1 transition-all", {
                        "cursor-pointer": !isLoading
                    })}
                    disabled={isLoading}
                >
                    <Star
                        className={cn("stroke-[0.5px] fill-background-200", {
                            "stroke-secondary-200 fill-secondary-200": isFavoriteState,
                        })}
                    />
                </button>
                <img 
                    src={imageUrl}
                    alt={title}
                    className="aspect-square h-fit w-full rounded-t-xl"
                />
                <div className="relative flex flex-col px-2 pb-2 rounded-t-xl">
                    <div className="absolute -top-8 flex items-center justify-center w-fit gap-1 rounded-2xl border-[1px] border-secondary-400 bg-secondary-100 py-[1px] pl-1.5 pr-2">
                        <img
                            src="/globe.svg"
                            width={14}
                            height={14}
                            alt="globe"
                        />
                        <p className="text-[12px] leading-normal font-semibold">{language.name}</p>
                    </div>
                    <h1 className="text-[16px] leading-normal truncate font-bold">{title}</h1>
                    <h2 className="text-[12px] leading-normal truncate font-normal">{author.name}</h2>
                </div>
            </figure>
        </div>
    );
};
