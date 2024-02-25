import { formatToArs } from '@/utils';
import classNames from 'classnames';
import { FC, ReactElement, useState } from 'react';

type ProductsProps = {
    productsList: TProduct[],
    onProductSelected: (id: string) => void,
    onProductRemoved: (id: string) => void
};

const Products: FC<ProductsProps> = ({ productsList, onProductSelected, onProductRemoved }: ProductsProps): ReactElement => {
    const [animateNumber, setAnimateNumber] = useState([false, ""]);
    const [productClicked, setProductClicked] = useState(false);

    const onProductChange = (id: string) => {
        onProductSelected(id);
        setAnimateNumber([true, id]);
        setProductClicked(true);

        setTimeout(() => {
            setAnimateNumber([false, id]);
        }, 500);
    }

    return (
        <div className="bg-white py-5 md:my-16">
            <div className="mx-auto md:py-5 max-w-2xl px-4 ">

                <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 gap-y-5 px-7 md:px-0">
                    {productsList.map((product) => (
                        <div key={product.id} className="group">
                            <div className="aspect-h-2 aspect-w-3 max-h-72 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 relative">
                                <div className='mt-2 ml-2'>
                                    <h3 className="text-md font-bold  text-gray-500">{product.title}</h3>
                                    <div className="text-sm text-gray-500">{formatToArs(product.unit_price)}</div>
                                </div>
                                <div className='w-full flex justify-end items-start'>
                                    {product.quantity > 0 &&
                                        <div className='flex items-center z-10'>
                                            <span
                                                onClick={() => onProductRemoved(product.id)}
                                                className='text-f12-black uppercase text-sm mr-2 bg-f12-blue bg-opacity-20 rounded-md h-10 w-12 flex justify-center items-center animate-fade-in'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>

                                            </span>
                                            <div className='bg-orange-500 h-10 w-12 flex justify-center items-center text-white rounded-md px-2 overflow-hidden'>
                                                <span className={classNames('text-base text-f12-creame font-bold', {
                                                    'animate-fade-in-down animate-duration-300': animateNumber[0] && animateNumber[1] === product.id,
                                                })}>
                                                    {product.quantity}
                                                </span>
                                            </div>
                                        </div>
                                    }
                                    <div onClick={() => onProductChange(product.id)} className='absolute z-0 w-full h-full cursor-pointer'></div>
                                </div>
                                <div className='w-full h-full flex justify-center items-end pointer-events-none'>
                                    <img
                                        src={product.image.href}
                                        alt={product.image.alt}
                                        className="h-4/5 w-4/5 object-scale-down object-center group-hover:opacity-75"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className={classNames("text-balance text-gray-400 rounded-lg border-gray-200 border-solid border-2 p-10 flex flex-col justify-center items-center transition-all duration-500 mt-0", {
                        'mt-16 opacity-0': productClicked
                    })}>
                        <div className='text-f12-orange w-full flex pb-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                            </svg>
                            <p>Como Funciona?</p>
                        </div>
                        <p className='text-gray-600'>Presiona en alguno del los productos para iniciar tu compra!</p>
                    </div>

                </div>
            </div>
        </div>
    )
};

export default Products;

