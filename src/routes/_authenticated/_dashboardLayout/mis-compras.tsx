import UseUserStore from '@/store/user.store';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { getTransactions } from '@/lib/api/transactions';
import FireLoading from '@/components/fireLoading';
import { Transaction, TransactionProduct } from '@/types';

export const Route = createFileRoute('/_authenticated/_dashboardLayout/mis-compras')({
    component: MisCompras,
});

function MisCompras() {
    const userState = UseUserStore();
    const userId = userState.user?.id;

    const { data, isLoading } = useQuery({
        queryKey: ['products', userId],
        queryFn: () => getTransactions(userId),
        enabled: !!userId,
    })

    if (isLoading) {
        return <FireLoading />
    }

    return (
        <div className="p-2">
            <h1>Mis Compras</h1>
            <ul>
                {data && data.map((compra: Transaction) => (
                    <li key={compra.id} className='flex flex-col gap-1'>
                        <span>{compra.order_id}</span>
                        <span>{compra.status_detail}</span>
                        <span>
                            {compra.transactionProducts.map((product: TransactionProduct) => (
                                <p key={product.id}> {product.quantity} {product.quantity === 1 ? 'bolsa' : 'bolsas'} de {product.product.title}</p>
                            ))}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

