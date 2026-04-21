import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTheme } from '@/hooks';
import { ThemeProvider } from '@/context/ThemeContext';

describe('useTheme', () => {
  it('toggles theme', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });
    const initial = result.current.theme;
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).not.toBe(initial);
  });
});
