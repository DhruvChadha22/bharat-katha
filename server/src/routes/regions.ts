import express from "express";
import { getAllRegions } from "../controllers/regions";

const regionsRouter = express.Router();

regionsRouter.get("/", getAllRegions);

export default regionsRouter;
