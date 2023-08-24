import { NavBar } from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { FC, PropsWithChildren } from 'react';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="h-full px-5 py-10 flex-1">
        <header className="flex w-full justify-between mb-5">
          <h2>Adicionar</h2>
          <Button asChild variant="outline">
            <Link href="/">Cancelar</Link>
          </Button>
        </header>
        {children}
      </main>
    </>
  );
};

export default Layout;
