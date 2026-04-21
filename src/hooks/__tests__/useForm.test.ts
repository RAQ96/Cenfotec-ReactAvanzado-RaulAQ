import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useForm } from '@/hooks';

describe('useForm', () => {
  it('handles change and validation', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues: { name: '' },
        validate: (v) => (v.name ? {} : { name: 'Requerido' }),
        onSubmit: () => {},
      })
    );
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: '', type: 'text' },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleBlur({
        target: { name: 'name' },
      } as React.FocusEvent<HTMLInputElement>);
      result.current.handleSubmit();
    });
    expect(result.current.errors.name).toBe('Requerido');
  });
});
