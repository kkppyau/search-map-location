import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { routeFormSchema, RouteFormSchema } from '@/schemas/routeForm';

export const useRouteForm = () => {
    const { control, formState, handleSubmit, reset, setValue } =
        useForm<RouteFormSchema>({
            resolver: yupResolver(routeFormSchema),
            mode: 'onBlur',
            defaultValues: {
                origin: '',
                destination: '',
            },
        });

    const onReset = () => {
        reset();
    };

    const onClear = (field: keyof RouteFormSchema) => {
        setValue(field, '');
    };

    return {
        control,
        isSubmitting: formState.isSubmitting,
        handleSubmit,
        onReset,
        onClear,
    };
};
