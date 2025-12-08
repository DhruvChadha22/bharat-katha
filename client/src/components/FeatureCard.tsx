import { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export const FeatureCard = ({
    title,
    description,
    src,
    index
}: {
    title: string;
    description: string;
    src: string;
    index: number;
}) => {
    const borderRef = useRef<HTMLDivElement>(null);

    const offsetX = useMotionValue(-100);
    const offsetY = useMotionValue(-100);
    const maskImage = useMotionTemplate`radial-gradient(100px 100px at ${offsetX}px ${offsetY}px, black, transparent)`;

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            if (!borderRef.current) return;

            const borderRect = borderRef.current.getBoundingClientRect();
            offsetX.set(e.x - borderRect.x);
            offsetY.set(e.y - borderRect.y);
        };

        window.addEventListener("mousemove", updateMousePosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);

    return (
        <div
            key={index}
            className="relative group p-6 lg:p-8 rounded-2xl bg-[linear-gradient(#FFF7E8,#FFE7C2)] border border-[#e2dacf]/50 hover:border-[#ee862b]/30 transition-all duration-300 hover:shadow-[0_8px_30px_-8px_hsl(25_25%_15%_/_0.15)] hover:-translate-y-2"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <motion.div 
                className="absolute inset-0 border-2 border-primary-200 rounded-xl" 
                style={{
                    WebkitMaskImage: maskImage,
                    maskImage
                }}
                ref={borderRef}
            />
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#ee862b]/20 to-[#3a7878]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                <img
                    src={src}
                    width={30} 
                    height={30} 
                />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#30251d] mb-3">
                {title}
            </h3>
            <p className="text-[#847062] leading-relaxed">
                {description}
            </p>
        </div>
    );
};
