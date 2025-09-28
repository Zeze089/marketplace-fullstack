// frontend/src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/layout/Header';
import { CartNotification } from '@/components/CartNotification';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Marketplace - UX Software',
  description: 'Loja online desenvolvida para o processo seletivo da UX Software',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <CartNotification />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}