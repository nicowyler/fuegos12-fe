import { Link } from '@tanstack/react-router';
import { useLottie } from "lottie-react";
import notFoundAnim from "../assets/lottie/not-found.json";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function NotFound() {
    const options = {
        animationData: notFoundAnim,
        loop: true,
        preserveAspectRatio: 'xMidYMid meet',
        style: {
            width: '80%',
            marginLeft: '3rem'
        }
    };

    const { View } = useLottie(options);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            {View}
            <h1 className="text-[100px] font-black pt-10 text-center">404</h1>
            <h1 className="text-2xl px-20 text-center font-black">No se encontro la pagina que estas buscando!</h1>

            <Link to="/">
                <Button variant="link" className="mt-10 text-2xl">
                    <ChevronLeft size={20} />
                    Ir al inicio
                </Button>
            </Link>
        </div>
    )
}