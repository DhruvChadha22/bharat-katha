import { useGetUser } from "./hooks/useGetUser";
import { useAppSelector } from "./store/hooks";
import { Loader2 } from "lucide-react";
import { Route, Routes } from "react-router-dom";
import { AuthLayout } from "./components/AuthLayout";
import { MainLayout } from "./components/MainLayout";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import CreateStory from "./pages/CreateStory";
import Story from "./pages/Story";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";

const App: React.FC = () => {
    useGetUser();

    const { isLoading } = useAppSelector(state => state.user);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen w-screen bg-background-200">
                <Loader2 className="size-8 text-primary-300 animate-spin" />
            </div>
        );
    }

    return (
        <Routes>
            <Route index element={<LandingPage />} />

            <Route element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="verify-email" element={<VerifyEmail />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password/:resetPwdToken" element={<ResetPassword />} />
            </Route>

            <Route element={<MainLayout />}>
                <Route path="home" element={<Home />} />
                <Route path="discover" element={<Discover />} />
                <Route path="create-story" element={<CreateStory />} />
                <Route path="stories/:storyId" element={<Story />} />
                <Route path="profiles/:profileId" element={<Profile />} />
                <Route path="favorites" element={<Favorites />} />
            </Route>
        </Routes>
    );
};

export default App;
