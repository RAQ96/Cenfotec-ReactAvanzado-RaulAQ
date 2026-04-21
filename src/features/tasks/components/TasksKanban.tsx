'use client'; // Client Component — usa useState, useEffect y useTasks
import { KanbanBoard, TaskSkeleton, useTasks } from '@/features/tasks';
import { useFilters, useDebounce } from '@/hooks';
import { AddTaskModal } from './AddTaskModal';
import { useState, useEffect } from 'react';
import prioritiesData from '@/data/prioritiesData.json';
import assigneesData from '@/data/assigneesData.json';

interface TasksKanbanProps {
  projectId?: string;
}
export function TasksKanban({ projectId }: TasksKanbanProps) {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [isReady, setIsReady] = useState(false);
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 1000);
    return () => clearTimeout(timer);
  }, [projectId]);

  let baseTasks = projectId ? tasks.filter((t) => t.projectId === projectId) : tasks;
  if (debouncedSearch) {
    baseTasks = baseTasks.filter((t) =>
      t.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }

  const { filteredTasks, filters, setFilters, clearFilters } = useFilters(baseTasks);

  // Limpiar filtros y búsqueda
  const handleClearAll = () => {
    clearFilters();
    setSearch('');
  };

  // Obtener valores únicos para los selects
  const priorities = prioritiesData.map((p) => p.Priority);
  const assignees = assigneesData.map((a) => a.Assignee);

  const handleStatusChange = (id: string, newStatus: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      updateTask({ ...task, status: newStatus });
    }
  };

  const handleDelete = (id: string) => {
    deleteTask(id);
  };

  if (!isReady) {
    return <TaskSkeleton />;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex gap-2 items-center w-full md:w-auto">
          <input
            type="text"
            className="border rounded px-2 py-1 w-full md:w-64"
            placeholder="Buscar por título..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <label className="font-medium">Prioridad:</label>
          <select
            className="border rounded px-2 py-1"
            value={filters.priority || ''}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value || null })}
          >
            <option value="">Todas</option>
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <label className="font-medium">Responsable:</label>
          <select
            className="border rounded px-2 py-1"
            value={filters.assignee || ''}
            onChange={(e) => setFilters({ ...filters, assignee: e.target.value || null })}
          >
            <option value="">Todos</option>
            {assignees.map((assignee) => (
              <option key={assignee} value={assignee}>
                {assignee}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <button
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
            onClick={handleClearAll}
          >
            Limpiar filtros
          </button>
          {projectId ? (
            <button
              className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
              type="button"
              onClick={() => setCreateTaskOpen(true)}
            >
              Agregar tarea
            </button>
          ) : null}
        </div>
      </div>
      {filteredTasks.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No hay tareas para mostrar.</div>
      ) : (
        <KanbanBoard>
          <KanbanBoard.Column title="Backlog">
            {filteredTasks
              .filter((t) => t.status === 'Backlog')
              .map((task) => (
                <KanbanBoard.Task
                  key={task.id}
                  {...task}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                />
              ))}
          </KanbanBoard.Column>
          <KanbanBoard.Column title="En progreso">
            {filteredTasks
              .filter((t) => t.status === 'En progreso')
              .map((task) => (
                <KanbanBoard.Task
                  key={task.id}
                  {...task}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                />
              ))}
          </KanbanBoard.Column>
          <KanbanBoard.Column title="En revisión">
            {filteredTasks
              .filter((t) => t.status === 'En revisión')
              .map((task) => (
                <KanbanBoard.Task
                  key={task.id}
                  {...task}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                />
              ))}
          </KanbanBoard.Column>
          <KanbanBoard.Column title="Completado">
            {filteredTasks
              .filter((t) => t.status === 'Completado')
              .map((task) => (
                <KanbanBoard.Task
                  key={task.id}
                  {...task}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                />
              ))}
          </KanbanBoard.Column>
        </KanbanBoard>
      )}
      <AddTaskModal
        open={createTaskOpen}
        onClose={() => setCreateTaskOpen(false)}
        onAdd={(values) => {
          addTask({
            ...values,
            projectId: projectId || '',
            status: 'Backlog',
          });
        }}
        priorities={priorities}
        assignees={assignees}
      />
    </>
  );
}
