
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
    const [orderData, setOrderData] = useState<TOrderData[] | null>(null);

    const placeOrder = async (order: TOrderData[]) => {
        setIsLoading(true);

        try {
            if (!orderData) return;
            const response = await ApiMercadoPago.createPreference(order);
            console.log(response)
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
