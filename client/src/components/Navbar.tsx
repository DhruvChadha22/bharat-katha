import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/constants";

export const Navbar: React.FC = () => {

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf8f5]/60 backdrop-blur-xl border-b">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    <Link to="#" className="flex cursor-pointer items-center gap-1">
                        <img 
                            src="/full-logo.png" 
                            alt="logo" 
                            width={200} 
                        />
                    </Link>

                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-muted-foreground hover:text-foreground transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary-300 after:transition-all hover:after:w-full"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    <Link to="/login">
                        <Button className="cursor-pointer w-16 h-10 bg-[#ee862b] hover:bg-[#ee862b]/90 font-semibold text-[#fbfaf8] shadow-[0_8px_30px_-8px_hsl(25_25%_15%_/_0.15)] hover:shadow-[0_0_40px_hsl(28_85%_55%_/_0.2)] hover:-translate-y-1 rounded-xl">
                            Login
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};
