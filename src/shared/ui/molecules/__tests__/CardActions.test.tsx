import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardActions } from '@/shared/ui/molecules';

describe('CardActions', () => {
  it('renders children', () => {
    render(<CardActions>Acciones</CardActions>);
    expect(screen.getByText('Acciones')).toBeInTheDocument();
  });
});
