import CarbonPage from '@/components/carbon'
import Checkout from '@/components/CheckOut';
import WoodPage from '@/components/wood'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';
import TabButton from '../../../components/tabButton';
import { fetchProducts } from '../../../lib/api/products'
import { useQuery } from '@tanstack/react-query';
import FireLoading from '@/components/fireLoading';

type TabSearch = { tab: string };

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
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(),
  })
  const [tabPosition, setTabPosition] = useState("0%");
  const { tab } = Route.useSearch();

  useEffect(() => {
    if (tab === tabs.wood) {
      setTabPosition('-50%')
    } else {
      setTabPosition('0%')
    }
  }, [tab])

  return (
    <div className='w-[200vw] flex overflow-hidden'>
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
