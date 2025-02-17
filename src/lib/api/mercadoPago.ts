import { axiosInstance } from '@/lib/api/axios';
import { TProduct } from '@/types/products.types';
const CREATE_PREFERENCE = '/api/mercadopago/create_preference';

export async function createPreference({
  order,
  userId,
}: {
  order: Omit<TProduct, 'discounts'>[];
  userId: string | undefined;
}) {
  return await axiosInstance.post(CREATE_PREFERENCE, JSON.stringify({ order, userId }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
