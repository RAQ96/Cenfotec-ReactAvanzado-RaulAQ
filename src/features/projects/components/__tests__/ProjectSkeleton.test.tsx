import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectSkeleton } from '../ProjectSkeleton';

describe('ProjectSkeleton', () => {
  it('renders skeleton', () => {
    render(<ProjectSkeleton />);
    expect(screen.getByTestId('project-skeleton')).toBeInTheDocument();
  });
});
