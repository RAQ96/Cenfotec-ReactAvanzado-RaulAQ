import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectCardContainer } from '../ProjectCardContainer';
import type { Project } from '../../types';

// Mock de useTasks para controlar las tareas
vi.mock('@/features/tasks', () => ({
  useTasks: () => ({
    tasks: [
      {
        id: '1',
        title: 'Tarea 1',
        priority: 'Alta',
        assignee: 'Juan',
        status: 'Completado',
        label: '',
        projectId: 'p1',
      },
      {
        id: '2',
        title: 'Tarea 2',
        priority: 'Media',
        assignee: 'Ana',
        status: 'En progreso',
        label: '',
        projectId: 'p1',
      },
      {
        id: '3',
        title: 'Tarea 3',
        priority: 'Baja',
        assignee: 'Luis',
        status: 'Completado',
        label: '',
        projectId: 'p2',
      },
    ],
  }),
}));

describe('ProjectCardContainer', () => {
  const project: Project = {
    id: 'p1',
    name: 'Proyecto Demo',
    detail: 'Descripción de prueba',
  };

  it('renderiza ProjectCardView con datos correctos', () => {
    const onNavigate = vi.fn();
    render(<ProjectCardContainer project={project} onNavigate={onNavigate} />);
    expect(screen.getByText('Proyecto Demo')).toBeInTheDocument();
    expect(screen.getByText('Descripción de prueba')).toBeInTheDocument();
    // 1 tarea completada de 2 para este proyecto
    expect(screen.getByText(/1 \/ 2 tareas/)).toBeInTheDocument();
  });
});
