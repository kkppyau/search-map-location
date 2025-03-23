import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { useRouteData } from '@/hooks/useRouteData';
import { routeFormSchema, RouteFormSchema } from '@/schemas/routeForm';

export const useRouteForm = () => {
    const { fetchRouteData } = useRouteData();

    const { control, handleSubmit, reset, setValue } = useForm<RouteFormSchema>(
        {
            resolver: yupResolver(routeFormSchema),
            mode: 'onBlur',
            defaultValues: {
                origin: '',
                destination: '',
            },
        },
    );

    const onSubmit = handleSubmit(async (data) => {
        await fetchRouteData({
            origin: data.origin.trim(),
            destination: data.destination.trim(),
        });
    });

    const onReset = () => {
        reset();
    };

    const onClear = (field: keyof RouteFormSchema) => {
        setValue(field, '');
    };

    return {
        control,
        onSubmit,
        onReset,
        onClear,
    };
};
