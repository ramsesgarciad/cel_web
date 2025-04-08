import { Inter } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/site-header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Sistema de Gestión de Proyectos',
  description: 'Aplicación para la gestión de proyectos y clientes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <SiteHeader />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
