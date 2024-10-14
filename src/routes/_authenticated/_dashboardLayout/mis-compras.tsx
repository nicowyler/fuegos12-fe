import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { getTransactions } from '@/lib/api/transactions';
import FireLoading from '@/components/fireLoading';
import { Transaction, TransactionProduct } from '@/types';
import { useAuth } from '@/hooks';
import { capitalizeFirstLetter, formatDate, formatToArs } from '@/lib/utils';
import Card, { CardHeader, CardBody } from '@/components/card'
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_authenticated/_dashboardLayout/mis-compras')({
    component: MisCompras,
});

function MisCompras() {
    const { user } = useAuth();
    const userId = user?.uid;

    const { data, isLoading } = useQuery({
        queryKey: ['products', userId],
        queryFn: () => getTransactions(userId),
        enabled: !!userId,
    })

    if (isLoading) {
        return <FireLoading />
    }

    function getFromatedDate(date: string) {
        const formated = formatDate(date, true);
        if (typeof formated === 'object') return `${formated.day} de ${capitalizeFirstLetter(formated.month)}` // return (day, month,
    }

    return (
        <Card className='border-none shadow-none overflow-hidden'>
            <CardHeader>
                <div className='flex flex-col justify-center'>
                    <h2 className="text-2xl md:text-3xl font-black text-f12-black">
                        Mis Compras
                    </h2>
                    <p className='text-muted text-sm md:text-base'>Aca podes ver todas tus compras!</p>
                </div>
            </CardHeader>
            <CardBody className='h-full overflow-auto max-h-[calc(100vh-11rem)]'>
                {data && data.length === 0 &&
                    <div>
                        <p className='font-medium text-xl text-center'>Todavia no hiciste ninguna compra!</p>
                        <div className='flex justify-center bg-slate-200 rounded p-2 shadow-md mx-8 mt-10'>
                            <p className='text-center px-4 mt-2'>
                                Para comprar anda a <Link to='/dashboard' search={{ tab: 'carbon' }} >
                                    <Button className='text-base p-0 m-0 text-primary h-0' variant='link'>productos</Button>
                                </Link> y selecciona lo que necesites para tu proximo asado!
                            </p>
                        </div>
                    </div>
                }
                <ul className='flex flex-col gap-4 w-full pb-5 overflow-hidden'>
                    {data && data.map((compra: Transaction) => (
                        <li key={compra.id} className='flex flex-col gap-2 border border-border rounded shadow-sm p-2'>
                            <div className='text-sm px-4 w-full border-b border-border pb-1 flex justify-between'>
                                <span>transacción nº {compra.order_id}</span>
                                <span>{getFromatedDate(compra.created)}</span>
                            </div>
                            <span>
                                {compra.transactionProducts.map((p: TransactionProduct) => {
                                    return (
                                        <div className='flex justify-between items-center px-4 py-2'>
                                            <div className='flex gap-2 items-center text-sm'>
                                                <img className='h-8' src={p.product.picture_url} alt={p.product.title} />
                                                <span className='font-medium'>
                                                    {p.product.title}
                                                </span>
                                                <span>x{p.quantity}</span>
                                            </div>
                                            <span className='text-sm'>{formatToArs(p.product.unit_price)}</span>
                                        </div>
                                    )
                                })}
                                <div className='flex justify-between items-center px-4 border-t border-border text-sm font-bold pt-2'>
                                    <span>TOTAL</span>
                                    <span>{formatToArs(compra.transaction_amount)}</span>
                                </div>
                            </span>
                        </li>
                    ))}
                </ul>

            </CardBody>
        </Card>
    );
}

