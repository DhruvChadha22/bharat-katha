import { ArrowRight, Play } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const Hero: React.FC = () => {

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-28 pb-10 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,_hsl(40_30%_92%)_0%,_hsl(35_25%_85%)_100%)] opacity-60" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(28_85%_45%_/_0.08)_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,hsl(180_35%_27%_/_0.06)_0%,transparent_50%)]" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ee862b]/10 text-[#ee862b] mb-2 animate-fade-up opacity-0" style={{ animationDelay: "0.1s" }}>
                        <span className="w-2 h-2 rounded-full bg-[#ee862b] animate-pulse" />
                        <span className="text-sm font-medium">Stories That Speak Your Language</span>
                    </div>

                    <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#30251d] leading-normal mb-6 animate-fade-up opacity-0" style={{ animationDelay: "0.2s" }}>
                        Discover the Magic of {" "}
                        <span className="text-[#ee862b]">Bharat</span>{" "}
                        Through Stories
                    </h1>

                    <p className="font-serif text-md md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up opacity-0" style={{ animationDelay: "0.3s" }}>
                        Explore timeless folk tales, contemporary fiction, and rich cultural stories. Listen in your preferred Indian language and enjoy storytelling brought to life.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up opacity-0" style={{ animationDelay: "0.4s" }}>
                        <Link to="/home" className="w-full sm:w-auto">
                            <Button className="cursor-pointer group w-full sm:w-auto bg-gradient-to-r from-[#ee862b] to-[#d95326] text-[#fbfaf8] shadow-[0_8px_30px_-8px_hsl(25_25%_15%_/_0.15)] hover:shadow-[0_0_40px_hsl(28_85%_55%_/_0.2)] hover:-translate-y-1 h-14 rounded-xl text-lg">
                                <Play className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                                Explore Stories
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link to="#about" className="w-full sm:w-auto">
                            <Button 
                                variant="outline"
                                className="cursor-pointer group w-full sm:w-auto border-2 border-[#ee862b] bg-transparent text-[#ee862b] hover:bg-[#ee862b] hover:text-[#fbfaf8] transition-all h-14 rounded-xl text-lg">
                                Learn more
                            </Button>
                        </Link>
                    </div>

                    <div className="font-serif flex flex-wrap items-center justify-center gap-8 sm:gap-12 mt-16 animate-fade-up opacity-0" style={{ animationDelay: "0.5s" }}>
                        <div className="text-center">
                            <p className="text-3xl sm:text-4xl font-bold text-foreground">36</p>
                            <p className="text-sm text-muted-foreground mt-1">Regions</p>
                        </div>
                        <div className="w-px h-12 bg-[#e2dacf] hidden sm:block" />
                        <div className="text-center">
                            <p className="text-3xl sm:text-4xl font-bold text-foreground">10+</p>
                            <p className="text-sm text-muted-foreground mt-1">Languages</p>
                        </div>
                        <div className="w-px h-12 bg-[#e2dacf] hidden sm:block" />
                        <div className="text-center">
                            <p className="text-3xl sm:text-4xl font-bold text-foreground">7+</p>
                            <p className="text-sm text-muted-foreground mt-1">Categories</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
