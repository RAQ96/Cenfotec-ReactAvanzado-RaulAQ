import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '@/shared/ui/atoms';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Etiqueta</Badge>);
    expect(screen.getByText('Etiqueta')).toBeInTheDocument();
  });
});
