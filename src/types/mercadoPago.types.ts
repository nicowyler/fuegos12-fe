/* eslint-disable no-unused-vars */
import { TProduct } from '@/types/products.types';
import React from 'react';

export type TPreference = string;

export interface TMercadoPagoContextType {
  carbonData: TProduct | null;
  woodData: TProduct | null;
  setCarbonData: React.Dispatch<React.SetStateAction<TProduct | null>>;
  setWoodData: React.Dispatch<React.SetStateAction<TProduct | null>>;
}
