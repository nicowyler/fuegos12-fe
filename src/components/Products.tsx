import { formatToArs } from '@/utils';
import { FC, ReactElement } from 'react';

type ProductsProps = {
    productsList: TProduct[],
    onProductSelected: (id: string) => void,
    onProductRemoved: (id: string) => void
};

const Products: FC<ProductsProps> = ({ productsList, onProductSelected, onProductRemoved }: ProductsProps): ReactElement => {

    return (
        <div className="bg-white py-10 md:my-auto">
            <div className="mx-auto md:py-5 max-w-2xl px-4 ">

                <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 gap-y-5 px-7 md:px-0">
                    {productsList.map((product) => (
                        <div key={product.id} className="group">
                            <div className="aspect-h-3 aspect-w-4 max-h-72 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 relative">
                                <div className='w-full flex justify-end items-start'>
                                    {product.quantity > 0 &&
                                        <div className='flex items-center z-10'>
                                            <span
                                                onClick={() => onProductRemoved(product.id)}
                                                className='text-f12-black uppercase text-sm mr-2 bg-f12-blue bg-opacity-20 rounded-md py-2 px-4'>
                                                borrar seleccion
                                            </span>
                                            <span className='bg-orange-500 h-10 w-10 flex justify-center items-center text-white rounded-md px-2'>
                                                {product.quantity}
                                            </span>
                                        </div>
                                    }
                                    <div onClick={() => onProductSelected(product.id)} className='absolute z-0 w-full h-full cursor-pointer'></div>
                                </div>
                                <div className='w-full h-full flex justify-center items-end pointer-events-none'>
                                    <img
                                        src={product.image.href}
                                        alt={product.image.alt}
                                        className="h-4/5 w-4/5 object-scale-down object-center group-hover:opacity-75"
                                    />
                                </div>
                            </div>
                            <div className='sm:block flex justify-between items-baseline'>
                                <h3 className="mt-4 text-lg font-bold  text-gray-700">{product.title}</h3>
                                <div className="h-1 w-full mx-2 border-b-2 border-x-slate-400 sm:hidden"></div>
                                <p className="mt-1 text-lg font-medium text-gray-700">{formatToArs(product.unit_price)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Products;

