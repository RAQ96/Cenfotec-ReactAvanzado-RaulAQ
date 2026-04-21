import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Text } from '@/shared/ui/atoms';

describe('Text', () => {
  it('renders children', () => {
    render(<Text>Hola</Text>);
    expect(screen.getByText('Hola')).toBeInTheDocument();
  });
});
