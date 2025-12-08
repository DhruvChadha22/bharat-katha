import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface JWTPayload extends JwtPayload {
    id: string;
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Token missing",
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
            
            const expiresIn = decoded.exp! - Math.floor(Date.now() / 1000);
            if (expiresIn < 24 * 60 * 60) {
                const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

                res.cookie("token", newToken, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    secure: true,
                    sameSite: "none",
                });
            }

            req.user = { id: decoded.id };
            next();
        }
        catch (error: any) {
            console.log("Invalid token: ", error.message);
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Invalid token",
            });
        }
    }
    catch (error: any) {
        console.log("Error while validating token: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while validating token",
        });
    }
};
