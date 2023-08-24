import { useProductsStore } from '@/store';
import type { Product } from '@/types';
import { useRouter } from 'next/navigation';
import { produce } from 'immer';

export const useSubmit = (indexToEdit: number | undefined) => {
  const { products, setProducts } = useProductsStore((state) => state);
  const router = useRouter();

  if (
    products.length &&
    typeof indexToEdit === 'number' &&
    !products[indexToEdit]
  ) {
    router.push('/');
  }

  const onSubmit = (data: Product) => {
    const newData = {
      ...data,
      ...(!data.perishable && { validationDate: undefined }),
    };
    setProducts(
      produce(products, (draftProducts) => {
        if (typeof indexToEdit === 'undefined') {
          return draftProducts.concat(newData);
        }
        draftProducts[indexToEdit] = newData;
        return draftProducts;
      }),
    );
    router.push('/');
  };

  return { onSubmit };
};
