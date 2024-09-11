export type TProduct = {
  title: string;
  description: string;
  unit_price: number;
  category_id: string;
  picture_url: string;
  id: string;
  quantity?: number;
  created?: Date;
  updated?: Date;
  type: 'CARBON' | 'WOOD';
};
