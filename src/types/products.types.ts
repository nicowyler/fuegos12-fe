export type ProductType = 'CARBON' | 'WOOD';

export type Discount = {
  discount_percentage: number;
  min_quantity: number;
};

export type TProduct = {
  title: string;
  description: string;
  price: number;
  picture_url: string;
  id: string;
  quantity?: number;
  created?: Date;
  updated?: Date;
  type: ProductType;
  discounts: Discount[];
};
