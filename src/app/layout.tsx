import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { FC, PropsWithChildren } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Teste técnico',
  description: 'Generated by create next app',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="pt" className={inter.className}>
      <body className="sm:flex max-sm:divide-y-[1px] divide-neutral-700">
        {children}
      </body>
    </html>
  );
};
export default RootLayout;