import Checkout from "@/components/CheckOut";
import Loading from "@/components/Loading";
import { MercadoPagoContext } from "@/context/MercadoPagoProvider";
import { useContext } from "react"
import Payment from '@/components/Payment';
import { initMercadoPago } from "@mercadopago/sdk-react";

initMercadoPago("TEST-867aa7f0-0743-4ebc-a445-d710b2d16648", {
    locale: "es-AR",
});

const Home = () => {

    const { isLoading, placeOrder, orderData } = useContext(MercadoPagoContext);

    const renderSpinner = () => isLoading && <Loading />;

    function handleClick(): void {
        if (orderData) {
            placeOrder(orderData);
        }
    }

    return (
        <main>
            {renderSpinner()}
            <Checkout onClick={handleClick} description="This is an example" />
            <Payment />
        </main>
    )
}

export default Home
