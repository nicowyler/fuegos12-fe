import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_authLayout')({
    component: () => <div className='h-screen w-full flex flex-col md:flex-row'>
        <div className='w-full md:max-w-[600px] bg-foreground flex justify-center items-center p-5 md:p-0'>
            <img className='w-1/2 md:w-auto' src="/logo-fuegos12.svg" alt='logo' />
        </div>
        <div className='w-full h-full md:px-12 md:py-14'>
            <Outlet />
        </div>
    </div>
})
