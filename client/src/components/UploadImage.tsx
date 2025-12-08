import { useRef, useState } from "react";
import { Input } from "./ui/input";
import type { UploadImageProps } from "@/types/props";

export const UploadImage: React.FC<UploadImageProps> = ({
    imageUrl,
    disabled,
    setImage,
}) => {
    const imageInputRef = useRef<HTMLInputElement>(null);

    const [previewSrc, setPreviewSrc] = useState<string | null>(imageUrl || null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setImage(file);
            handleFilePreview(file);
        }
    };

    const handleFilePreview = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSrc(reader.result as string);
        };
    };

    return (
        <div>
            <Input 
                type="file"
                className="hidden"
                disabled={disabled}
                ref={imageInputRef}
                onChange={handleFileChange}
            />
            {
                !previewSrc
                ? (
                    <div 
                        onClick={() => imageInputRef?.current?.click()}
                        className="flex items-center justify-center w-[250px] h-[250px] flex-col gap-3 cursor-pointer border-[3.2px] border-dashed border-slate-500 bg-background-400 rounded-lg"
                    >
                        <img 
                            src="/upload-image.svg" 
                            width={40} 
                            height={40} 
                            alt="upload"
                        />
                        <div className="flex flex-col items-center gap-1">
                            <h2 className="text-[14px] leading-normal font-bold text-primary-300">
                                Click to upload
                            </h2>
                            <p className="text-[14px] leading-normal font-medium text-black/70">SVG, PNG, JPG</p> 
                        </div>
                    </div>
                ) : (
                    <div 
                        onClick={() => imageInputRef?.current?.click()}
                        className="relative group size-fit cursor-pointer"
                    >
                        <img 
                            src={previewSrc}
                            width={250}
                            height={250}
                            className="aspect-square rounded-lg"
                            alt="image"
                        />
                        <div className="absolute inset-0 h-full w-full overflow-hidden bg-background-400 bg-fixed rounded-lg opacity-0 transition duration-300 ease-in-out group-hover:opacity-50" />
                        <div className="absolute top-[calc(50%-18px)] left-[calc(50%-18px)] hidden group-hover:block opacity-50">
                            <img 
                                src="/upload.svg"
                                width={36}
                                height={36}
                                alt="upload"
                            />
                        </div>
                    </div>
                )
            }
        </div>
    );
};
