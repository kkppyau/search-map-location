export enum RouteStatus {
    'IN_PROGRESS' = 'in progress',
    'FAILURE' = 'failure',
    'SUCCESS' = 'success',
}

export type PostRouteRequest = {
    origin: string;
    destination: string;
};

export type PostRouteResponse = {
    token: string;
};

export type GetRouteResponse =
    | {
          status: RouteStatus.SUCCESS;
          path: [string, string][];
          total_distance: number;
          total_time: number;
      }
    | {
          status: RouteStatus.FAILURE;
          error: string;
      }
    | {
          status: RouteStatus.IN_PROGRESS;
      };
