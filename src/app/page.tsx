// Server Component — solo renderiza HTML.
import { type Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Devboard',
    description:
      'DevBoard es una aplicación de gestión de proyectos y tareas para equipos de desarrollo.',
    openGraph: {
      title: 'Devboard',
      description:
        'DevBoard es una aplicación de gestión de proyectos y tareas para equipos de desarrollo.',
    },
  };
}

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full">
      <h1 className="text-2xl font-bold text-center">Bienvenido</h1>
    </div>
  );
}
