import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KanbanBoard } from '../KanbanBoard';

describe('KanbanBoard', () => {
  it('renders columns and tasks', () => {
    render(
      <KanbanBoard>
        <KanbanBoard.Column title="Backlog">
          <KanbanBoard.Task
            projectId=""
            id="1"
            title="Tarea 1"
            priority="Alta"
            label="Bug"
            assignee="Juan"
            status="Backlog"
          />
        </KanbanBoard.Column>
      </KanbanBoard>
    );
    // Puede haber múltiples elementos con el texto 'Backlog' (columna y opción de select)
    expect(screen.getAllByText('Backlog').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Tarea 1')).toBeInTheDocument();
  });
});
