'use client'; // Client Component — usa AppProviders
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { TabsMenu } from '@/shared/ui/organisms';
import { ThemeToggle } from '@/shared/ui/atoms';
import { AppProviders } from '@/context';
import Image from 'next/image';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
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
              <Image
                src="/logo.png"
                alt="Logo"
                width={100}
                height={100}
                className="rounded-full"
                style={{ width: '80px', height: 'auto' }}
                priority
              />
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
      </body>
    </html>
  );
}
