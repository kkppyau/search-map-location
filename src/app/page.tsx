'use client';

import dynamic from 'next/dynamic';
import { Controller } from 'react-hook-form';

import { Button } from '@/components/form/Button';
import { Input } from '@/components/form/Input';
import { useRouteData } from '@/hooks/useRouteData';
import { useRouteForm } from '@/hooks/useRouteForm';

const Map = dynamic(() => import('@/components/map/LeafletMap'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

export default function Home() {
    const { routeData } = useRouteData();
    const { control, onSubmit, onReset, onClear } = useRouteForm();

    return (
        <main className='flex'>
            <form className='space-y-4 p-4' onSubmit={onSubmit}>
                <Controller
                    control={control}
                    name='origin'
                    render={({ field, fieldState: { error } }) => (
                        <Input
                            label='Starting location'
                            {...field}
                            onClear={() => onClear('origin')}
                            error={error?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name='destination'
                    render={({ field, fieldState: { error } }) => (
                        <Input
                            label='Drop-off Point'
                            {...field}
                            onClear={() => onClear('destination')}
                            error={error?.message}
                        />
                    )}
                />

                <div className='flex space-x-2'>
                    <Button type='submit'>Submit</Button>

                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            onReset();
                        }}
                        variant='secondary'
                    >
                        Reset
                    </Button>
                </div>
            </form>

            <div className='h-screen w-full'>
                <Map waypoints={routeData.path} />
            </div>
        </main>
    );
}
