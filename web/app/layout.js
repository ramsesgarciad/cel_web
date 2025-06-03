"use client";
import { Inter } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { AuthProvider } from '@/lib/auth-context';
import { usePathname } from 'next/navigation';
import PageTransition from '@/components/PageTransition';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            {!isAdminPage && <SiteHeader />}
            <main className="flex-1">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
