import { JWTPayload } from "../middlewares/auth";

declare global {
    namespace Express {
        interface Request {
            user?: JWTPayload;
        }
    }
}
