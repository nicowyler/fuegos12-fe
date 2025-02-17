import { calculateDiscount } from '@/lib/api/products';
import { ProductType } from '@/types/products.types';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

type PrdouctDiscount = {
  id: string;
  quantity: number;
};

export function useDiscountCalc(type: ProductType) {
  const [productDiscount, setProductDiscount] = useState<PrdouctDiscount>();
  const { data, isLoading } = useQuery({
    queryKey: ['products', productDiscount],
    queryFn: async ({ queryKey }) => {
      const productDiscount = queryKey[1] as PrdouctDiscount;
      if (!productDiscount.id) {
        return Promise.reject(new Error('productDiscount id is undefined'));
      }

      return await calculateDiscount(productDiscount.id, productDiscount.quantity);
    },
    enabled: !!productDiscount?.id,
  });

  return { data, isLoading, setProductDiscount };
}
