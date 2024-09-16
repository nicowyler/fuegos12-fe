export interface Transaction {
  created: string;
  updated: string;
  id: string;
  status: string;
  status_detail: string;
  transaction_amount: number;
  total_paid_amount: number;
  net_received_amount: number;
  order_id: string;
  payment_method_id: string;
  payment_method_issuer_id: string;
  payment_method_type: string;
  transactionProducts: TransactionProduct[];
}
export interface TransactionProduct {
  id: string;
  quantity: number;
  product: Product;
}
export interface Product {
  created: string;
  updated: string;
  title: string;
  unit_price: number;
  category_id: string;
  description: string;
  picture_url: string;
  type: string;
}
