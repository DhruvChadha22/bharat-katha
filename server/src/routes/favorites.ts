import express from "express";
import { auth } from "../middlewares/auth";
import { 
    getAllFavoriteStories, 
    addStoryToFavorites, 
    removeStoryFromFavorites,
} from "../controllers/favorites";

const favoritesRouter = express.Router();

favoritesRouter.get("/", auth, getAllFavoriteStories);
favoritesRouter.post("/:storyId", auth, addStoryToFavorites);
favoritesRouter.delete("/:storyId", auth, removeStoryFromFavorites);

export default favoritesRouter;
