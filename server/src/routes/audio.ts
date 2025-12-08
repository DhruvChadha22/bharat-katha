import express from "express";
import { generateAudio, deleteAudio } from "../controllers/audio";

const audioRouter = express.Router();

audioRouter.post("/", generateAudio);
audioRouter.delete("/", deleteAudio);

export default audioRouter;
