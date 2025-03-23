import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

import { LoadingSpinnerIcon } from '@/components/icons/LoadingSpinnerIcon';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

type ButtonProps = {
    variant?: ButtonVariant;
    fullWidth?: boolean;
    isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
};

export const Button = ({
    variant = 'primary',
    fullWidth = false,
    isLoading = false,
    className,
    children,
    disabled,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={clsx(
                'relative rounded-md px-4 py-2 text-sm font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none',
                variantStyles[variant],
                {
                    'w-full': fullWidth,
                    'cursor-not-allowed opacity-75': disabled || isLoading,
                },
                className,
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            <span
                className={clsx('flex items-center justify-center', {
                    invisible: isLoading,
                })}
            >
                {children}
            </span>

            {!!isLoading && (
                <span className='absolute inset-0 flex items-center justify-center'>
                    <LoadingSpinnerIcon className='h-5 w-5 animate-spin text-white' />
                </span>
            )}
        </button>
    );
};
