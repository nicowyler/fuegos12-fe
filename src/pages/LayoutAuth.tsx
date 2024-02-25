import { Outlet } from 'react-router-dom'
import bg from '../assets/bg.jpeg'
import { Suspense } from 'react'
import Loading from '@/components/Loading'

export default function LayoutAuth() {

  const renderLoading = () => {
    return (
      <div className='flex justify-center items-center'>
        <div className='w-10 h-10'>
          <Loading />
        </div>
      </div>
    )
  }

  return (
    <main>
      <div className='relative overflow-auto bg-cover bg-no-repeat w-full h-full'
        style={{ backgroundImage: `url(${bg})` }}>
        <Suspense fallback={renderLoading()}>
          <Outlet />
        </Suspense>
      </div>
    </main>
  )
}
