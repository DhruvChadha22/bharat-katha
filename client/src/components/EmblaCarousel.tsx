import React, { useCallback } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./ui/EmblaCarouselDotButton";
import type { EmblaCarouselType } from "embla-carousel";
import type { PopularStories } from "@/types/stories";
import { useNavigate } from "react-router-dom";

export const EmblaCarousel: React.FC<{ popularStories: PopularStories }> = ({ popularStories }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ stopOnInteraction: false })]);

    const navigate = useNavigate();

    const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
        const autoplay = emblaApi?.plugins()?.autoplay;
        if (!autoplay) return;

        const resetOrStop =
        autoplay.options.stopOnInteraction === false
            ? autoplay.reset
            : autoplay.stop;

        resetOrStop();
    }, []);

    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
        emblaApi,
        onNavButtonClick,
    );

    return (
        <section className="flex w-full flex-col gap-4 overflow-hidden" ref={emblaRef}>
            <div className="flex">
                {popularStories.map((story) => (
                    <figure
                        key={story.id}
                        className="relative flex h-fit aspect-square w-full flex-none cursor-pointer flex-col justify-end rounded-xl border-none"
                        onClick={() => navigate(`/stories/${story.id}`)}
                    >
                        <img 
                            src={story.imageUrl}
                            alt="card"
                            className="absolute size-full rounded-xl border-none"
                        />
                        <div className="bg-white/60 backdrop-blur-2xl relative z-10 flex flex-col rounded-b-xl px-4 py-2">
                            <h2 className="text-[14px] leading-normal truncate font-semibold">{story.title}</h2>
                            <p className="text-[12px] leading-normal truncate font-normal">{story.author.name}</p>
                        </div>
                    </figure>
                ))}
            </div>
            <div className="flex justify-center gap-2">
                {scrollSnaps.map((_, index) => (
                    <DotButton
                        key={index}
                        onClick={() => onDotButtonClick(index)}
                        selected={index === selectedIndex}
                    />
                ))}
            </div>
        </section>
    );
};
