import { Form } from '@/components/Form';
import { Button } from '@/components/ui/button';
import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <main className="h-full px-5 pt-10 flex-1">
      <header className="flex w-full justify-between mb-5">
        <h2>Adicionar</h2>
        <Button asChild variant="outline">
          <Link href="/">Cancelar</Link>
        </Button>
      </header>
      <Form />
    </main>
  );
};

export default Home;
