import { RouteStatus } from '@/types/route';

import { apiClient } from '../apiClient';
import { getRoute, postRoute } from '../apiService';

// Mock the apiClient
jest.mock('../apiClient', () => ({
    apiClient: {
        post: jest.fn(),
        get: jest.fn(),
    },
}));

describe('apiService', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    describe('postRoute', () => {
        it('should successfully create a route and return a token', async () => {
            const mockRequest = {
                origin: '22.372081,114.107877',
                destination: '22.2783,114.1747',
            };
            const mockResponse = {
                data: {
                    token: 'test-token-123',
                },
            };

            (apiClient.post as jest.Mock).mockResolvedValueOnce(mockResponse);

            const result = await postRoute(mockRequest);

            expect(apiClient.post).toHaveBeenCalledWith('/route', mockRequest);
            expect(result).toEqual(mockResponse.data);
        });

        it('should handle API errors', async () => {
            const mockRequest = {
                origin: '22.372081,114.107877',
                destination: '22.2783,114.1747',
            };
            const mockError = new Error('API Error');

            (apiClient.post as jest.Mock).mockRejectedValueOnce(mockError);

            await expect(postRoute(mockRequest)).rejects.toThrow('API Error');
        });
    });

    describe('getRoute', () => {
        it('should successfully get a route with success status', async () => {
            const mockToken = 'test-token-123';
            const mockResponse = {
                data: {
                    status: RouteStatus.SUCCESS,
                    path: [['22.372081,114.107877', '22.2783,114.1747']],
                    total_distance: 1000,
                    total_time: 300,
                },
            };

            (apiClient.get as jest.Mock).mockResolvedValueOnce(mockResponse);

            const result = await getRoute(mockToken);

            expect(apiClient.get).toHaveBeenCalledWith(`/route/${mockToken}`);
            expect(result).toEqual(mockResponse.data);
        });

        it('should handle in-progress status', async () => {
            const mockToken = 'test-token-123';
            const mockResponse = {
                data: {
                    status: RouteStatus.IN_PROGRESS,
                },
            };

            (apiClient.get as jest.Mock).mockResolvedValueOnce(mockResponse);

            const result = await getRoute(mockToken);

            expect(apiClient.get).toHaveBeenCalledWith(`/route/${mockToken}`);
            expect(result).toEqual(mockResponse.data);
        });

        it('should handle failure status', async () => {
            const mockToken = 'test-token-123';
            const mockResponse = {
                data: {
                    status: RouteStatus.FAILURE,
                    error: 'Route not found',
                },
            };

            (apiClient.get as jest.Mock).mockResolvedValueOnce(mockResponse);

            const result = await getRoute(mockToken);

            expect(apiClient.get).toHaveBeenCalledWith(`/route/${mockToken}`);
            expect(result).toEqual(mockResponse.data);
        });

        it('should handle API errors', async () => {
            const mockToken = 'test-token-123';
            const mockError = new Error('API Error');

            (apiClient.get as jest.Mock).mockRejectedValueOnce(mockError);

            await expect(getRoute(mockToken)).rejects.toThrow('API Error');
        });
    });
});
