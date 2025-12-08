import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { AboutUs } from "@/components/AboutUs";
import { CTASection } from "@/components/CTASection";
import Footer from "@/components/Footer";

const LandingPage: React.FC = () => {
    const { user } = useAppSelector(state => state.user);

    if (user) {
        return (
            <Navigate to="/home" />
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main>
                <Hero />
                <Features />
                <AboutUs />
                <CTASection />
                <Footer />
            </main>
        </div>
    );
};

export default LandingPage;
