import { axiosPrivate } from './axios';
import { Transaction } from '../../types';
const PRODUCT = '/api/transactions';

export async function getTransactions(userId: string | undefined): Promise<Transaction[]> {
  const { data } = await axiosPrivate.get(`${PRODUCT}/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
}
