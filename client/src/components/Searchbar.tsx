import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import type { SearchbarProps } from "@/types/props";

export const Searchbar: React.FC<SearchbarProps> = ({
    search,
    setSearch
}) => {
    const [input, setInput] = useState<string>(search);
    const debounced = useDebounce(input, 500);

    useEffect(() => {
        setSearch(debounced);
    }, [debounced]);

    // Update input when URL changes externally (back/forward navigation)
    useEffect(() => {
        setInput(search);
    }, [search]);

    return (
        <div className="relative mt-8 block">
            <Input 
                className="text-[16px] leading-normal placeholder:text-[16px] placeholder:leading-normal bg-background-300 rounded-[6px] border-none py-6 pl-12 focus-visible:ring-offset-primary-300"
                placeholder="Search stories by title or author"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <img 
                src="/search.svg"
                alt="search"
                height={20}
                width={20}
                className="absolute left-4 top-3.5"
            />
        </div>
    );
};
