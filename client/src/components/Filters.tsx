import { Button } from "./ui/button";
import { FunnelX } from "lucide-react";
import { IndiaMap } from "./IndiaMap";
import { SelectStoryTag } from "./SelectStoryTag";
import type { FiltersProps } from "@/types/props";

export const Filters: React.FC<FiltersProps> = ({
    languages,
    categories,
    regions,
    values,
    onChange,
    onClear,
}) => {
    
    return (
        <div className="flex items-start max-lg:justify-center justify-between">
            <IndiaMap 
                region={values.region}
                setRegion={(val: string) => onChange("region", val)}
            />
            <div className="flex flex-col justify-start w-[280px] gap-6">
                <SelectStoryTag 
                    name="Language"
                    value={values.language}
                    valueType="name"
                    allValues={languages}
                    onChange={(val: string) => onChange("language", val)}
                />
                <SelectStoryTag 
                    name="Category"
                    value={values.category}
                    valueType="name"
                    allValues={categories}
                    onChange={(val: string) => onChange("category", val)}
                />
                <SelectStoryTag 
                    name="Region"
                    value={values.region}
                    valueType="name"
                    allValues={regions}
                    onChange={(val: string) => onChange("region", val)}
                />
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={onClear}
                    className="cursor-pointer bg-background-300 hover:bg-background-400 mt-8 w-full"
                >
                    <FunnelX className="size-4 mr-2" />
                    Clear All Filters
                </Button>
            </div>
        </div>
    );
};
