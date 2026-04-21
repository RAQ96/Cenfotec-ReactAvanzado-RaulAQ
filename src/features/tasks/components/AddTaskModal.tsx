'use client'; // Client Component — usa useForm
import { Modal } from '@/shared/ui/organisms';
import { Button } from '@/shared/ui/atoms';
import { useForm } from '@/hooks';

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (task: {
    id: string;
    title: string;
    priority: string;
    assignee: string;
    label: string;
  }) => void;
  priorities: string[];
  assignees: string[];
}

export function AddTaskModal({ open, onClose, onAdd, priorities, assignees }: AddTaskModalProps) {
  const form = useForm({
    initialValues: {
      title: '',
      priority: '',
      assignee: '',
      label: '',
    },
    validate: (values) => {
      const errors: { [key: string]: string } = {};
      if (!values.title) errors.title = 'El título es requerido';
      if (!values.priority) errors.priority = 'La prioridad es requerida';
      if (!values.assignee) errors.assignee = 'El responsable es requerido';
      // label es opcional
      return errors;
    },
    onSubmit: (values) => {
      // Generar un id único solo al enviar
      let newId = '1';
      if (typeof window !== 'undefined' && window.crypto?.randomUUID)
        newId = window.crypto.randomUUID();
      onAdd({
        id: newId,
        title: values.title,
        priority: values.priority,
        assignee: values.assignee,
        label: values.label,
      });
      onClose();
      form.resetForm();
    },
  });

  // Handler para submit que marca todos los campos como tocados para mostrar errores usando handleBlur
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simular eventos de blur para cada campo requerido
    (['title', 'priority', 'assignee'] as Array<keyof typeof form.values>).forEach((field) => {
      const event = {
        target: { name: field },
      } as unknown as React.FocusEvent<HTMLInputElement | HTMLSelectElement>;
      form.handleBlur(event);
    });
    form.handleSubmit(e);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        form.resetForm();
      }}
    >
      <Modal.Content>
        <Modal.Title>Agregar Tarea</Modal.Title>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="addtask-title" className="block mb-1">
              Título
            </label>
            <input
              id="addtask-title"
              name="title"
              value={form.values.title}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              className="w-full border rounded px-3 py-2"
            />
            {form.touched.title && form.errors.title && (
              <span className="text-red-500 text-sm">{form.errors.title}</span>
            )}
          </div>
          <div>
            <label htmlFor="addtask-label" className="block mb-1">
              Etiqueta
            </label>
            <input
              id="addtask-label"
              name="label"
              value={form.values.label}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              className="w-full border rounded px-3 py-2"
              placeholder="Opcional"
            />
          </div>
          <div>
            <label htmlFor="addtask-priority" className="block mb-1">
              Prioridad
            </label>
            <select
              id="addtask-priority"
              name="priority"
              value={form.values.priority}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Selecciona prioridad</option>
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
            {form.touched.priority && form.errors.priority && (
              <span className="text-red-500 text-sm">{form.errors.priority}</span>
            )}
          </div>
          <div>
            <label htmlFor="addtask-assignee" className="block mb-1">
              Responsable
            </label>
            <select
              id="addtask-assignee"
              name="assignee"
              value={form.values.assignee}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Selecciona responsable</option>
              {assignees.map((assignee) => (
                <option key={assignee} value={assignee}>
                  {assignee}
                </option>
              ))}
            </select>
            {form.touched.assignee && form.errors.assignee && (
              <span className="text-red-500 text-sm">{form.errors.assignee}</span>
            )}
          </div>
          <Modal.Actions>
            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                onClose();
                form.resetForm();
              }}
            >
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={form.isSubmitting}>
              Agregar
            </Button>
          </Modal.Actions>
        </form>
      </Modal.Content>
    </Modal>
  );
}
