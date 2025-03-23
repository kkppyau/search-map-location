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
        <main className='md:flex'>
            <div className='h-[30vh] w-full flex-col space-y-4 p-4 md:h-auto md:w-1/3'>
                <RouteForm
                    isFetching={isFetching}
                    fetchRouteData={fetchRouteData}
                />

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

            <div className='h-[70vh] w-full md:h-screen md:w-2/3'>
                <Map waypoints={routeData?.path || []} />
            </div>
        </main>
    );
}
