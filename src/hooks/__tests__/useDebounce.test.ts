import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '@/hooks/useDebounce';

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

describe('useDebounce', () => {
  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('init', 100));
    expect(result.current).toBe('init');
  });

  it('updates value after delay', async () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 100), {
      initialProps: { value: 'a' },
    });
    rerender({ value: 'b' });
    expect(result.current).toBe('a');
    await act(() => sleep(120));
    expect(result.current).toBe('b');
  });

  it('cancels update if value changes quickly', async () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 100), {
      initialProps: { value: 'a' },
    });
    rerender({ value: 'b' });
    rerender({ value: 'c' });
    await act(() => sleep(120));
    expect(result.current).toBe('c');
  });
});
