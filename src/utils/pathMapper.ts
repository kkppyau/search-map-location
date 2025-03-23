/**
 * Transforms path coordinates from string format to number format
 * @param path - Optional array of coordinate pairs in string format [string, string][]
 * @return Array of coordinate pairs in number format [number, number][]. Returns empty array if path is undefined or null
 */
export const transformPathCoordinates = (
    path?: [string, string][],
): [number, number][] => {
    if (!path) {
        return [];
    }

    return path.map(([lat, lng]) => [parseFloat(lat), parseFloat(lng)]);
};
