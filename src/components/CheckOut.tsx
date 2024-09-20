import { useContext, FC, ReactElement, useState } from "react";
import { formatToArs } from '../lib/utils';
import PayButton from "@/components/PayButton";
import { MercadoPagoContext } from "@/hooks/MercadoPagoProvider";
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { createPreference } from "@/lib/api/mercadoPago";
import FireLoading from "@/components/fireLoading";
import { TProduct } from "@/types/products.types";
import UseUserStore from "@/store/user.store";

const Checkout: FC = (): ReactElement => {
  const { carbonData, woodData } = useContext(MercadoPagoContext);
  const { user } = UseUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const mutation = useMutation({
    mutationFn: createPreference,
    onSuccess: ({ data }) => {
      window.location.replace(data.data);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
    }
  })
  const { toast } = useToast()

  async function placeOrderHandler() {
    setIsLoading(true);
    const orderArray: TProduct[] = [carbonData, woodData].filter(
      (item): item is TProduct => item !== null && item !== undefined && item.quantity! > 0
    );
    await mutation.mutateAsync({ order: orderArray, userId: user?.id });
  }

  const shoppingCartClass = cn('absolute bottom-[-72rem] w-11/12 max-w-2xl md:min-h-40 bg-gray-800 m-auto transition transition-all duration-500 ease-in-out text-white py-4 px-6 rounded-t-lg bg-opacity-90', {
    'bottom-0': carbonData && carbonData?.quantity != 0 || woodData && woodData?.quantity != 0
  });

  const getTotal = () => {
    if (!carbonData || !woodData) return;
    const carbonTotal = carbonData && carbonData.unit_price * carbonData.quantity!;
    const woodTotal = woodData && woodData.unit_price * woodData.quantity!;
    const total = carbonTotal + woodTotal;
    return formatToArs(total);
  }

  const renderCarbonData = (carbonData: TProduct) => {
    if (carbonData.quantity == 0) return <></>;
    return (
      <div key={carbonData.title + carbonData.id} className="flex justify-between items-baseline text-md">
        <div className="flex">
          <span>{carbonData.title}</span>
          <span className="mx-2">x</span>
          <span>{carbonData.quantity} </span>
        </div>
        <span className="h-1 w-full mx-2 border-b-2 border-dashed border-x-slate-400 opacity-30"></span>
        <span>{formatToArs(carbonData.unit_price * carbonData.quantity!)}</span>
      </div>
    )
  }

  const renderWoodData = (woodData: TProduct) => {
    if (woodData.quantity == 0) return <></>;

    return (
      <div key={woodData.title + woodData.id} className="flex justify-between items-baseline text-md">
        <div className="flex">
          <span>{woodData.title}</span>
          <span className="mx-2">x</span>
          <span>{woodData.quantity} </span>
        </div>
        <span className="h-1 w-full mx-2 border-b-2 border-dashed border-x-slate-400 opacity-30"></span>
        <span>{formatToArs(woodData.unit_price * woodData.quantity!)}</span>
      </div>
    )
  }

  return (
    <>
      <section className="fixed md:absolute bottom-12 w-full flex justify-center">
        <div className={shoppingCartClass}>
          <div className="flex flex-col gap-2">
            <h3 className="w-full text-center">Productos Seleccionados</h3>
            <div className="flex flex-col">

              {
                carbonData && renderCarbonData(carbonData)
              }
              {
                woodData && renderWoodData(woodData)
              }

              <div className="flex px-2 py-2 rounded mt-2 justify-between items-baseline text-md text-green-500 font-bold bg-white/5">
                <span>TOTAL</span>
                <span className="w-full py-2 mx-2 border-b-2 border-dashed border-green-500 opacity-50"></span>
                <span>{getTotal()}</span>
              </div>
            </div>

            <PayButton
              className="my-0 mb-3"
              isLoading={isLoading}
              buttonLabel="Pagar"
              callback={() => placeOrderHandler()}
            />

          </div>
        </div>
      </section >
      {isLoading && <FireLoading />}
    </>
  );
};

export default Checkout;