import { features } from "@/constants";
import { FeatureCard } from "./FeatureCard";

export const Features: React.FC = () => {
    
    return (
        <section id="features" className="py-20 bg-[#ebe6e0]/60">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-primary-300 font-semibold text-sm uppercase tracking-widest">Features</span>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#30251d] mt-4 mb-6">
                        Everything You Need to{" "}
                        <span className="text-primary-300">Discover Stories</span>
                    </h2>
                    <p className="text-[#847062] text-lg">
                        A thoughtfully crafted platform that celebrates the art of storytelling
                        while making it accessible to everyone.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} title={feature.title} src={feature.src} description={feature.description} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};
