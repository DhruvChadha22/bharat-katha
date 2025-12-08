import { Label } from "./ui/label";
import { 
    Select, 
    SelectContent, 
    SelectGroup, 
    SelectItem, 
    SelectLabel, 
    SelectTrigger, 
    SelectValue 
} from "./ui/select";
import type { SelectStoryTagProps } from "@/types/props";

export const SelectStoryTag: React.FC<SelectStoryTagProps> = ({
    name,
    value,
    valueType,
    allValues,
    disabled,
    onChange,
}) => {
    const handleOnChange = (newValue: string) => {
        if (newValue === "all") {
            newValue = "";
        }
        onChange(newValue);
    };

    return (
        <div className="flex flex-col gap-2.5">
            <Label className="text-[16px] leading-normal font-bold">
                {name}
            </Label>
            <Select
                value={value}
                defaultValue="all"
                onValueChange={handleOnChange}
                disabled={disabled}
            >
                <SelectTrigger className="w-full bg-background-300 text-[16px] leading-normal border-none focus-visible:ring-offset-primary-300">
                    <SelectValue placeholder={`Select ${name}`} />
                </SelectTrigger>
                <SelectContent className="text-[16px] leading-normal border-none bg-background-300 font-bold focus:ring-primary-300">
                    <SelectGroup>
                        <SelectLabel>{name}</SelectLabel>
                        <SelectItem value="all" className="focus:bg-background-400">
                            Select {name}
                        </SelectItem>
                        {allValues.map((val) => (
                            <SelectItem 
                                key={val.id} 
                                value={valueType === "id" ? val.id : val.name} 
                                className="focus:bg-secondary-200"
                            >
                                {val.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};
