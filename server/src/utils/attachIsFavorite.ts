
export const attachIsFavorite = <T extends { favorites: { storyId: string }[] }>(stories: T[]) => {
    return stories.map(({ favorites, ...story }) => ({
        ...story,
        isFavorite: favorites.length > 0,
    }));
};
