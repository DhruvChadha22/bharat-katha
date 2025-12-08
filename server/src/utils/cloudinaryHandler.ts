import { v2 as cloudinary, UploadApiOptions } from "cloudinary";
import { UploadedFile } from "express-fileupload";

interface UploadOptions {
    folder: string;
    width?: number;
    height?: number;
};

export const uploadImage = async (file: UploadedFile, { folder, width, height }: UploadOptions) => {
    try {
        if (!file.mimetype?.startsWith("image/")) {
            throw new Error("Uploaded file must be an image");
        }
        if (file.size && file.size > Number(process.env.CLOUDINARY_MAX_IMAGE_BYTES!)) {
            throw new Error("Image too large");
        }

        const options: UploadApiOptions = {
            folder,
            resource_type: "auto",
            quality: "auto",
        };

        if (width) options.width = width;
        if (height) options.height = height;

        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        console.log("Image uploaded to cloudinary: ", result);
        return result;
    }
    catch (error: any) {
        throw new Error("Error while Uploading Image");
    }
};

export const deleteResource = async (publicId: string, resourceType: "image" | "video" = "image") => {
    const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
    });
    console.log(`Deleted resource with public ID: ${publicId}`);
    return result;
};

export const deleteBulkResources = async (publicIds: string[]) => {
    const result = await cloudinary.api.delete_resources(publicIds);
    console.log(`Deleted bulk resources with public IDs: ${publicIds}`);
    return result;
};
