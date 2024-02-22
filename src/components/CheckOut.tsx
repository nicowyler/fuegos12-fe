import React, { useContext } from "react";
import classnames from 'classnames'
import { MercadoPagoContext } from "@/context/MercadoPagoProvider";
import { FC, ReactElement } from 'react';
import { TOrderData } from '../types/mercadoPago.types';;
import Payment from '@/components/Payment';
import Loading from "@/components/Loading";

const Checkout: FC = (): ReactElement => {
  const { isLoading, orderData } = useContext(MercadoPagoContext);
  const shoppingCartClass = classnames('bg-gray-800 text-white py-4 px-6 fixed bottom-0 right-0 left-0 mx-5 rounded-t-lg bg-opacity-90', {
    'shopping-cart--hidden': !orderData?.length,
    'animate-slide-up-fade animate-delay-300 animate-duration-slow': orderData?.length
  });

  const renderSpinner = () => isLoading && <Loading />;

  return (
    <section className={shoppingCartClass}>
      <div className="flex flex-col gap-2">
        <h3>Productos Seleccionados</h3>
        <span>Subtotal</span>
        <div className="flex flex-col justify-between">

          {
            orderData?.length ? orderData.map((item: TOrderData) => {
              return (
                <div key={item.id} className="flex justify-between items-baseline">
                  <div className="flex">
                    <span>{item.title}</span>
                    <span className="mx-2">x</span>
                    <span>{item.quantity} </span>
                  </div>
                  <span className="h-1 w-full mx-2 border-b-2 border-dashed border-x-slate-400"></span>
                  <span>${item.unit_price * item.quantity}</span>
                </div>
              )
            }) : null
          }

          <div className="pt-4 flex justify-between items-baseline">
            <span>TOTAL</span>
            <span className="h-1 w-full mx-2 border-b-2 border-dashed border-x-slate-400"></span>
            <span>${orderData?.length && orderData?.map((item: TOrderData) => item.unit_price * item.quantity).reduce((a, b) => a + b, 0)}</span>
          </div>
        </div>
        {/* <button
          onClick={onClick}
          disabled={disabled}
          className="mt-10 flex w-full justify-center rounded-md bg-f12-orange px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-f12-orange-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Comprar
        </button> */}
        <div className="min-h-28">
          {isLoading
            ? <div className="w-full flex justify-center"><Loading /></div>
            : <Payment />
          }
        </div>
      </div>
    </section>
  );
};

export default Checkout;