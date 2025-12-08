import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { SelectStoryTag } from "./SelectStoryTag";
import { 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import type { StoryInfoFormProps } from "@/types/props";

export const StoryInfoForm: React.FC<StoryInfoFormProps> = ({
    form,
    selectedTags,
    categories,
    regions,
    disabled,
    setSelectedTags,
}) => {
    
    return (
        <div className="flex flex-col gap-[30px] border-b-2 border-background-400 pb-10">
            <FormField
                control={form.control}
                name="title"
                disabled={disabled}
                render={({ field }) => (
                    <FormItem className="flex flex-col gap-2.5">
                        <FormLabel className="text-[16px] leading-normal font-bold">Title</FormLabel>
                        <FormControl>
                            <Input 
                                className="text-[16px] leading-normal placeholder:text-[16px] placeholder:leading-normal bg-background-300 rounded-[6px] border-none focus-visible:ring-offset-primary-300" 
                                placeholder="Enter story title" {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="description"
                disabled={disabled}
                render={({ field }) => (
                    <FormItem className="flex flex-col gap-2.5">
                        <FormLabel className="text-[16px] leading-normal font-bold">Description</FormLabel>
                        <FormControl>
                            <Textarea 
                                className="text-[16px] leading-normal placeholder:text-[16px] placeholder:leading-normal resize-none max-h-24 max-w-full bg-background-300 rounded-[6px] border-none focus-visible:ring-offset-primary-300" 
                                placeholder="Write a short description" {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="flex flex-col justify-start w-full gap-6">
                <SelectStoryTag 
                    name="Category"
                    value={selectedTags.categoryId}
                    valueType="id"
                    allValues={categories}
                    disabled={disabled}
                    onChange={(val: string) => setSelectedTags(prev => ({
                        ...prev,
                        categoryId: val,
                    }))}
                />
                <SelectStoryTag 
                    name="Region"
                    value={selectedTags.regionId}
                    valueType="id"
                    allValues={regions}
                    disabled={disabled}
                    onChange={(val: string) => setSelectedTags(prev => ({
                        ...prev,
                        regionId: val,
                    }))}
                />
            </div>
        </div>
    );
};
