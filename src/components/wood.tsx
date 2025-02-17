import { MercadoPagoContext } from '@/hooks/MercadoPagoProvider';
import { TProduct } from '@/types/products.types';
import { useContext, useEffect, useState } from 'react';
import Products from './Products';
import useWoodStore from '@/store/wood.store';
import woodImg from '../assets/wood.png'
import Discounts from '@/components/discount';
import { useLocationStore } from '@/store/location.store';
import { useQuery } from '@tanstack/react-query';
import { getDiscountDays } from '@/lib/api/products';
import DiscountDays from '@/components/discountDays';

export default function WoodPage({ defaultproduct }: { defaultproduct: TProduct }) {
    const { saveProduct, updateProduct, removeProduct, clearProsucts, product } = useWoodStore();
    const { setWoodData } = useContext(MercadoPagoContext);
    const [discountDays, setDiscountDays] = useState<{ price: number, days: [] }>();
    const { storeId } = useLocationStore();

    const { data, isLoading } = useQuery({
        queryKey: ['discountDays', storeId],
        queryFn: async ({ queryKey }) => {
            const storeId = queryKey[1] as string;
            if (!storeId) {
                return Promise.reject(new Error('productDiscount id is undefined'));
            }

            return await getDiscountDays(storeId);
        },
        enabled: !!storeId,
    });

    useEffect(() => {
        if (data) {
            console.log("DISCOUNT DAYS:", data)
            setDiscountDays(data);
        }
    }, [data, setDiscountDays]);
    useEffect(() => {
        saveProduct(defaultproduct);
    }, []);

    useEffect(() => {
        if (product) {
            setWoodData(product);
        }
    }, [product, setWoodData]);

    const productRemove = () => {
        removeProduct();
    }
    const productSelected = () => {
        updateProduct();
    };

    function showDaysDiscount(days: number[]): boolean {
        let show = false;
        const today = new Date().getDay();
        days.forEach((day: number) => {
            if (day === today) {
                show = true;
            }
        });
        return show;
    }

    if (product) return (
        <>
            <Products
                product={product}
                img={woodImg}
                onProductSelected={productSelected}
                onProductRemoved={productRemove}
                onRemoveAllProducts={() => clearProsucts()}
            />
            <Discounts type={'WOOD'} discounts={product.discounts} />
            {showDaysDiscount([1, 2, 3, 4]) && discountDays && <DiscountDays discountDays={discountDays} isLoading={isLoading} />}
        </>
    )

    return null;
}

