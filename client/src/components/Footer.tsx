import { socials } from "@/constants";

const Footer: React.FC = () => {
    return (
        <footer className="border-t border-[#ee862b]/30 bg-[linear-gradient(#FFF7E8,#FFE7C2)]">
            <div className="max-w-7xl mx-auto py-10">
                <div className="flex w-full items-center max-md:flex-col">
                    <div className="flex flex-1 flex-wrap items-center justify-center font-semibold gap-5">
                        <div className="flex flex-col items-center justify-center gap-5">
                            <img
                                src="full-logo.png"
                                width={200}
                            />
                            <p className="text-black/70">Made by Dhruv Chadha</p>
                        </div>
                    </div>

                    <ul className="flex flex-1 justify-center gap-3 max-md:mt-10">
                        {socials.map(({ title, url, icon }) => {
                            const Icon = icon;
                            return <li key={title}>
                                <a href={url} target="_blank" className="flex size-16 items-center justify-center rounded-full border-2 border-primary-100 bg-gradient-to-br from-[#ee862b]/20 to-[#3a7878]/20 transition-all duration-500">
                                    <Icon className="size-1/3 object-contain" />
                                </a>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
