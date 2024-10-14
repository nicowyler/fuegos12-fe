/* eslint-disable no-unused-vars */
import { TProduct } from '@/types/products.types';
import { FC, ReactElement, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MinusCircle, PlusCircle, Trash2 } from 'lucide-react';
import LoadingImage from '@/components/LoadingImage';
import { cn, formatToArs } from '@/lib/utils';

type ProductsProps = {
    product: TProduct,
    onProductSelected: (id: string) => void,
    onProductRemoved: (id: string) => void,
    onRemoveAllProducts: () => void
};

const Products: FC<ProductsProps> = ({ product, onProductSelected, onProductRemoved, onRemoveAllProducts }: ProductsProps): ReactElement => {
    const [animateNumber, setAnimateNumber] = useState([false, ""]);
    const [removeAnim, setRemoveAnim] = useState([false, ""]);
    const [, setProductClicked] = useState(false);

    const onProductChange = (id: string) => {
        onProductSelected(id);
        setAnimateNumber([true, id]);
        setProductClicked(true);

        setTimeout(() => {
            setAnimateNumber([false, id]);
        }, 500);
    }

    const onRemovingProduct = (id: string) => {
        setRemoveAnim([true, id]);
        setTimeout(() => {
            setRemoveAnim([false, id]);
            onProductRemoved(id);
        }, 300);
    }

    return (
        <div className="bg-white py-5 md:my-16">
            <div className="mx-auto md:py-5 max-w-2xl px-4">
                <h1 className='text-1xl mb-5 w-full text-balance text-center'>¿Cuantas bolsas de <span className='font-bold'>{product.title}</span> queres comprar?</h1>
                <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 gap-y-5 px-7 md:px-0">
                    <>
                        <div key={product.id} className="group">
                            <div className="aspect-h-2 aspect-w-3 max-h-72 overflow-hidden rounded-t-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 relative">
                                <div className='w-full flex justify-center items-start min-h-[60px]'>
                                    {product.quantity! <= 0 &&
                                        <Button className='mt-2 w-40 animate-fade-in' onClick={() => onProductChange(product.id)}>
                                            Agragar
                                        </Button>
                                    }
                                    {product.quantity! > 0 &&
                                        <div className='flex bg-orange-500 rounded-b-md animate-fade-in-down animate-duration-200'>
                                            <button onClick={() => onRemovingProduct(product.id)}
                                                className='text-sm text-white bg-f12-blue rounded-bl-md h-10 w-12 flex justify-center items-center '>
                                                <MinusCircle />
                                            </button>

                                            <div className='h-10 w-12 flex justify-center items-center text-white px-2 overflow-hidden animate-fade-in-down'>
                                                <span className={cn('text-base text-f12-creame font-bold', {
                                                    'animate-fade-in-down animate-duration-250': animateNumber[0] && animateNumber[1] === product.id,
                                                    'animate-fade-out-down animate-duration-250': removeAnim[0] && removeAnim[1] === product.id
                                                })}>
                                                    {product.quantity}
                                                </span>
                                            </div>
                                            <button onClick={() => onProductChange(product.id)}
                                                className='text-sm mr-2 bg-f12-blue text-white rounded-br-md h-10 w-12 flex justify-center items-center'>
                                                <PlusCircle />
                                            </button>
                                        </div>
                                    }
                                    {
                                        product.quantity! > 0 &&
                                        <button onClick={() => onRemoveAllProducts()}
                                            className='absolute right-0 text-sm text-foreground rounded-br-md h-10 w-12 flex justify-center items-center animate-fade-in'>
                                            <Trash2 />
                                        </button>
                                    }
                                </div>
                                <div className='w-full h-full min-h-[145px] flex justify-center items-center pointer-events-none'>
                                    <LoadingImage
                                        src={product.picture_url}
                                        alt={product.description}
                                        aspectRatio='3/2'
                                    />
                                </div>
                            </div>
                            <div className='flex justify-between items-center px-10 py-2 border border-gray-200 rounded-b'>
                                <h3 className="text-md font-bold  text-gray-500">Precio</h3>
                                <div className="text-sm text-gray-500 font-bold">{formatToArs(product.unit_price)}</div>
                            </div>
                        </div>

                    </>
                </div>
            </div>
        </div>
    )
};

export default Products;

