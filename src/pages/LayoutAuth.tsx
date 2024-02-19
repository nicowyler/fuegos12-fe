import { Outlet } from 'react-router-dom'
import bg from '../assets/bg.jpeg'
import { Suspense } from 'react'
import Loading from '@/components/Loading'

export default function LayoutAuth() {
  return (
    <main>
        <div className='relative overflow-hidden bg-cover bg-no-repeat w-full h-full'
          style={{backgroundImage: `url(${bg})`}}>
        <Suspense fallback={<Loading />}>
          <Outlet/>
        </Suspense>
        </div>
    </main>
  )
}
