import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children } : LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-blue-600 text-white py-4 px-8 shadow text-center">
        <h1 className="text-2xl font-bold">DevBoard</h1>
      </header>
      <main className="flex-1 flex flex-col px-4 py-8 w-full">
        <div className="container mx-auto w-full">
          {children}
        </div>
      </main>
      <footer className="bg-gray-200 text-gray-600 py-3 px-8 text-center">
        © {new Date().getFullYear()} Raúl Arias. Todos los derechos reservados.
      </footer>
    </div>
  );
}