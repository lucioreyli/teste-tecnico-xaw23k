import { useProductsStore } from '@/store';
import type { Product } from '@/types';
import { useRouter } from 'next/navigation';

export const useSubmit = (idToEdit: string | undefined) => {
  const { products, setProducts } = useProductsStore((state) => state);
  const router = useRouter();
  const onSubmit = (data: Product) => {
    if (idToEdit) return;
    setProducts(
      products.concat({
        ...data,
        ...(!data.perishable && { validationDate: undefined }),
      }),
    );
    router.push('/');
  };

  return { onSubmit };
};
