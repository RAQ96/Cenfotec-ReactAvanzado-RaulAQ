import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TaskSkeleton } from '../TaskSkeleton';

describe('TaskSkeleton', () => {
  it('renders skeleton', () => {
    render(<TaskSkeleton />);
    expect(screen.getByTestId('task-skeleton')).toBeInTheDocument();
  });
});
