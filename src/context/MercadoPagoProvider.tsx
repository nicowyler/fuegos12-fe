
import { ApiMercadoPago } from '@/api';
import { isApiResponse, isErrorMessage } from '@/api/guards';
import { TPreferenceId, TMercadoPagoContextType, TOrderData } from '@/types';
import { FC, ReactElement, ReactNode, createContext, useState } from 'react';

export const MercadoPagoContext = createContext<TMercadoPagoContextType>({
    isLoading: false,
    orderData: null,
    preferenceId: null,
    setOrderData: () => { },
    placeOrder: () => { },
});

const MercadoPagoProvider: FC<{ children: ReactNode }> = ({ children }): ReactElement => {
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [orderData, setOrderData] = useState<TOrderData | null>({ id: "1", title: "Bolsa de carbon", quantity: 1, price: 5000, amount: 1, description: "Bolsa de Carbon x 10k" });

    const placeOrder = async (params: TOrderData) => {
        setIsLoading(true);
        const { id, title, quantity, price, amount, description } = params;

        try {
            const response = await ApiMercadoPago.createPreference({
                id,
                title,
                quantity,
                price,
                amount,
                description,
            });

            if (isErrorMessage(response)) {
                console.log(response);
            } else if (isApiResponse<TPreferenceId>(response)) {
                const { data } = response.data;
                if (data.id) setPreferenceId(data.id);
            }

        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    }

    return (
        <MercadoPagoContext.Provider value={{ isLoading, orderData, setOrderData, preferenceId, placeOrder }}>
            {children}
        </MercadoPagoContext.Provider>
    )
};

export default MercadoPagoProvider;
