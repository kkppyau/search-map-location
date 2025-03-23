import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

import { GET_ROUTE_QUERY_KEY } from '@/constants/queryKeys';
import { getRoute, postRoute } from '@/services/apiService';
import {
    PostRouteRequest,
    PostRouteResponse,
    RouteStatus,
} from '@/types/route';
import { transformPathCoordinates } from '@/utils/pathMapper';

export const useRouteData = () => {
    const queryClient = useQueryClient();

    const routeTokenMutation = useMutation<
        PostRouteResponse,
        Error,
        PostRouteRequest
    >({
        mutationFn: postRoute,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [GET_ROUTE_QUERY_KEY, data],
            });
        },
    });

    const routeQuery = useQuery({
        queryKey: [GET_ROUTE_QUERY_KEY, routeTokenMutation.data],
        queryFn: async () => {
            const res = await getRoute(routeTokenMutation?.data?.token || '');

            if (res.status === RouteStatus.IN_PROGRESS) {
                throw new Error(res.status);
            }

            if (res.status === RouteStatus.FAILURE) {
                throw new Error(res.error);
            }

            return res;
        },
        enabled: !!routeTokenMutation.data,
        retry: (failureCount, error) =>
            error.message === RouteStatus.IN_PROGRESS,
    });

    const routeData = useMemo(() => {
        const transformedWaypoints = transformPathCoordinates(
            routeQuery.data?.path,
        );

        return {
            ...routeQuery.data,
            path: transformedWaypoints,
        };
    }, [routeQuery.data]);

    return {
        routeData,
        fetchRouteData: routeTokenMutation.mutateAsync,
        isFetching: routeTokenMutation.isPending || routeQuery.isFetching,
        error: routeTokenMutation.error?.message || routeQuery.error?.message,
    };
};
