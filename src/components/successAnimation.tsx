import { useLottie } from "lottie-react";
import groovyWalkAnimation from "../assets/lottie/success.json";
import { cn } from "@/lib/utils";

type Props = {
    className?: string
}

export default function SuccessAnimation({ className }: Props) {
    const options = {
        animationData: groovyWalkAnimation,
        loop: false,
        preserveAspectRatio: 'xMidYMid meet',
        style: {
            width: '100%'
        }
    };

    const { View } = useLottie(options);

    return <div className={cn("w-full h-full absolute top-20 left-0 flex justify-start items-start", className)}>
        {View}
    </div>
};
