import { Controller } from 'react-hook-form';

import { useRouteForm } from '@/hooks/useRouteForm';
import { PostRouteRequest, PostRouteResponse } from '@/types/route';

import { Button } from '../form/Button';
import { Input } from '../form/Input';

type RouteFormProps = {
    isFetching: boolean;
    fetchRouteData: (data: PostRouteRequest) => Promise<PostRouteResponse>;
};

export const RouteForm = ({ isFetching, fetchRouteData }: RouteFormProps) => {
    const { control, handleSubmit, onReset, onClear } = useRouteForm();

    return (
        <form className='space-y-4' onSubmit={handleSubmit(fetchRouteData)}>
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
                <Button type='submit' isLoading={isFetching}>
                    Submit
                </Button>

                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        onReset();
                    }}
                    variant='secondary'
                    disabled={isFetching}
                >
                    Reset
                </Button>
            </div>
        </form>
    );
};
