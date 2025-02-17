import { formatToArs } from "@/lib/utils";


type DiscountDays = {
    days: string[];
    price: number;
}

type Props = {
    discountDays: DiscountDays;
    isLoading: boolean;
}

export default function DiscountDays({ discountDays, isLoading }: Props) {
    const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

    // Convert string array indices to numbers and ensure they are valid
    const firstDayIndex = parseInt(discountDays.days[0]) - 1;
    const lastDayIndex = parseInt(discountDays.days[discountDays.days.length - 1]) - 1;

    return (
        <div className='text-lg bg-green-600 h-20 text-white p-2 w-3/4 m-auto mt-2 rounded shadow font-extrabold flex justify-center items-center text-center leading-18'>
            {isLoading
                ? <p>Cargando precio promocional...</p>
                : <div>
                    <p>
                        Precio promocional de
                    </p>
                    <p className="text-nowrap"> {days[firstDayIndex]} a {days[lastDayIndex]}
                        <span className="bg-white rounded text-green-500 p-1 ml-2">
                            {formatToArs(discountDays.price)}
                        </span>
                    </p>
                </div>
            }
        </div>
    )
}