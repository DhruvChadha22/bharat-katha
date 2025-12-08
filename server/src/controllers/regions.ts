import { Request, Response } from "express";
import { prisma } from "../config/db";

export const getAllRegions = async (req: Request, res: Response) => {
    try {
        const regions = await prisma.region.findMany({});

        return res.status(200).json({
            success: true,
            message: "Regions fetched successfully",
            data: regions,
        });
    }
    catch (error: any) {
        console.log("Error fetching regions: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error fetching regions",
        });
    }
};
