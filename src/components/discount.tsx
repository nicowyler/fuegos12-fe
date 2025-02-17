import { Discount, ProductType } from "@/types/products.types"
import { MessageCircleWarning } from "lucide-react"

type Props = {
    type: ProductType,
    discounts: Discount[]
}

export default function Discounts({ type, discounts }: Props) {
    return (
        <div className="bg-white border-2 border-green-600 w-3/4 m-auto p-2 rounded text-base flex gap-4 shadow">
            <div className="flex justify-center items-center p-2 rounded text-white bg-green-600 h-16">
                <MessageCircleWarning size={45} />
            </div>
            <div className="space-y-4">
                {discounts && discounts.map((discount, index) => {
                    return (
                        <div key={index} className="w-full text-left text-xl mt-2 flex gap-5 text-black [&>p>span]:text-green-600  [&>p>span]:font-bold">
                            <p>Comprando <span>{discount.min_quantity}</span> o mas, tenes un <span>{discount.discount_percentage}%</span> de descuento.</p>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}

