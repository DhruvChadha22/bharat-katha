import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../config/db";
import { UploadedFile } from "express-fileupload";
import { deleteBulkResources, deleteResource, uploadImage } from "../utils/cloudinaryHandler";
import { UpdateUserRequestSchema, UserByIdRequestSchema } from "../schemas/users.schema";

export const getUser = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                imageUrl: true,
            },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User NOT found",
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "User data fetched successfully",
            data: user,
        });
    }
    catch (error: any) {
        console.log("Error while fetching user data: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while fetching user data",
        });
    }
};

export const getTopUsers = async (req: Request, res: Response) => {
    try {
        // Get top users by total views and story count
        const topUsers = await prisma.story.groupBy({
            by: ["authorId"],
            _count: { id: true },
            _sum: { views: true },
            orderBy: [
                { _sum: { views: "desc" } },
                { _count: { id: "desc" } },
            ],
            take: 4,
        });

        // Fetch user details for those authors
        const userIds = topUsers.map((u) => u.authorId);
        const users = await prisma.user.findMany({
            where: { id: { in: userIds } },
            select: { 
                id: true,
                name: true,
                imageUrl: true,
            },
        });

        const data = topUsers.map((u) => {
            const user = users.find((usr) => usr.id === u.authorId);
            return {
                ...user,
                totalStories: u._count.id,
                // totalViews: u._sum.views ?? 0,
            };
        });

        return res.status(200).json({
            success: true,
            message: "Fetched top-users successfully",
            data,
        });
    }
    catch (error: any) {
        console.log("Error while fetching top users: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while fetching top users",
        });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const validation = UserByIdRequestSchema.safeParse(req.params);

        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid userId",
            });
        }

        const { userId } = validation.data; 

        const [user, storyCountAndViews] = await Promise.all([
            prisma.user.findUnique({
                where: { id: userId },
                select: { 
                    id: true, 
                    name: true, 
                    imageUrl: true, 
                    createdAt: true,
                },
            }),
            prisma.story.aggregate({
                where: { authorId: userId },
                _count: { id: true },
                _sum: { views: true },
            }),
        ]);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User NOT found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            data: {
                ...user,
                totalStories: storyCountAndViews._count.id || 0,
                totalListeners: storyCountAndViews._sum.views || 0,
            },
        });
    }
    catch (error: any) {
        console.log("Error while fetching user profile: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while fetching user profile",
        });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const profileImage = req.files?.profileImage as UploadedFile | undefined;

        const validation = UpdateUserRequestSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Missing or Invalid Inputs",
            });
        }

        const name = validation.data.name;
        const user = await prisma.user.findUnique({ 
            where: { id: userId },
            select: { imageId: true },
        });
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User NOT found", 
            });
        }

        const data: Prisma.UserUpdateInput = {};

        data.name = name;
        if (profileImage) {
            const uploaded = await uploadImage(profileImage, { 
                folder: process.env.CLOUDINARY_IMAGE_FOLDER!, 
                width: 1000, 
                height: 1000,
            });
            data.imageUrl = uploaded.secure_url;
            data.imageId = uploaded.public_id;
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data,
            select: {
                id: true,
                name: true,
                imageUrl: true,
            },
        });

        // Delete previous user image after successful updation
        if (profileImage && user.imageId) {
            deleteResource(user.imageId)
                .catch(err => console.log("Failed to delete old image: ", err));
        }

        return res.status(200).json({
            success: true,
            message: "User details updated successfully",
            data: updatedUser,
        });
    }
    catch (error: any) {
        console.log("Error while updating user profile: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while updating user profile",
        });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;

        const user = await prisma.user.findUnique({ 
            where: { id: userId },
            include: {
                stories: {
                    select: {
                        audioId: true,
                        imageId: true,
                    },
                },
            },
        });
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User NOT found", 
            });
        }

        const publicIds: string[] = [];
        if (user.imageId) publicIds.push(user.imageId);
        user.stories.forEach(story => {
            publicIds.push(story.audioId);
            publicIds.push(story.imageId);
        });

        if (publicIds.length > 0) {
            await deleteBulkResources(publicIds);
        }

        await prisma.user.delete({ where: { id: userId } });

        res.clearCookie("token", {
            httpOnly: true,
        });

        return res.status(200).json({
            success: true,
            message: "User account deleted successfully",
        });
    }
    catch (error: any) {
        console.log("Error while deleting user account: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while deleting user account",
        });
    }
};
