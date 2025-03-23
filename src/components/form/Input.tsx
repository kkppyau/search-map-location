import { clsx } from 'clsx';
import { InputHTMLAttributes } from 'react';

import { ClearIcon } from '@/components/icons/ClearIcon';

type InputProps = {
    label?: string;
    error?: string;
    onClear?: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
    label,
    error,
    className,
    value,
    onChange,
    onClear,
    ...props
}: InputProps) => {
    return (
        <div className='flex flex-col gap-1'>
            {!!label && (
                <label className='text-sm font-medium text-gray-700'>
                    {label}
                </label>
            )}

            <div className='relative'>
                <input
                    className={clsx(
                        `w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`,
                        { 'border-red-500': error },
                        className,
                    )}
                    value={value}
                    onChange={onChange}
                    {...props}
                />

                {!!value && (
                    <button
                        type='button'
                        onClick={onClear}
                        className='absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                    >
                        <ClearIcon className='h-4 w-4' />
                    </button>
                )}
            </div>

            {!!error && <span className='text-sm text-red-500'>{error}</span>}
        </div>
    );
};
