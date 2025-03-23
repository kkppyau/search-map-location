import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
};

export const Button = ({
    variant = 'primary',
    fullWidth = false,
    className,
    children,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={clsx(
                'rounded-md px-4 py-2 text-sm font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none',
                variantStyles[variant],
                { 'w-full': fullWidth },
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
};
