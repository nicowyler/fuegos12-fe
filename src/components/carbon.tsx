import { MercadoPagoContext } from '@/hooks/MercadoPagoProvider';
import { TProduct } from '@/types/products.types';
import { useContext, useEffect } from 'react';
import Products from './Products';
import useCarbonStore from '@/store/carbon.store';


export default function CarbonPage({ defaultproduct }: { defaultproduct: TProduct }) {
    const { saveProduct, updateProduct, removeProduct, clearProsucts, product } = useCarbonStore();
    const { setCarbonData } = useContext(MercadoPagoContext);

    useEffect(() => {
        console.log('defaultproduct::', defaultproduct)
        saveProduct(defaultproduct);
    }, []);

    useEffect(() => {
        if (product) {
            setCarbonData(product);
        }
        console.log('product::', product)

    }, [product, setCarbonData]);

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

