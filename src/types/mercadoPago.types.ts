import React from "react";

export type TOrderData = {
    id: string,
    title: string,
    quantity: number,
    unit_price: number,
    description: string
}

export type TPreference = string;

export interface TMercadoPagoContextType {
    preference: string | null;
    isLoading: boolean;
    orderData: TOrderData[] | null;
    setOrderData: React.Dispatch<React.SetStateAction<TOrderData[] | null>>;
    placeOrder: (order: TOrderData[]) => void;
}
