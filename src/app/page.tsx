'use client';

import dynamic from 'next/dynamic';

import { RouteForm } from '@/components/features/RouteForm';
import { useRouteData } from '@/hooks/useRouteData';
import { RouteStatus } from '@/types/route';

const Map = dynamic(() => import('@/components/map/MapView'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

export default function Home() {
    const { routeData, isFetching, error, fetchRouteData } = useRouteData();

    return (
        <main className='flex'>
            <div className='flex w-1/3 flex-col gap-4 p-4'>
                <RouteForm
                    isFetching={isFetching}
                    fetchRouteData={fetchRouteData}
                />

                <div>
                    {routeData?.status === RouteStatus.SUCCESS && (
                        <div className='rounded-md bg-green-50 p-4 text-green-800'>
                            <p>Total Distance: {routeData.total_distance}</p>
                            <p>Total Time: {routeData.total_time}</p>
                        </div>
                    )}

                    {!!error && (
                        <div className='rounded-md bg-red-50 p-4 text-red-800'>
                            <p>Error: {error}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className='h-screen w-2/3'>
                <Map waypoints={routeData?.path || []} />
            </div>
        </main>
    );
}
