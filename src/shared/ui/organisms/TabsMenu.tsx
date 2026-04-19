'use client'; // Client Component — usa Tabs que es client

import { Tabs } from '@/shared/ui/organisms';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function TabsMenu() {
  const pathname = usePathname();
  let activeId = 'home';
  if (pathname.startsWith('/projects')) activeId = 'projects';
  else if (pathname.startsWith('/tasks')) activeId = 'tasks';

  return (
    <Tabs defaultId="home" activeId={activeId}>
      <Tabs.Header>
        <Tabs.Tab id="home">
          <Link href="/">Inicio</Link>
        </Tabs.Tab>
        <Tabs.Tab id="projects">
          <Link href="/projects">Proyectos</Link>
        </Tabs.Tab>
        <Tabs.Tab id="tasks">
          <Link href="/tasks">Tareas</Link>
        </Tabs.Tab>
      </Tabs.Header>
    </Tabs>
  );
}
