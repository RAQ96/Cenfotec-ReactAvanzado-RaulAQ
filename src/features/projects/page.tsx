import { useState } from 'react'
import { ProjectCardContainer } from '@/features/projects/components'
import { Modal } from '@/shared/ui/organisms'
import { Button } from '@/shared/ui/atoms'

const mockProjects = [
  {
    id: '1',
    name: 'Sistema de pagos',
    detail: 'Integración con bancos',
    completedTasks: 7,
    totalTasks: 10,
  },
  {
    id: '2',
    name: 'App móvil',
    detail: 'Nueva versión iOS/Android',
    completedTasks: 3,
    totalTasks: 8,
  },
]

export const Projects = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  const handleViewDetail = (id: string) => {
    setSelectedProjectId(id)
    setModalOpen(true)
  }

  const handleConfirm = () => {
    if (selectedProjectId) {
      console.log('Ir a detalle del proyecto:', selectedProjectId)
    }
    setModalOpen(false)
    setSelectedProjectId(null)
  }

  const handleCancel = () => {
    setModalOpen(false)
    setSelectedProjectId(null)
  }

  return (
    <div className="p-6 space-y-4">
      {mockProjects.map((project) => (
        <ProjectCardContainer
          key={project.id}
          project={project}
          onNavigate={handleViewDetail}
        />
      ))}
      <Modal open={modalOpen} onClose={handleCancel}>
        <Modal.Content>
          <Modal.Title>¿Está seguro que desea ver el detalle del proyecto?</Modal.Title>
          <Modal.Actions>
            <Button variant="secondary" onClick={handleCancel}>No</Button>
            <Button variant="primary" onClick={handleConfirm}>Sí</Button>
          </Modal.Actions>
        </Modal.Content>
      </Modal>
    </div>
  )
}