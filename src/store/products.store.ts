/* eslint-disable no-unused-vars */
import { TProduct } from '@/types/products.types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ProductsState = {
  products: TProduct[] | [],
  saveProductsList: (products: TProduct[]) => void
  updateProduct: (id: string) => void
  removeProduct: (id: string) => void
}

export const UseProductsStore = create<ProductsState>()(
  persist(
    (set) => ({
      products: [],
      saveProductsList: (products: TProduct[]) => set(() => ({ products })),
      updateProduct: (id: string) => set((state) => {
        const productToAdd = state.products && state.products.find((item: TProduct) => item.id === id);
        if (!productToAdd) return state;
        productToAdd.quantity++;
        return { products: [...state.products] };
      }),
      removeProduct: (id: string) => set((state) => {
        const removeProduct = state.products && state.products.find((item: TProduct) => item.id === id);
        if (!removeProduct) return state;
        removeProduct.quantity = 0;
        return { products: [...state.products] };
      })
    }),
    { name: 'productsStore' },
  ),
)
export const removeUser = () => UseProductsStore.persist.clearStorage();



export default UseProductsStore;