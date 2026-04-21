import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { AddTaskModal } from '../AddTaskModal';

const priorities = ['Alta', 'Media', 'Baja'];
const assignees = ['Juan', 'Ana'];

describe('AddTaskModal', () => {
  it('calls onAdd with valid data', () => {
    const onAdd = vi.fn();
    const onClose = vi.fn();
    render(
      <AddTaskModal
        open={true}
        onClose={onClose}
        onAdd={onAdd}
        priorities={priorities}
        assignees={assignees}
      />
    );
    fireEvent.change(screen.getByLabelText(/Título/i), {
      target: { value: 'Nueva tarea', name: 'title' },
    });
    fireEvent.change(screen.getByLabelText(/Prioridad/i), {
      target: { value: 'Alta', name: 'priority' },
    });
    fireEvent.change(screen.getByLabelText(/Responsable/i), {
      target: { value: 'Juan', name: 'assignee' },
    });
    fireEvent.click(screen.getByText('Agregar'));
    expect(onAdd).toHaveBeenCalled();
  });
});
