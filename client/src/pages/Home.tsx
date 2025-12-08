import { LatestStories } from "@/components/LatestStories";
import { TrendingStories } from "@/components/TrendingStories";

const Home: React.FC = () => {
    return (
        <div className="mt-9 flex flex-col gap-9 md:overflow-hidden">
            <TrendingStories />
            <LatestStories />
        </div>
    );
};

export default Home;
