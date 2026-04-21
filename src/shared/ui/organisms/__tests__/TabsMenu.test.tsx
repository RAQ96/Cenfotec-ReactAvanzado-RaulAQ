import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TabsMenu } from '@/shared/ui/organisms/TabsMenu';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('TabsMenu', () => {
  it('renders tabs', () => {
    render(<TabsMenu />);
    expect(screen.getByText('Proyectos')).toBeInTheDocument();
    expect(screen.getByText('Tareas')).toBeInTheDocument();
  });
});
