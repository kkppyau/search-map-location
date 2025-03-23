import * as yup from 'yup';

export const routeFormSchema = yup.object({
    origin: yup.string().required('Starting location is required'),
    destination: yup.string().required('Drop-off point is required'),
});

export type RouteFormSchema = yup.InferType<typeof routeFormSchema>;
