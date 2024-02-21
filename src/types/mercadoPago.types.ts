import React from "react";

export type TOrderData = {
    id: string,
    title: string,
    quantity: number,
    price: number,
    amount: number
    description: string
}

export type TPreferenceId = {
    id: string
}

export interface TMercadoPagoContextType {
    preferenceId: string | null;
    isLoading: boolean;
    orderData: TOrderData | null;
    setOrderData: React.Dispatch<React.SetStateAction<TOrderData | null>>;
    placeOrder: (params: TOrderData) => void;
}
