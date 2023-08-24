import { Form } from '@/components/Form';
import type { NextPage } from 'next';
import { redirect } from 'next/navigation';

type Props = { params: { productId: string } };

const Home: NextPage<Props> = ({ params }) => {
  const index = Number(params.productId);
  if (Number.isNaN(index) || !params.productId) {
    return redirect('/');
  }

  return <Form productIndex={index} />;
};

export default Home;
