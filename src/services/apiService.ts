import {
    GetRouteResponse,
    PostRouteRequest,
    PostRouteResponse,
} from '@/types/route';

import { apiClient } from './apiClient';

export const postRoute = async (
    body: PostRouteRequest,
): Promise<PostRouteResponse> => {
    const response = await apiClient.post('/route', body);
    return response.data;
};

export const getRoute = async (token: string): Promise<GetRouteResponse> => {
    const response = await apiClient.get(`/route/${token}`);
    return response.data;
};
