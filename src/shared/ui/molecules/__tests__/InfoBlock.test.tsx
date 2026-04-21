import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InfoBlock } from '@/shared/ui/molecules';

describe('InfoBlock', () => {
  it('renders title and description', () => {
    render(<InfoBlock title="Label" description="Valor" />);
    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(screen.getByText('Valor')).toBeInTheDocument();
  });
});
