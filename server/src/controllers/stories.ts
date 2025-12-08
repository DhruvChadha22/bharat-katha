import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../config/db";
import { UploadedFile } from "express-fileupload";
import { attachIsFavorite } from "../utils/attachIsFavorite";
import { deleteBulkResources, deleteResource, uploadImage } from "../utils/cloudinaryHandler";
import { 
    SearchStoriesRequestSchema, 
    StoriesByCategoryRequestSchema, 
    StoriesByAuthorRequestSchema, 
    StoriesByIdRequestSchema, 
    CreateStoryRequestSchema, 
    DeleteStoryRequestSchema,
    UpdateStoryRequestSchema,
} from "../schemas/stories.schema";

export const getStoriesBySearch = async (req: Request, res: Response) => {
    try {
        const viewerId = req.user!.id;
        const validation = SearchStoriesRequestSchema.safeParse(req.query);

        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid query parameters",
            });
        }

        const { search, languageId, categoryId, regionId } = validation.data;

        if (!search) {
            const stories = await prisma.story.findMany({
                where: {
                    ...(languageId ? { languageId } : {}),
                    ...(categoryId ? { categoryId } : {}),
                    ...(regionId ? { regionId } : {}),
                },
                take: 12,
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    title: true,
                    imageUrl: true,
                    author: { select: { name: true } },
                    language: { select: { name: true } },
                    favorites: {
                        where: { userId: viewerId },
                        select: { storyId: true },
                    },
                },
            });

            const storiesWithFavorites = attachIsFavorite(stories);

            return res.status(200).json({
                success: true,
                message: "Stories fetched successfully",
                data: storiesWithFavorites,
            });
        }
        
        const filters: Prisma.Sql[] = [];
        if (languageId) filters.push(Prisma.sql`s."languageId" = ${languageId}`);
        if (categoryId) filters.push(Prisma.sql`s."categoryId" = ${categoryId}`);
        if (regionId) filters.push(Prisma.sql`s."regionId" = ${regionId}`);

        const whereClause = Prisma.sql`
            WHERE (
                s.title ILIKE '%' || ${search} || '%' OR
                u.name ILIKE '%' || ${search} || '%' OR
                s.title % ${search} OR
                u.name % ${search}
            )
                ${filters.length ? Prisma.sql` AND ${Prisma.join(filters, " AND ")}` : Prisma.empty}
        `;

        const query = Prisma.sql`
            SELECT 
                s.id, s.title, s."imageUrl", u.name as author, l.name as language,
                CASE WHEN f."userId" IS NOT NULL THEN true ELSE false END as "isFavorite",
                GREATEST(similarity(s.title, ${search}), similarity(u.name, ${search})) as relevance
            FROM "Story" s
            JOIN "User" u ON s."authorId" = u.id
            JOIN "Language" l ON s."languageId" = l.id
            JOIN "Category" c ON s."categoryId" = c.id
            JOIN "Region" r ON s."regionId" = r.id
            LEFT JOIN "Favorite" f ON f."storyId" = s.id AND f."userId" = ${viewerId}
            ${whereClause}
            ORDER BY relevance DESC
            LIMIT 12;
        `;

        const stories: any[] = await prisma.$queryRaw(query);
        const data = stories.map(({ relevance, author, language, ...rest }) => ({
            ...rest,
            author: { name: author },
            language: { name: language },
        }));

        return res.status(200).json({
            success: true,
            message: "Stories fetched successfully",
            data,
        });
    }
    catch (error: any) {
        console.log("Error while fetching stories: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while fetching stories",
        });
    }
};

export const getStoriesByCategory = async (req: Request, res: Response) => {
    try {
        const viewerId = req.user!.id;

        const validation = StoriesByCategoryRequestSchema.safeParse({ 
            categoryId: req.params.categoryId, 
            excludeId: req.query.excludeId,
        });
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid input params",
            });
        }

        const { categoryId, excludeId } = validation.data;
        const stories = await prisma.story.findMany({
            where: { 
                categoryId,
                ...(excludeId ? { id: { not: excludeId } } : {}),
            },
            take: 4,
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                title: true,
                imageUrl: true,
                author: { select: { name: true } },
                language: { select: { name: true } },
                favorites: {
                    where: { userId: viewerId },
                    select: { storyId: true },
                },
            },
        });

        const storiesWithFavorites = attachIsFavorite(stories);

        return res.status(200).json({
            success: true,
            message: "Stories fetched by category",
            data: storiesWithFavorites,
        });
    }
    catch (error: any) {
        console.log("Error while fetching stories by category: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while fetching stories by category",
        });
    }
};

export const getStoriesByAuthor = async (req: Request, res: Response) => {
    try {
        const viewerId = req.user!.id;

        const validation = StoriesByAuthorRequestSchema.safeParse({
            authorId: req.params.authorId, 
            page: req.query.page,
            limit: req.query.limit,
        });
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid input params",
            });
        }

        const { 
            authorId,
            page,
            limit,
        } = validation.data; 
        const skip = (page - 1) * limit;

        const [stories, storyCount] = await Promise.all([
            prisma.story.findMany({
                where: { authorId: authorId },
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    title: true,
                    imageUrl: true,
                    author: { select: { name: true } },
                    language: { select: { name: true } },
                    favorites: {
                        where: { userId: viewerId },
                        select: { storyId: true },
                    },
                },
            }),
            prisma.story.aggregate({
                where: { authorId: authorId },
                _count: { id: true },
            }),
        ]);

        const storiesWithFavorites = attachIsFavorite(stories);
        const totalStories = storyCount._count.id || 0;
        const totalPages = totalStories > 0 ? Math.ceil(totalStories / limit) : 1;

        return res.status(200).json({
            success: true,
            message: "Stories fetched by author",
            data: {
                stories: storiesWithFavorites,
                pagination: {
                    page,
                    limit,
                    totalStories,
                    totalPages,
                },
            }
        });
    }
    catch (error: any) {
        console.log("Error while fetching stories by author: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while fetching stories by author",
        });
    }
};

// Get the most viewed stories
export const getTrendingStories = async (req: Request, res: Response) => {
    try {
        const viewerId = req.user!.id;

        const stories = await prisma.story.findMany({
            orderBy: { views: "desc" },
            take: 4,
            select: {
                id: true,
                title: true,
                imageUrl: true,
                author: { select: { name: true } },
                language: { select: { name: true } },
                favorites: {
                    where: { userId: viewerId },
                    select: { storyId: true },
                },
            },
        });

        const storiesWithFavorites = attachIsFavorite(stories);

        return res.status(200).json({
            success: true,
            message: "Trending stories fetched successfully",
            data: storiesWithFavorites,
        });
    }
    catch (error: any) {
        console.log("Error while fetching trending stories: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while fetching trending stories",
        });
    }
};

export const getLatestStories = async (req: Request, res: Response) => {
    try {
        const stories = await prisma.story.findMany({
            orderBy: { createdAt: "desc" },
            take: 4,
            select: {
                id: true,
                title: true,
                imageUrl: true,
                views: true,
                duration: true,
                language: { select: { name: true } },
            },
        });

        return res.status(200).json({
            success: true,
            message: "Latest stories fetched successfully",
            data: stories,
        });
    }
    catch (error: any) {
        console.log("Error while fetching latest stories: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while fetching latest stories",
        });
    }
};

// Get most favorited stories
export const getPopularStories = async (req: Request, res: Response) => {
    try {
        const stories = await prisma.story.findMany({
            orderBy: { favorites: { _count: "desc" } },
            take: 4,
            select: {
                id: true,
                title: true,
                imageUrl: true,
                author: { select: { name: true } },
                _count: { select: { favorites: true } },
            },
        });

        return res.status(200).json({
            success: true,
            message: "Popular stories fetched successfully",
            data: stories,
        });
    }
    catch (error: any) {
        console.log("Error while fetching popular stories: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while fetching popular stories",
        });
    }
};

export const getStoryById = async (req: Request, res: Response) => {
    try {
        const viewerId = req.user!.id;

        const validation = StoriesByIdRequestSchema.safeParse(req.params);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid storyId param",
            });
        }

        const { storyId } = validation.data;
        const story = await prisma.story.findUnique({
            where: { id: storyId },
            select: {
                id: true,
                title: true,
                description: true,
                transcript: true,
                imageUrl: true,
                audioUrl: true,
                duration: true,
                views: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                        imageUrl: true,
                    },
                },
                language: { select: { name: true } },
                region: { 
                    select: { 
                        id: true,
                        name: true, 
                    },
                },
                category: { 
                    select: { 
                        id: true,
                        name: true, 
                    },
                },
                favorites: {
                    where: { userId: viewerId },
                    select: { storyId: true },
                },
            },
        });

        if (!story) {
            return res.status(404).json({
                success: false,
                message: "Story NOT found",
            });
        }

        await prisma.story.update({
            where: { id: storyId },
            data: { views: { increment: 1 } },
        });

        const isFavorite = story.favorites.length > 0;
        const { favorites, ...storyData } = story;

        return res.status(200).json({
            success: true,
            message: "Story fetched successfully",
            data: {
                ...storyData,
                isFavorite,
            },
        });
    }
    catch (error: any) {
        console.log("Error while fetching story: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while fetching story",
        });
    }
};

export const createStory = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const storyImage = req.files?.storyImage as UploadedFile | undefined;

        const validation = CreateStoryRequestSchema.safeParse(req.body);
        if (!validation.success || !storyImage) {
            return res.status(400).json({
                success: false,
                message: "Missing or Invalid Inputs",
            });
        }

        const {
            title,
            description,
            transcript,
            audioUrl,
            audioId,
            languageId,
            categoryId,
            regionId,
            duration,
        } = validation.data;

        const [user, language, category, region] = await Promise.all([
            prisma.user.findUnique({ where: { id: userId } }),
            prisma.language.findUnique({ where: { id: languageId } }),
            prisma.category.findUnique({ where: { id: categoryId } }),
            prisma.region.findUnique({ where: { id: regionId } }),
        ]);

        if (!user || !language || !category || !region) {
            return res.status(400).json({
                success: false,
                message: "Invalid userId / languageId / categoryId / regionId",
            });
        }

        const uploaded = await uploadImage(storyImage, { 
            folder: process.env.CLOUDINARY_IMAGE_FOLDER!, 
            width: 1000, 
            height: 1000,
        });

        let story;
        try {
            story = await prisma.story.create({
                data: {
                    title,
                    description,
                    transcript,
                    audioUrl,
                    audioId,
                    imageUrl: uploaded.secure_url,
                    imageId: uploaded.public_id,
                    authorId: userId,
                    languageId,
                    categoryId,
                    regionId,
                    duration,
                    views: 0,
                },
                select: { id: true },
            });
        }
        catch (dbError: any) {
            await deleteResource(uploaded.public_id);
            throw new Error(dbError.message);
        }

        return res.status(201).json({
            success: true,
            message: "Story created successfully",
            data: story,
        });
    }
    catch (error: any) {
        console.log("Error while creating story: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while creating story",
        });
    }
};

export const updateStory = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const storyImage = req.files?.storyImage as UploadedFile | undefined;

        const validation = UpdateStoryRequestSchema.safeParse({
            storyId: req.params.storyId,    
            ...req.body,
        });
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Missing or Invalid Inputs",
            });
        }

        const {
            storyId,
            title,
            description,
            categoryId,
            regionId,
        } = validation.data;

        const [story, category, region] = await Promise.all([
            prisma.story.findUnique({
                where: { id: storyId },
                select: {
                    imageId: true,
                    author: {
                        select: { id: true },
                    },
                },
            }),
            prisma.category.findUnique({
                where: { id: categoryId },
            }),
            prisma.region.findUnique({
                where: { id: regionId },
            }),
        ]);
        if (!story || !category || !region) {
            return res.status(404).json({ 
                success: false, 
                message: "Story/Category/Region NOT found", 
            });
        }
        if (userId !== story.author.id) {
            return res.status(403).json({
                success: false,
                message: "Story has a different author",
            });
        }

        const updateData: Prisma.StoryUpdateInput = {
            title,
            description,
            category: { connect: { id: categoryId } },
            region: { connect: { id: regionId } },
        };

        if (storyImage) {
            const uploaded = await uploadImage(storyImage, { 
                folder: process.env.CLOUDINARY_IMAGE_FOLDER!, 
                width: 1000, 
                height: 1000,
            });
            updateData.imageUrl = uploaded.secure_url;
            updateData.imageId = uploaded.public_id;
        }

        const updatedStory = await prisma.story.update({
            where: { id: storyId },
            data: updateData,
            select: {
                id: true,
                title: true,
                description: true,
                imageUrl: true,
                categoryId: true,
                regionId: true,
            },
        });

        // Delete previous story image after successful updation
        if (storyImage) {
            deleteResource(story.imageId)
                .catch(err => console.log("Failed to delete old image: ", err));
        }

        return res.status(200).json({
            success: true,
            message: "Story details updated successfully",
            data: updatedStory,
        });
    }
    catch (error: any) {
        console.log("Error while updating story: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while updating story",
        });
    }
};

export const deleteStory = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;

        const validation = DeleteStoryRequestSchema.safeParse(req.params);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid storyId param",
            });
        }

        const { storyId } = validation.data;
        const story = await prisma.story.findFirst({
            where: {
                id: storyId,
                authorId: userId,
            },
            select: {
                imageId: true,
                audioId: true,
            },
        });

        if (!story) {
            return res.status(404).json({
                success: false,
                message: "Story NOT found",
            });
        }

        await deleteBulkResources([story.imageId, story.audioId]);
        await prisma.story.delete({ where: { id: storyId } });

        return res.status(200).json({
            success: true,
            message: "Story deleted successfully",
        });
    }
    catch (error: any) {
        console.log("Error while deleting story: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while deleting story",
        });
    }
};
