import { Request, Response } from "express";
import { prisma } from "../config/db";
import { AddFavoriteStoryRequestSchema, DeleteFavoriteStoryRequestSchema } from "../schemas/favorites.schema";

export const getAllFavoriteStories = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;

        const stories = await prisma.favorite.findMany({ 
            where: { userId },
            select: {
                story: {
                    select: {
                        id: true,
                        title: true,
                        imageUrl: true,
                        author: { select: { name: true } },
                        language: { select: { name: true } },
                    }
                },
            },
        });

        const storiesWithFavorites = stories.map(s => ({
            ...s.story,
            isFavorite: true,
        }));

        return res.status(200).json({
            success: true,
            message: "Favorite stories fetched successfully",
            data: storiesWithFavorites,
        });
    }
    catch (error: any) {
        console.log("Error getting all favorite stories: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error getting all favorite stories",
        });
    }
};

export const addStoryToFavorites = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;

        const validation = AddFavoriteStoryRequestSchema.safeParse(req.params);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid storyId",
            });
        }

        const { storyId } = validation.data;
        const [user, story] = await Promise.all([
            prisma.user.findUnique({ where: { id: userId } }),
            prisma.story.findUnique({ 
                where: { id: storyId },
                select: {
                    id: true,
                    favorites: {
                        where: { userId },
                    },
                }
            }),
        ]);
        
        if (!user || !story) {
            return res.status(404).json({
                success: false,
                message: "User or Story NOT found",
            });
        }

        if (story.favorites.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Story is already in favorites",
            });
        }

        await prisma.favorite.create({
            data: {
                userId,
                storyId,
            },
        });

        return res.status(200).json({
            success: true,
            message: "Story added to favorites",
        });
    }
    catch (error: any) {
        console.log("Error adding story to favorites: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error adding story to favorites",
        });
    }
};

export const removeStoryFromFavorites = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;

        const validation = DeleteFavoriteStoryRequestSchema.safeParse(req.params);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid storyId",
            });
        }

        const { storyId } = validation.data;
        const existingFavorite = await prisma.favorite.findUnique({
            where: {
                userId_storyId: {
                    userId,
                    storyId,
                }
            },
        });

        if (!existingFavorite) {
            return res.status(404).json({
                success: false,
                message: "Story NOT in favorites",
            });
        }

        await prisma.favorite.delete({
            where: {
                userId_storyId: {
                    userId,
                    storyId,
                }
            },
        });
        
        return res.status(200).json({
            success: true,
            message: "Story removed from favorites",
        });
    }
    catch (error: any) {
        console.log("Error removing story from favorites: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error removing story from favorites",
        });
    }
};
