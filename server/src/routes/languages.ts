import express from "express";
import { getAllLanguages } from "../controllers/languages";

const languagesRouter = express.Router();

languagesRouter.get("/", getAllLanguages);

export default languagesRouter;
