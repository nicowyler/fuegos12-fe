import Checkout from "@/components/CheckOut";
import Loading from "@/components/Loading";
import { MercadoPagoContext } from "@/context/MercadoPagoProvider";
import { useContext, useEffect } from "react"
import { initMercadoPago } from "@mercadopago/sdk-react";
import Products from "@/components/Products";
import carbonImg from '../assets/bolsa-carbon.png'
import leniaImg from '../assets/lenia.png'
import UseProductsStore from "@/store/products.store";

initMercadoPago("TEST-867aa7f0-0743-4ebc-a445-d710b2d16648", {
    locale: "es-AR",
});

const productsList: TProduct[] = [
    {
        id: "1",
        title: "Carbon",
        description: "Bolsa de carbon x 10k",
        unit_price: 5000,
        image: { href: carbonImg, alt: "Carbon" },
        quantity: 0
    },
    {
        id: "2",
        title: "Leña",
        description: "Bolsa de leña x 10k",
        unit_price: 5000,
        image: { href: leniaImg, alt: "Carbon" },
        quantity: 0
    },
]

const Home = () => {
    const { saveProductsList, updateProduct, removeProduct, products } = UseProductsStore();
    const { isLoading, placeOrder, setOrderData, orderData } = useContext(MercadoPagoContext);

    useEffect(() => {
        saveProductsList(productsList);
    }, [])

    const renderSpinner = () => isLoading && <Loading />;

    const productRemove = (id: string) => {
        removeProduct(id)
        const order = products.filter(product => product.quantity > 0).map(({ image, ...rest }) => rest);
        setOrderData(order);
    }
    const productSelected = (id: string) => {
        updateProduct(id);
        const order = products.filter(product => product.quantity > 0).map(({ image, ...rest }) => rest);
        setOrderData(order);
    };

    useEffect(() => {
        console.log(orderData)
        if (orderData?.length) {
            placeOrder(orderData);
        }
    }, [orderData])

    return (
        <>
            <Products
                productsList={products}
                onProductSelected={productSelected}
                onProductRemoved={productRemove}
            />
            <Checkout />
        </>
    )
}

export default Home
