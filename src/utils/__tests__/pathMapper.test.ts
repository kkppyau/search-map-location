import { transformPathCoordinates } from '../pathMapper';

describe('transformPathCoordinates', () => {
    it('should return empty array when path is undefined', () => {
        const result = transformPathCoordinates(undefined);
        expect(result).toEqual([]);
    });

    it('should return empty array when path is null', () => {
        const result = transformPathCoordinates(null as any);
        expect(result).toEqual([]);
    });

    it('should transform string coordinates to numbers', () => {
        const input: [string, string][] = [
            ['22.2783', '114.1747'],
            ['22.2784', '114.1748'],
        ];
        const expected: [number, number][] = [
            [22.2783, 114.1747],
            [22.2784, 114.1748],
        ];
        const result = transformPathCoordinates(input);
        expect(result).toEqual(expected);
    });

    it('should handle decimal coordinates correctly', () => {
        const input: [string, string][] = [
            ['-22.2783', '114.1747'],
            ['22.2784', '-114.1748'],
        ];
        const expected: [number, number][] = [
            [-22.2783, 114.1747],
            [22.2784, -114.1748],
        ];
        const result = transformPathCoordinates(input);
        expect(result).toEqual(expected);
    });

    it('should handle single coordinate pair', () => {
        const input: [string, string][] = [['22.2783', '114.1747']];
        const expected: [number, number][] = [[22.2783, 114.1747]];
        const result = transformPathCoordinates(input);
        expect(result).toEqual(expected);
    });
});
