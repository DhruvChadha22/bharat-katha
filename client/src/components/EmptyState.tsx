import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import type { EmptyStateProps } from "@/types/props";

export const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    search,
    buttonText,
    buttonLink,
}) => {

    return (
        <section className="flex items-center justify-center size-full flex-col gap-3">
            <img 
                src="/empty-state.svg" 
                width={250} 
                height={250} 
                alt="empty-state" 
            />
            <div className="flex items-center justify-center w-full max-w-[254px] flex-col gap-3">
                <h1 className="text-[16px] leading-normal text-center font-medium">{title}</h1>
                {search && (
                    <p className="text-[16px] leading-normal text-center font-medium">
                        Try adjusting your search to find what you are looking for
                    </p>
                )}
                {buttonLink && (
                    <Button className="bg-[linear-gradient(#FE621D,#F97535)]">
                        <Link to={buttonLink} className="gap-1 flex">
                            <img 
                                src="/compass.svg"
                                width={25}
                                height={25}
                                alt="discover"
                            />
                            <h1 className="text-[16px] leading-normal font-extrabold">{buttonText}</h1>
                        </Link>
                    </Button>
                )}
            </div>
        </section>
    );
};
