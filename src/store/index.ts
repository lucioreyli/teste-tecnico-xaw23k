import type { Product } from '@/types';
import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import { produce } from 'immer';

type Store = {
  products: Product[];
  setProducts: (products: Product[]) => void;
  removeItem: (index: number) => void;
};

export const useProductsStore = create(
  persist<Store>(
    (set) => ({
      products: [],
      setProducts: (products) => set({ products }),
      removeItem: (index: number) =>
        set(
          produce<Store>((state) => {
            state.products.splice(index, 1);
            return state;
          }),
        ),
    }),
    { name: 'product-storage' },
  ),
);
