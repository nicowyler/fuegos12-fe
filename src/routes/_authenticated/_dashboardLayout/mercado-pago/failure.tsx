import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'
import failFire from '../../../../assets/fail-fire.jpg';

export const Route = createFileRoute('/_authenticated/_dashboardLayout/mercado-pago/failure')({
    component: () => <Failure />
})

export function Failure() {
    return (
        <div>
            <div className='w-4/5 overflow-hidden rounded m-auto mt-5'>
                <img src={failFire} alt="fail" />
            </div>
            <div className='m-auto w-4/5 text-center -mt-8 bg-[#FBF0AC] rounded-b p-10'>
                <h1 className='text-3xl font-extrabold'>Lo sentimos!</h1>
                <p>Algo salio mal!</p>
            </div>
            <div className='w-full flex justify-center'>
                <Link to="/">
                    <Button variant="link" className="mt-10 text-2xl">
                        <ChevronLeft size={20} />
                        Ir al inicio
                    </Button>
                </Link>
            </div>
        </div>
    )
}
