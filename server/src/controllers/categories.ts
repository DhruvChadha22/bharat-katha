import { Request, Response } from "express";
import { prisma } from "../config/db";

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany({});

        return res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            data: categories,
        });
    }
    catch (error: any) {
        console.log("Error fetching categories: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error fetching categories",
        });
    }
};
