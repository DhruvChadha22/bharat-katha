import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import authRouter from "./routes/auth";
import usersRouter from "./routes/users";
import storiesRouter from "./routes/stories";
import audioRouter from "./routes/audio";
import favoritesRouter from "./routes/favorites";
import languagesRouter from "./routes/languages";
import categoriesRouter from "./routes/categories";
import regionsRouter from "./routes/regions";
import { cloudinaryConnect } from "./config/cloudinary";
import "./cron/otpCleanup";
import "./cron/reloadServer";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp'
}));

dotenv.config();
cloudinaryConnect();


app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/stories", storiesRouter);
app.use("/api/audio", audioRouter);
app.use("/api/favorites", favoritesRouter);
app.use("/api/languages", languagesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/regions", regionsRouter);


app.get("/", async (req, res) => {
    res.send("Server is up and running");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
});
