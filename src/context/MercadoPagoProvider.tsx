
import { ApiMercadoPago } from '@/api';
import { isApiResponse, isErrorMessage } from '@/api/guards';
import { TPreference, TMercadoPagoContextType, TOrderData } from '@/types';
import { FC, ReactElement, ReactNode, createContext, useState } from 'react';

export const MercadoPagoContext = createContext<TMercadoPagoContextType>({
    isLoading: false,
    orderData: null,
    preference: null,
    setOrderData: () => { },
    placeOrder: () => { },
});

const MercadoPagoProvider: FC<{ children: ReactNode }> = ({ children }): ReactElement => {
    const [preference, setPreference] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [orderData, setOrderData] = useState<TOrderData[] | null>(null);

    const placeOrder = async (order: TOrderData[]) => {
        setIsLoading(true);

        try {
            if (!orderData) return;
            const response = await ApiMercadoPago.createPreference(order);
            console.log(response)
            if (isErrorMessage(response)) {
                console.log(response);
            } else if (isApiResponse<TPreference>(response)) {
                const { data } = response.data;
                console.log(data)
                if (data) setPreference(data);
            }

        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    }

    return (
        <MercadoPagoContext.Provider value={{ isLoading, orderData, setOrderData, preference, placeOrder }}>
            {children}
        </MercadoPagoContext.Provider>
    )
};

export default MercadoPagoProvider;
