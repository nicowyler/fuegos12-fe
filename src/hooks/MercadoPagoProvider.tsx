
import { TMercadoPagoContextType } from '@/types/mercadoPago.types';
import { TProduct } from '@/types/products.types';
import { FC, ReactElement, ReactNode, createContext, useState } from 'react';

export const MercadoPagoContext = createContext<TMercadoPagoContextType>({
    carbonData: null,
    woodData: null,
    setCarbonData: () => { },
    setWoodData: () => { },
});

const MercadoPagoProvider: FC<{ children: ReactNode }> = ({ children }): ReactElement => {
    const [carbonData, setCarbonData] = useState<TProduct | null>(null);
    const [woodData, setWoodData] = useState<TProduct | null>(null);

    return (
        <MercadoPagoContext.Provider value={{ carbonData, setCarbonData, woodData, setWoodData }}>
            {children}
        </MercadoPagoContext.Provider>
    )
};

export default MercadoPagoProvider;
