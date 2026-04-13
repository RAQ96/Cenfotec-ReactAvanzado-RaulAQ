import { Layout } from '@/shared/ui/templates'
import { Tabs } from '@/shared/ui/organisms'
import { Projects } from '@/features/projects'

function App() {
  return (
    <>
      <Layout>
        <Tabs defaultId="projects">
          <Tabs.Header>
            <Tabs.Tab id="projects">Proyectos</Tabs.Tab>
            <Tabs.Tab id="tasks">Tareas</Tabs.Tab>
          </Tabs.Header>
          <Tabs.Content id="projects">
            <Projects />
          </Tabs.Content>
          <Tabs.Content id="tasks">
            <div>Contenido de Tareas</div>
          </Tabs.Content>
        </Tabs>
      </Layout>
    </>
  )
}

export default App