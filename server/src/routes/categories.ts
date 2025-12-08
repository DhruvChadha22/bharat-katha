import express from "express";
import { getAllCategories } from "../controllers/categories";

const categoriesRouter = express.Router();

categoriesRouter.get("/", getAllCategories);

export default categoriesRouter;
