import { TProduct } from '@/types/products.types';
import { axiosPrivate } from './axios';

const PRODUCT = '/api/product/store';
const DISCOUNT_CALC = 'api/product/discount/calculate';
const DISCOUNT_DAYS = 'api/product/discount/days';

export async function fetchProducts(storeId: string): Promise<TProduct[]> {
  const { data } = await axiosPrivate.get(`${PRODUCT}/${storeId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data.data;
}

export async function calculateDiscount(storeProductId: string, quantity: number): Promise<TProduct[]> {
  const { data } = await axiosPrivate.get(`${DISCOUNT_CALC}?storeProductId=${storeProductId}&quantity=${quantity}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data.data.price;
}

export async function getDiscountDays(storeId: string) {
  const { data } = await axiosPrivate.get(`${DISCOUNT_DAYS}/${storeId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data.data;
}
