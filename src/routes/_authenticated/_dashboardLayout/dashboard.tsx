import React from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react';
import TabButton from '../../../components/tabButton';
import { fetchProducts } from '../../../lib/api/products'
import { useQuery } from '@tanstack/react-query';
import { useSwipeable } from 'react-swipeable';
import { useLocationStore } from '@/store/location.store';

const FireLoading = React.lazy(() => import('@/components/fireLoading'));
const CarbonPage = React.lazy(() => import('@/components/carbon'));
const Checkout = React.lazy(() => import('@/components/CheckOut'));
const WoodPage = React.lazy(() => import('@/components/wood'));


type TabSearch = { tab: string };

const NEXT = "NEXT";
const PREV = "PREV";

const tabs = {
  wood: 'wood',
  carbon: "carbon"
}

export const Route = createFileRoute('/_authenticated/_dashboardLayout/dashboard')({
  validateSearch: (search: Record<string, unknown>): TabSearch => {
    return {
      tab: (search?.tab) as string || tabs.carbon,
    };
  },
  component: () => <ProductsList />,
})

export default function ProductsList() {
  const { storeId } = useLocationStore(); // Zustand action

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', storeId],
    queryFn: () => {
      if (!storeId) throw new Error('Store ID is required');
      return fetchProducts(storeId);
    },
  })

  const [tabPosition, setTabPosition] = useState("0%");
  const { tab } = Route.useSearch();
  const router = useRouter();


  useEffect(() => {
    if (tab === tabs.wood) {
      setTabPosition('-50%')
    } else {
      setTabPosition('0%')
    }
  }, [tab])

  function slide(direction: typeof NEXT | typeof PREV) {
    const redirectTo = "/dashboard?tab=" + tabs[direction === "NEXT" ? "wood" : "carbon"];
    router.history.push(redirectTo, { replace: true });
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => slide(NEXT),
    onSwipedRight: () => slide(PREV),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true
  });


  return (
    <div className='w-[200vw] h-[calc(100vh-64px)] flex overflow-hidden' {...handlers}>
      {isLoading &&
        <FireLoading />
      }
      {!isLoading && !isError && data &&
        <>
          <div className="w-screen h-fit transition-all duration-500" style={{ marginLeft: `${tabPosition}` }}>
            <CarbonPage defaultproduct={data.find((product) => product.type === 'CARBON')!} />
          </div>
          <div className='w-screen h-fit '>
            <WoodPage defaultproduct={data.find((product) => product.type === 'WOOD')!} />
          </div>
        </>
      }
      <Checkout />

      <footer className='fixed bottom-0 w-full h-16 bg-foreground flex justify-around items-center z-0'>
        <TabButton
          tabName="carbon"
          tab={tab}
          label="Carbón"
          linkTo="/dashboard"
        />
        <TabButton
          tabName="wood"
          tab={tab}
          label="Leña"
          linkTo="/dashboard"
        />

      </footer>
    </div>
  )
}