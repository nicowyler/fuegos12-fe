import { MercadoPagoContext } from '@/hooks/MercadoPagoProvider';
import { TProduct } from '@/types/products.types';
import { useContext, useEffect } from 'react';
import Products from './Products';
import useWoodStore from '@/store/wood.store';

export default function WoodPage({ defaultproduct }: { defaultproduct: TProduct }) {
    const { saveProduct, updateProduct, removeProduct, clearProsucts, product } = useWoodStore();
    const { setWoodData } = useContext(MercadoPagoContext);

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

    return (
        <>
            {product &&
                <Products
                    product={product}
                    onProductSelected={productSelected}
                    onProductRemoved={productRemove}
                    onRemoveAllProducts={() => clearProsucts()}
                />
            }
        </>
    )
}

