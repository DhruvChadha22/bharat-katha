import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowRight, Mic2 } from "lucide-react";

export const CTASection: React.FC = () => {

    return (
        <section className="py-20 bg-[#ebe6e0]/60 overflow-hidden">
            <div className="container mx-auto max-w-[1252px] px-16 max-xl:px-10 max-lg:px-6 max-sm:px-4">
                <div className="flex">
                    <div className="relative mr-6 mt-8 flex-[0_0_540px] max-xl:flex-[0_0_280px] max-lg:flex-[0_0_256px] max-md:flex-[0_0_100%]">
                        <div className="flex w-full max-md:justify-center mb-10">
                            <img
                                src="/full-logo.png"
                                width={200}
                                alt="logo"
                            />
                        </div>

                        <div className="flex flex-col w-full max-md:items-center max-md:justify-center mb-10">
                            <p className="font-serif text-[20px] leading-[36px] text-[#30251d] max-w-md relative before:pointer-events-none before:absolute before:left-full before:top-[calc(50%-1px)] before:mr-6 before:h-0.5 before:w-[118px] before:bg-primary-300 before:content-[''] before:max-xl:hidden after:pointer-events-none after:absolute after:left-full after:top-[calc(50%-5px)] after:z-2 after:size-2.5 after:rounded-full after:border-2 after:border-primary-300 after:bg-[#ebe6e0] after:content-[''] after:max-xl:hidden">
                                Whether you're here to listen or to share your own tales, you're part of something beautiful. 
                                Join our community and be the voice that carries these stories forward.
                            </p>

                            <Link 
                                to="/home" 
                                className="flex items-center justify-center mt-10 w-full sm:w-auto relative"
                            >
                                <Button className="cursor-pointer group w-full sm:w-auto bg-gradient-to-r from-[#ee862b] to-[#d95326] text-[#fbfaf8] shadow-[0_8px_30px_-8px_hsl(25_25%_15%_/_0.15)] hover:shadow-[0_0_40px_hsl(28_85%_55%_/_0.2)] hover:-translate-y-1 h-14 rounded-xl text-lg">
                                    <Mic2 className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                                    Share your Story
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="mb-10 max-md:hidden">
                        <div className="before:pointer-events-none before:absolute before:-top-28 before:left-1/3 before:h-[112px] before:w-0.5 before:bg-primary-300 before:content-[''] before:max-md:hidden after:absolute after:left-[calc(33%-0.5px)] after:-top-1.5 after:z-2 after:size-2.5 after:rounded-full after:border-2 after:border-primary-300 after:bg-[#ebe6e0] after:content-[''] after:max-md:hidden rounded-[40px] relative w-[955px] border-2 border-primary-300">
                            <div className="relative rounded-[40px] bg-[linear-gradient(90deg,_#FFF0E6,_#FFE0CC)] px-4 pb-4 pt-4">
                                <img
                                    src="/home-page.png"
                                    width={1000}
                                    height={1000}
                                    alt="screen"
                                    className="rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
