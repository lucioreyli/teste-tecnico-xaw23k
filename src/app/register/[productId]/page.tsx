import { Form } from '@/components/Form';
import { Button } from '@/components/ui/button';
import type { NextPage } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

type Props = { params: { productId: string } };

const Home: NextPage<Props> = ({ params }) => {
  const index = Number(params.productId);
  if (Number.isNaN(index) || !params.productId) {
    return redirect('/');
  }

  return (
    <main className="h-full px-5 pt-10 flex-1">
      <header className="flex w-full justify-between mb-5">
        <h2>Adicionar</h2>
        <Button asChild variant="outline">
          <Link href="/">Cancelar</Link>
        </Button>
      </header>
      <Form productIndex={index} />
    </main>
  );
};

export default Home;
