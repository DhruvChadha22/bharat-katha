import express from "express";
import { auth } from "../middlewares/auth";
import { 
    getStoriesBySearch,
    getStoriesByCategory,
    getStoriesByAuthor,
    getTrendingStories,
    getLatestStories,
    getPopularStories,
    getStoryById,
    createStory,
    deleteStory,
    updateStory,
} from "../controllers/stories";

const storiesRouter = express.Router();

storiesRouter.get("/", auth, getStoriesBySearch);
storiesRouter.get("/category/:categoryId", auth, getStoriesByCategory);
storiesRouter.get("/author/:authorId", auth, getStoriesByAuthor);
storiesRouter.get("/trending", auth, getTrendingStories);
storiesRouter.get("/latest", auth, getLatestStories);
storiesRouter.get("/popular", getPopularStories);
storiesRouter.get("/:storyId", auth, getStoryById);

storiesRouter.post("/", auth, createStory);
storiesRouter.patch("/:storyId", auth, updateStory);
storiesRouter.delete("/:storyId", auth, deleteStory);

export default storiesRouter;
