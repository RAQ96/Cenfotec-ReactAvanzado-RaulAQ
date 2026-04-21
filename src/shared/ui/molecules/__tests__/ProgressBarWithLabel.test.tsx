import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressBarWithLabel } from '@/shared/ui/molecules';

describe('ProgressBarWithLabel', () => {
  it('renders label and progress', () => {
    render(<ProgressBarWithLabel value={70} label="Avance" />);
    expect(screen.getByText('Avance')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
