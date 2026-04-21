'use client'; // Client Component — usa varios hooks y maneja eventos de click
import { useState, useEffect, useCallback } from 'react';
import { ProjectCardContainer, ProjectSkeleton } from '@/features/projects';
import { Modal } from '@/shared/ui/organisms';
import { Button } from '@/shared/ui/atoms';
import { useForm } from '@/hooks';
import { useProjectsStore } from '@/store';
import { useRouter } from 'next/navigation';

export default function Projects() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const { projects, hasHydrated, addProject, removeProject } = useProjectsStore();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Formulario para crear proyecto
  const form = useForm({
    initialValues: { id: '', nombre: '', descripcion: '' },
    validate: (values) => {
      const errors: { [key: string]: string } = {};
      if (!values.id) errors.id = 'El id es requerido';
      if (projects.some((p) => p.id === values.id)) errors.id = 'El id ya existe';
      if (!values.nombre) errors.nombre = 'El nombre es requerido';
      if (!values.descripcion) errors.descripcion = 'La descripción es requerida';
      return errors;
    },
    onSubmit: (values) => {
      addProject({
        id: values.id,
        name: values.nombre,
        detail: values.descripcion,
      });
      setCreateModalOpen(false);
      form.resetForm();
    },
  });

  useEffect(() => {
    document.title = `Proyectos Devboard`;
    const timer = setTimeout(() => setIsReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleViewDetail = useCallback(
    (id: string) => {
      router.push(`/tasks/${id}`);
    },
    [router]
  );

  const handleDelete = useCallback(
    (id: string) => {
      removeProject(id);
    },
    [removeProject]
  );

  if (!hasHydrated || !isReady) {
    return <ProjectSkeleton />;
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-end mb-4">
        <Button variant="primary" onClick={() => setCreateModalOpen(true)}>
          Agregar Proyecto
        </Button>
      </div>
      {projects.map((project) => (
        <ProjectCardContainer
          key={project.id}
          project={project}
          onNavigate={handleViewDetail}
          onDelete={handleDelete}
        />
      ))}
      {/* Modal para crear proyecto */}
      <Modal
        open={createModalOpen}
        onClose={() => {
          setCreateModalOpen(false);
          form.resetForm();
        }}
      >
        <Modal.Content>
          <Modal.Title>Agregar Proyecto</Modal.Title>
          <form onSubmit={form.handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">ID</label>
              <input
                name="id"
                value={form.values.id}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                className="w-full border rounded px-3 py-2"
              />
              {form.touched.id && form.errors.id && (
                <span className="text-red-500 text-sm">{form.errors.id}</span>
              )}
            </div>
            <div>
              <label className="block mb-1">Nombre</label>
              <input
                name="nombre"
                value={form.values.nombre}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                className="w-full border rounded px-3 py-2"
              />
              {form.touched.nombre && form.errors.nombre && (
                <span className="text-red-500 text-sm">{form.errors.nombre}</span>
              )}
            </div>
            <div>
              <label className="block mb-1">Descripción</label>
              <textarea
                name="descripcion"
                value={form.values.descripcion}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                className="w-full border rounded px-3 py-2"
              />
              {form.touched.descripcion && form.errors.descripcion && (
                <span className="text-red-500 text-sm">{form.errors.descripcion}</span>
              )}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="secondary"
                type="button"
                onClick={() => {
                  setCreateModalOpen(false);
                  form.resetForm();
                }}
              >
                Cancelar
              </Button>
              <Button variant="primary" type="submit" disabled={form.isSubmitting}>
                Agregar
              </Button>
            </div>
          </form>
        </Modal.Content>
      </Modal>
    </div>
  );
}
