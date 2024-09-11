import { useLottie } from "lottie-react";
import groovyWalkAnimation from "../assets/lottie/fire.json";
import { cn } from "@/lib/utils";

type Props = {
    addOverlay?: boolean,
    className?: string
}

export default function FireLoading({ addOverlay = true, className }: Props) {
    const options = {
        animationData: groovyWalkAnimation,
        loop: true,
        preserveAspectRatio: 'xMidYMid meet',
        style: {
            width: '30%',
        }
    };

    const { View } = useLottie(options);

    return <div className={cn("w-full h-full fixed inset-0 flex justify-center items-center z-20", className, {
        'bg-black bg-opacity-60': addOverlay
    })}>
        {View}
    </div>
};
