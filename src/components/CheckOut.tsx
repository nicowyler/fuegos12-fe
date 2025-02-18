import { useContext, FC, ReactElement, useState, useEffect } from "react";
import PayButton from "@/components/PayButton";
import { MercadoPagoContext } from "@/hooks/MercadoPagoProvider";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { createPreference } from "@/lib/api/mercadoPago";
import FireLoading from "@/components/fireLoading";
import { ProductType, TProduct } from "@/types/products.types";
import { useAuth } from "@/hooks";
import { cn, formatToArs } from "@/lib/utils";
import { useDiscountCalc } from "@/hooks/useDiscountsCalc";

const Checkout: FC = (): ReactElement => {
  const { carbonData, woodData } = useContext(MercadoPagoContext);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { data: discountCarbon, isLoading: discountCarbonLoading, setProductDiscount: setCarbonDiscount } = useDiscountCalc();
  const { data: discountWood, isLoading: discountWoodLoading, setProductDiscount: setWoodDiscount } = useDiscountCalc();

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

  useEffect(() => {
    if (carbonData) {
      setCarbonDiscount({ id: carbonData.id, quantity: carbonData.quantity || 0 });
    }
  }, [carbonData, setCarbonDiscount])

  useEffect(() => {
    if (woodData) {
      setWoodDiscount({ id: woodData.id, quantity: woodData.quantity || 0 });
    }
  }, [woodData, setWoodDiscount])

  async function placeOrderHandler() {
    setIsLoading(true);
    const carbonDiscount = getDiscountType('CARBON');
    const woodDiscount = getDiscountType('WOOD');

    const orderArray: Omit<TProduct, "discounts">[] = [carbonData, woodData]
      .filter((item): item is TProduct =>
        item !== null &&
        item !== undefined &&
        item.quantity! > 0
      )
      .map(({ discounts, ...rest }) => ({
        ...rest,
        price: rest.id === carbonData?.id
          ? rest.price * (1 - carbonDiscount / 100)
          : rest.price * (1 - woodDiscount / 100)
      }));
    await mutation.mutateAsync({ order: orderArray, userId: user?.uid });
  }

  const shoppingCartClass = cn('absolute bottom-[-72rem] w-11/12 max-w-2xl md:min-h-40 bg-gray-800 m-auto transition transition-all duration-500 ease-in-out text-white py-4 px-6 rounded-t-lg bg-opacity-90', {
    'bottom-0': carbonData && carbonData?.quantity != 0 || woodData && woodData?.quantity != 0
  });

  const getTotal = () => {
    if (!carbonData || !woodData) return;
    const carbonTotal = discountCarbon ? +discountCarbon : carbonData && carbonData.price * carbonData.quantity!;
    const woodTotal = discountWood ? +discountWood : woodData && woodData.price * woodData.quantity!;
    const total = carbonTotal + woodTotal;
    return formatToArs(total);
  }

  const getDiscountType = (type: ProductType) => {
    let percent = 0;
    if (type == 'CARBON') {
      carbonData?.discounts.map((discount) => {
        if (carbonData.quantity! >= discount.min_quantity) {
          percent = discount.discount_percentage
        }
      })
    } else if (type == 'WOOD') {
      woodData?.discounts.map((discount) => {
        if (woodData.quantity! >= discount.min_quantity) {
          percent = discount.discount_percentage
        }
      })
    }
    return percent;
  }

  const renderCarbonData = (carbonData: TProduct) => {
    if (carbonData.quantity == 0) return <></>;
    const percent = getDiscountType('CARBON');

    return (
      <div key={carbonData.title + carbonData.id} className="flex justify-between items-baseline text-md">
        <div className="flex">
          <span>{carbonData.title}</span>
          <span className="mx-2">x</span>
          <span>{carbonData.quantity} </span>
          {percent != 0 &&
            <span className="ml-2 bg-green-600 px-1 rounded leading-none w-fit text-nowrap flex justify-center items-center">{`${percent}% OFF`}</span>
          }
        </div>
        <span className="h-1 w-full mx-2 border-b-2 border-dashed border-x-slate-400 opacity-30"></span>
        <span>{formatToArs(discountCarbon ? +discountCarbon : carbonData.price * carbonData.quantity!)}</span>
      </div>
    )
  }

  const renderWoodData = (woodData: TProduct) => {
    if (woodData.quantity == 0) return <></>;
    const percent = getDiscountType('WOOD');

    return (
      <div key={woodData.title + woodData.id} className="flex justify-between items-baseline text-md">
        <div className="flex">
          <span>{woodData.title}</span>
          <span className="mx-2">x</span>
          <span>{woodData.quantity} </span>
          {percent != 0 &&
            <span className="ml-2 bg-green-600 px-1 rounded leading-none w-fit text-nowrap flex justify-center items-center">{`${percent}% OFF`}</span>
          }
        </div>
        <span className="h-1 w-full mx-2 border-b-2 border-dashed border-x-slate-400 opacity-30"></span>
        <span>{formatToArs(discountWood ? +discountWood : woodData.price * woodData.quantity!)}</span>
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
                {
                  discountWoodLoading || discountCarbonLoading
                    ? <FireLoading />
                    : <span>{getTotal()}</span>
                }
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