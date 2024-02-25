import React, { useContext, useEffect, useState } from "react";
import classnames from 'classnames'
import { Wallet } from "@mercadopago/sdk-react";
import { MercadoPagoContext } from '../context/MercadoPagoProvider';

const Payment = () => {
    const { preferenceId } = useContext(MercadoPagoContext);
    const [isReady, setIsReady] = useState(false);
    const paymentClass = classnames('payment-form dark');

    const customization = {
        visual: {
            hideValueProp: true
        }
    };

    const handleOnReady = () => {
        setIsReady(true);
    }

    const renderCheckoutButton = (preferenceId: string) => {
        if (!preferenceId) return null;

        return (
            <div className={classnames("opacity-0", { "opacity-100": isReady })}>
                <Wallet
                    initialization={{ preferenceId, redirectMode: 'modal' }}
                    customization={customization}
                    locale='es-AR'
                    onReady={handleOnReady}
                />
            </div>
        )
    }

    return (
        <div className={paymentClass}>
            {preferenceId && renderCheckoutButton(preferenceId)}
        </div>
    );
};

export default Payment;