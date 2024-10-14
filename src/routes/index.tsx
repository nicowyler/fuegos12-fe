import FireLoading from '@/components/fireLoading';
import { cn } from '@/lib/utils'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react';
import { useTimeout } from 'usehooks-ts'

export const Route = createFileRoute('/')({
    component: () => <InitialScreen />
})

export default function InitialScreen() {
    const [bgAnim, setBgAnim] = useState(false);
    const router = useRouter();

    function navigate() {
        router.history.push('/dashboard', { replace: true });
    }

    useTimeout(() => setBgAnim(true), 500)

    useEffect(() => {
        if (bgAnim) {
            const timeoutId = setTimeout(() => {
                navigate();
            }, 1000);

            return () => clearTimeout(timeoutId); // Cleanup timeout when component unmounts
        }
    }, [bgAnim, navigate]);

    return (
        <div className='h-screen w-full flex flex-col bg-foreground relative'>
            <div className={cn('bg-white w-full h-full absolute z-30 opacity-0 transition-all duration-1000', {
                'opacity-100': bgAnim
            })}></div>
            <div className={cn('w-full flex justify-center items-center p-20')}>
                <img src="/logo-fuegos12.svg" alt='logo' />
            </div>
            <FireLoading addOverlay={false} className='mt-10' />
        </div>
    )
}

