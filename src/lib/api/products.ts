import { TProduct } from '@/types/products.types';
import { axiosPrivate } from './axios';

const PRODUCT = '/api/product/';

export async function fetchProducts(): Promise<TProduct[]> {
  const { data } = await axiosPrivate.get(PRODUCT, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data.data;
}
