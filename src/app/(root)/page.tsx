import { Button } from '@/components/ui/button';
import type { NextPage } from 'next';
import Link from 'next/link';
import { DataTable } from '@/components/DataTable';

const Home: NextPage = async () => (
  <main className="h-full px-5 pt-10 flex-1 grid w-fit">
    <header className="flex w-full justify-between mb-5">
      <h2>Listagem</h2>
      <Button asChild>
        <Link href="/register">Adicionar</Link>
      </Button>
    </header>
    <DataTable />
  </main>
);

export default Home;
