import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { data } from '@/types';
import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <main className="h-full px-5 pt-10 flex-1">
      <header className="flex w-full justify-between mb-5">
        <h2>Listagem</h2>
        <Button asChild>
          <Link href="/register">Adicionar</Link>
        </Button>
      </header>
      <DataTable data={data} />
    </main>
  );
};

export default Home;
