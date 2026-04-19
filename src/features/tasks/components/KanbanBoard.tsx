// Server Component — solo renderiza HTML.
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { Task } from '@/features/tasks/types';

interface ColumnProps {
  title: string;
  children: React.ReactNode;
}

interface KanbanBoardProps {
  children: React.ReactNode;
}

function KanbanBoard({ children }: KanbanBoardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full min-h-[70vh] items-stretch">
      {children}
    </div>
  );
}

function KanbanColumn({ title, children }: ColumnProps) {
  return (
    <div className="kanban-col bg-gray-100 rounded-lg p-4 flex flex-col h-full min-h-[300px] border border-gray-200">
      <h2 className="font-bold text-lg mb-4 text-center">{title}</h2>
      <div className="flex-1 space-y-3">{children}</div>
    </div>
  );
}

interface KanbanTaskProps extends Task {
  onStatusChange?: (id: string, newStatus: string) => void;
  onDelete?: (id: string) => void;
}

function KanbanTask({
  id,
  title,
  priority,
  label,
  assignee,
  status,
  onStatusChange,
  onDelete,
}: KanbanTaskProps) {
  const estados = ['Backlog', 'En progreso', 'En revisión', 'Completado'];
  return (
    <div className="kanban-task bg-white rounded shadow p-3 border border-gray-200">
      <div className="flex items-center justify-between mb-1">
        <div className="font-semibold text-base">{title}</div>
        <button
          type="button"
          className="ml-2 text-gray-400 hover:text-red-600 transition-colors"
          title="Borrar tarea"
          onClick={() => onDelete && onDelete(id)}
        >
          <FaTrash size={16} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 text-xs mb-1">
        <span className="kanban-badge-blue px-2 py-0.5 rounded bg-blue-100 text-blue-700">
          {label}
        </span>
        <span className="kanban-badge-green px-2 py-0.5 rounded bg-green-100 text-green-700">
          Prioridad: {priority}
        </span>
        <span className="kanban-badge-yellow px-2 py-0.5 rounded bg-yellow-100 text-yellow-700">
          {assignee}
        </span>
      </div>
      <div className="flex justify-end mt-2">
        <select
          className="border rounded px-2 py-1 text-xs"
          value={status}
          onChange={(e) => onStatusChange && onStatusChange(id, e.target.value)}
        >
          {estados.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

KanbanBoard.Column = KanbanColumn;
KanbanBoard.Task = KanbanTask;

export { KanbanBoard };
