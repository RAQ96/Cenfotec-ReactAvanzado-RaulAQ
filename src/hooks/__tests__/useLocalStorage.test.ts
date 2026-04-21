import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

describe('useLocalStorage', () => {
  it('sets and gets value', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'init'));
    act(() => {
      result.current[1]('nuevo');
    });
    expect(result.current[0]).toBe('nuevo');
  });
});
