import { Request, Response } from "express";
import { prisma } from "../config/db";

export const getAllLanguages = async (req: Request, res: Response) => {
    try {
        const languages = await prisma.language.findMany({
            select: {
                id: true,
                name: true,
            },
        });

        return res.status(200).json({
            success: true,
            message: "Languages fetched successfully",
            data: languages,
        });
    }
    catch (error: any) {
        console.log("Error fetching languages: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error fetching languages",
        });
    }
};
