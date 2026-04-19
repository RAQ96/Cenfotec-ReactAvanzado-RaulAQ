'use client'; // Client Component — usa AppProviders
import { TabsMenu } from '@/shared/ui/organisms';
import { ThemeToggle } from '@/shared/ui/atoms';
import { AppProviders } from '@/context';

export default function ClientThemeLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProviders>
      <div className="min-h-screen flex flex-col">
        <header
          className="py-4 px-8 shadow text-center flex items-center justify-between"
          style={{
            background: 'var(--header-bg)',
            color: 'var(--header-text)',
          }}
        >
          <h1 className="text-2xl font-bold">DevBoard</h1>
          <ThemeToggle />
        </header>
        <main className="flex-1 flex flex-col px-4 py-8 w-full overflow-y-auto">
          <div className="container mx-auto w-full">
            <TabsMenu />
            {children}
          </div>
        </main>
        <footer
          className="py-3 px-8 text-center sticky bottom-0 z-10 bg-opacity-95"
          style={{
            background: 'var(--footer-bg)',
            color: 'var(--footer-text)',
          }}
        >
          © {new Date().getFullYear()} Raúl Arias. Todos los derechos reservados.
        </footer>
      </div>
    </AppProviders>
  );
}
