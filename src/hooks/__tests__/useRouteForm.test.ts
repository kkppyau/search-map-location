import { act, renderHook } from '@testing-library/react';

import { useRouteForm } from '../useRouteForm';

describe('useRouteForm', () => {
    it('should initialize with default values', () => {
        const { result } = renderHook(() => useRouteForm());

        expect(result.current.control._defaultValues).toEqual({
            origin: '',
            destination: '',
        });
    });

    it('should handle form reset', () => {
        const { result } = renderHook(() => useRouteForm());

        act(() => {
            result.current.onReset();
        });

        expect(result.current.control._defaultValues).toEqual({
            origin: '',
            destination: '',
        });
    });

    it('should handle field clearing', () => {
        const { result } = renderHook(() => useRouteForm());

        act(() => {
            result.current.onClear('origin');
        });

        expect(result.current.control._formValues.origin).toBe('');
    });

    it('should provide form submission handler', () => {
        const { result } = renderHook(() => useRouteForm());

        expect(typeof result.current.handleSubmit).toBe('function');
    });

    it('should track form submission state', () => {
        const { result } = renderHook(() => useRouteForm());

        expect(result.current.isSubmitting).toBe(false);
    });
});
