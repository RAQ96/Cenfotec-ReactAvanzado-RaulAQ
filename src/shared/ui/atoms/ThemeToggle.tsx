'use client'; // Client Component — usa useTheme y maneja eventos de click
import { useTheme } from '@/hooks/useTheme';
import { FaMoon, FaSun } from 'react-icons/fa';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="ml-4 p-2 rounded-full border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 transition-colors"
      title={theme === 'dark' ? 'Cambiar a claro' : 'Cambiar a oscuro'}
      aria-label="Cambiar tema"
    >
      {theme === 'dark' ? (
        <FaSun className="text-yellow-400" />
      ) : (
        <FaMoon className="text-gray-700" />
      )}
    </button>
  );
}
