/* eslint-disable no-unused-vars */
import { TProduct } from '@/types/products.types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CarbonState = {
  product: TProduct | null;
  saveProduct: (product: TProduct) => void;
  updateProduct: () => void;
  removeProduct: () => void;
  clearProsucts: () => void;
};

export const useCarbonStore = create<CarbonState>()(
  persist(
    (set) => ({
      product: null,
      saveProduct: (initialProduct: TProduct) => {
        // Destructure to exclude 'created' and 'updated' properties
        const { created, updated, ...product } = initialProduct;

        set(() => ({
          product: {
            ...product,
            quantity: product.quantity ?? 0, // Set default value if quantity is undefined
          },
        }));
      },
      updateProduct: () =>
        set((state) => {
          if (!state.product) return state;
          return {
            product: {
              ...state.product,
              quantity: (state.product.quantity ?? 0) + 1,
            },
          };
        }),
      removeProduct: () =>
        set((state) => {
          if (!state.product) return state;
          return {
            product: {
              ...state.product,
              quantity: (state.product.quantity ?? 0) - 1,
            },
          };
        }),
      clearProsucts: () =>
        set((state) => {
          if (!state.product) return state;
          return {
            product: { ...state.product, quantity: 0 },
          };
        }),
    }),
    { name: 'carbonStore' }
  )
);

export const removeUser = () => useCarbonStore.persist.clearStorage();

export default useCarbonStore;
