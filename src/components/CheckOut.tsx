import React, { useContext } from "react";
import classnames from 'classnames'
import { MercadoPagoContext } from "@/context/MercadoPagoProvider";
import { FC, ReactElement } from 'react';
import { TOrderData } from '../types/mercadoPago.types';;
import { formatToArs } from '../utils/index';
import PayButton from "@/components/PayButton";

const Checkout: FC = (): ReactElement => {
  const { isLoading, orderData, preference } = useContext(MercadoPagoContext);
  const shoppingCartClass = classnames('absolute w-11/12 max-w-2xl md:min-h-40 bg-gray-800 m-auto transition transition-all duration-500 ease-in-out text-white py-4 px-6 rounded-t-lg bg-opacity-90', {
    'bottom-[-72rem]': !orderData?.length,
    'bottom-0': orderData?.length
  });

  const getTotal = () => {
    if (!orderData) return;
    const total = +(orderData?.length && orderData?.map((item: TOrderData) => item.unit_price * item.quantity).reduce((a, b) => a + b, 0))
    return formatToArs(total);
  }

  return (
    <section className="fixed md:absolute bottom-0 w-full flex justify-center">
      <div className={shoppingCartClass}>
        <div className="flex flex-col gap-2">
          <h3 className="w-full text-center">Productos Seleccionados</h3>
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
                    <span className="h-1 w-full mx-2 border-b-2 border-dashed border-x-slate-400 opacity-30"></span>
                    <span>{formatToArs(item.unit_price * item.quantity)}</span>
                  </div>
                )
              }) : null
            }

            <div className="pt-4 flex justify-between items-baseline">
              <span>TOTAL</span>
              <span className="h-1 w-full mx-2 border-b-2 border-dashed border-x-slate-400 opacity-30"></span>
              <span>{getTotal()}</span>
            </div>
          </div>

          <PayButton disabled={isLoading} preference={preference} buttonLabel="Pagar" />

        </div>
      </div>
    </section >
  );
};

export default Checkout;