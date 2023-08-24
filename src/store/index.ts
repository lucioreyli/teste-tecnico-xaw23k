import type { Product } from '@/types';
import { persist } from 'zustand/middleware';
import { create } from 'zustand';

type Store = {
  products: Product[];
  setProducts: (products: Product[]) => void;
};

export const useProductsStore = create(
  persist<Store>(
    (set) => ({
      products: [],
      setProducts: (products) => set({ products }),
    }),
    { name: 'product-storage' },
  ),
);
