import SuccessAnimation from '@/components/successAnimation'
import { cn } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';
import { useTimeout } from 'usehooks-ts';

export const Route = createFileRoute('/_authenticated/_dashboardLayout/mercado-pago/success')({
    component: () => <SuccessfullTransaction />
})

export default function SuccessfullTransaction() {
    const [animateMessage, setAnimateMessage] = useState(false);
    useTimeout(() => setAnimateMessage(true), 2500)
    return (
        <div className='overflow-hidden'>
            <div className='w-[450px] h-[420px]'>
                <SuccessAnimation />
            </div>
            <div className='flex justify-center'>
                <div className={cn('text-center p-5 font-black bg-foreground text-white w-3/4 rounded-2xl space-y-4 transition-all duration-500 opacity-0 absolute -bottom-10', {
                    'bottom-5 opacity-1': animateMessage
                })}>
                    <p className='text-3xl'>Gracias por su Compra!</p>
                    <p className='text-primary'>No te olvides de cerrar la puerta al terminar!</p>
                </div>
            </div>
        </div>
    )
}