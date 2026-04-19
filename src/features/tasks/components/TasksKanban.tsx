'use client'; // Client Component — usa useState, useEffect y useTasks
import { KanbanBoard, TaskSkeleton, useTasks } from '@/features/tasks';
import { useState, useEffect } from 'react';

interface TasksKanbanProps {
  projectId?: string;
}

export function TasksKanban({ projectId }: TasksKanbanProps) {
  const { tasks, updateTask, deleteTask } = useTasks();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 1000);
    return () => clearTimeout(timer);
  }, [projectId]);

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

  const filteredTasks = projectId ? tasks.filter((t) => t.projectId === projectId) : tasks;

  if (filteredTasks.length === 0) {
    return <div className="text-center text-gray-500 py-8">No hay tareas para mostrar.</div>;
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        {/* Aquí puedes agregar el botón de agregar tarea si lo necesitas */}
      </div>
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
    </>
  );
}
