import express from "express";
import { auth } from "../middlewares/auth";
import { 
    getUser,
    getUserById,
    getTopUsers,
    updateUser,
    deleteUser,
} from "../controllers/users";

const usersRouter = express.Router();

usersRouter.get("/", auth, getUser);
usersRouter.get("/top-users", getTopUsers);
usersRouter.get("/:userId", getUserById);

usersRouter.patch("/", auth, updateUser);
usersRouter.delete("/", auth, deleteUser);

export default usersRouter;
