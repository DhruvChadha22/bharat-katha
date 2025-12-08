import { Github, Linkedin, Mail } from "lucide-react";

export const navLinks = [
    { 
        name: "Home", 
        href: "#", 
    },
    { 
        name: "Features", 
        href: "#features", 
    },
    { 
        name: "About", 
        href: "#about", 
    },
];

export const sidebarLinks = [
    {
        route: "/home",
        label: "Home",
        imageUrl: "/home.svg",
    },
    {
        route: "/discover",
        label: "Discover",
        imageUrl: "/discover.svg",
    },
    {
        route: "/create-story",
        label: "Create Story",
        imageUrl: "/microphone.svg",
    },
    {
        route: "/profiles",
        label: "Profile",
        imageUrl: "/profile.svg",
    },
    {
        route: "/favorites",
        label: "My Favorites",
        imageUrl: "/thumbs-up.svg",
    },
];

export const features = [
    {
        title: "Create and Share Stories Effortlessly",
        description: "Write your story and let AI convert your transcript into natural audio narration. No recording equipment required.",
        src: "microphone2.svg",
    },
    {
        title: "Listen, Discover and Save Favorites",
        description: "Explore stories from creators across India. Listen anytime, save your favorites, and build your personal story library.",
        src: "headphones.svg",
    },
    {
        title: "Languages, Regions and Rich Categories",
        description: "Browse by language, category or region and experience cultural diversity through storytelling.",
        src: "globe2.svg",
    },
    {
        src: "fire.svg",
        title: "Trending Stories and Top Creators",
        description: "See what's popular right now. Discover top storytellers, most loved stories and emerging voices from the community.",
    },
];

export const socials = [
    {
        title: "Mail Id",
        url: "mailto:dhruvchadha121@gmail.com",
        icon: Mail,
    },
    {
        title: "GitHub",
        url: "https://github.com/DhruvChadha22",
        icon: Github,
    },
    {
        title: "LinkedIn",
        url: "https://www.linkedin.com/in/dhruv-chadha-71b2a322a",
        icon: Linkedin,
    },
];
