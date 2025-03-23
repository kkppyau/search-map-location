import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { getRoute, postRoute } from '@/services/apiService';
import { RouteStatus } from '@/types/route';
import { transformPathCoordinates } from '@/utils/pathMapper';

import { useRouteData } from '../useRouteData';

jest.mock('@/services/apiService');
jest.mock('@/utils/pathMapper');

const mockPostRoute = postRoute as jest.MockedFunction<typeof postRoute>;
const mockGetRoute = getRoute as jest.MockedFunction<typeof getRoute>;
const mockTransformPathCoordinates =
    transformPathCoordinates as jest.MockedFunction<
        typeof transformPathCoordinates
    >;

describe('useRouteData', () => {
    let queryClient: QueryClient;

    beforeEach(() => {
        queryClient = new QueryClient();
        jest.clearAllMocks();
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );

    it('should initialize with default values', () => {
        const { result } = renderHook(() => useRouteData(), { wrapper });

        expect(result.current).toEqual({
            routeData: {
                path: undefined,
            },
            fetchRouteData: expect.any(Function),
            isFetching: false,
            error: undefined,
        });
    });

    it('should handle successful route fetch', async () => {
        const mockToken = 'test-token';
        const mockPath: [string, string][] = [
            ['1', '1'],
            ['2', '2'],
        ];
        const mockTransformedPath: [number, number][] = [
            [1, 2],
            [2, 3],
        ];

        mockPostRoute.mockResolvedValueOnce({ token: mockToken });
        mockGetRoute.mockResolvedValueOnce({
            status: RouteStatus.SUCCESS,
            path: mockPath,
            total_distance: 100,
            total_time: 100,
        });
        mockTransformPathCoordinates.mockReturnValue(mockTransformedPath);

        const { result } = renderHook(() => useRouteData(), { wrapper });

        // Trigger route fetch
        await result.current.fetchRouteData({
            origin: '1',
            destination: '2',
        });

        await waitFor(() => {
            expect(result.current.routeData).toEqual({
                status: RouteStatus.SUCCESS,
                path: mockTransformedPath,
                total_distance: 100,
                total_time: 100,
            });
            expect(result.current.isFetching).toBe(false);
            expect(result.current.error).toBeUndefined();
        });
    });

    it('should handle IN_PROGRESS status', async () => {
        const mockToken = 'test-token';

        mockPostRoute.mockResolvedValueOnce({ token: mockToken });
        mockGetRoute.mockRejectedValueOnce({
            status: RouteStatus.IN_PROGRESS,
        });

        const { result } = renderHook(() => useRouteData(), { wrapper });

        await result.current.fetchRouteData({
            origin: '1',
            destination: '2',
        });

        await waitFor(() => {
            expect(result.current.error).toBe(undefined);
        });
    });

    it('should handle FAILURE status', async () => {
        const mockToken = 'test-token';
        const errorMessage = 'Location not accessible by car';

        mockPostRoute.mockResolvedValueOnce({ token: mockToken });
        mockGetRoute.mockResolvedValueOnce({
            status: RouteStatus.FAILURE,
            error: errorMessage,
        });

        const { result } = renderHook(() => useRouteData(), { wrapper });

        await result.current.fetchRouteData({
            origin: '1',
            destination: '2',
        });

        await waitFor(() => {
            expect(result.current.error).toBe(errorMessage);
        });
    });

    it('should keep retrying when status remains IN_PROGRESS', async () => {
        // Configure QueryClient with shorter retry delays for testing
        queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: true,
                    retryDelay: 0,
                    staleTime: 0,
                },
            },
        });

        const mockToken = 'test-token';

        mockPostRoute.mockResolvedValueOnce({ token: mockToken });

        // Mock getRoute to return IN_PROGRESS status multiple times before success
        mockGetRoute
            .mockResolvedValueOnce({ status: RouteStatus.IN_PROGRESS })
            .mockResolvedValueOnce({ status: RouteStatus.IN_PROGRESS })
            .mockResolvedValueOnce({ status: RouteStatus.IN_PROGRESS })
            .mockResolvedValueOnce({
                status: RouteStatus.SUCCESS,
                path: [
                    ['1', '1'],
                    ['2', '2'],
                ],
                total_distance: 100,
                total_time: 100,
            });

        const { result } = renderHook(() => useRouteData(), { wrapper });

        await result.current.fetchRouteData({
            origin: '1',
            destination: '2',
        });

        // Wait for all retries to complete
        await waitFor(() => {
            // Should have been called 4 times (3 IN_PROGRESS + 1 SUCCESS)
            expect(mockGetRoute).toHaveBeenCalledTimes(4);
            expect(result.current.routeData).toBeDefined();
            expect(result.current.error).toBeUndefined();
        });

        // Verify the sequence of states
        expect(mockGetRoute.mock.calls).toHaveLength(4);
        expect(mockGetRoute).toHaveBeenCalledWith(mockToken);
    });

    it('should handle mutation error', async () => {
        const errorMessage = 'Network error';
        mockPostRoute.mockRejectedValueOnce(new Error(errorMessage));

        const { result } = renderHook(() => useRouteData(), { wrapper });

        await result.current
            .fetchRouteData({
                origin: '1',
                destination: '2',
            })
            .catch(() => {
                /* ignore error */
            });

        await waitFor(() => {
            expect(result.current.error).toBe(errorMessage);
        });
    });

    it('should handle empty token returned', async () => {
        const errorMessage = 'Location not accessible by car';

        mockPostRoute.mockResolvedValueOnce({
            token: undefined as unknown as string,
        });
        mockGetRoute.mockResolvedValueOnce({
            status: RouteStatus.FAILURE,
            error: errorMessage,
        });

        const { result } = renderHook(() => useRouteData(), { wrapper });

        await result.current.fetchRouteData({
            origin: '1',
            destination: '2',
        });

        await waitFor(() => {
            expect(result.current.error).toBe(errorMessage);
        });
    });
});
