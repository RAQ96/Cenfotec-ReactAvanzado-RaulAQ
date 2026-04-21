import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectCardView } from '../ProjectCardView';

describe('ProjectCardView', () => {
  it('renders project name and detail', () => {
    render(
      <ProjectCardView
        name="Proyecto Demo"
        detail="Descripción de prueba"
        progress={50}
        taskLabel="1 / 2 tareas"
        onViewDetail={() => {}}
      />
    );
    expect(screen.getByText('Proyecto Demo')).toBeInTheDocument();
    expect(screen.getByText('Descripción de prueba')).toBeInTheDocument();
    expect(screen.getByText('1 / 2 tareas')).toBeInTheDocument();
  });
});
