import React, { useContext, useState } from "react";
import classnames from 'classnames'
import { Wallet } from "@mercadopago/sdk-react";
import { MercadoPagoContext } from '../context/MercadoPagoProvider';

const Payment = () => {
    const { preferenceId } = useContext(MercadoPagoContext);
    const [isReady, setIsReady] = useState(false);
    const paymentClass = classnames('payment-form dark animate-fade-in animate-delay-800', {
        'payment-form--hidden': !isReady,
    });

    const handleOnReady = () => {
        setIsReady(true);
    }

    const renderCheckoutButton = (preferenceId: string) => {
        if (!preferenceId) return null;

        return (
            <Wallet
                initialization={{ preferenceId, redirectMode: 'modal' }}
                onReady={handleOnReady}
            />
        )
    }

    return (
        <div className={paymentClass}>
            {preferenceId && renderCheckoutButton(preferenceId)}
        </div>
    );
};

export default Payment;