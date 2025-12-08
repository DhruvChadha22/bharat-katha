import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
};

export const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

export const formatDate = (createdAt: Date) => {
    const date = new Date(createdAt);
    const formatterCustom = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    return formatterCustom.format(date);
};

export const formatViewsWithSuffix = (views: number) => {
    if (views < 1000) return views.toString();

    const format = (divisor: number, suffix: string) => {
        const val = views / divisor;
        const formatted = val.toFixed(1);
        return (formatted.endsWith(".0") ? formatted.slice(0, -2) : formatted) + suffix;
    };

    if (views < 100000) return format(1000, "K");
    if (views < 10000000) return format(100000, "L");
    return format(10000000, "Cr");
};

export const formatViewsWithCommas = (views: number) => {
    const str = views.toString();

    if (str.length <= 3) return str;

    const lastThree = str.slice(-3);
    const rest = str.slice(0, -3);

    // Add commas every two digits in the remaining part
    const formattedRest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");

    return formattedRest + "," + lastThree;
};
