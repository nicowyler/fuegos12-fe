import LoadingIndicator from "@/components/loadingIndicator";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {
    src: string,
    alt?: string,
    height?: number,
    width?: number,
    aspectRatio?: string,
    classname?: string
}

export default function LoadingImage({ src, alt, height, width, aspectRatio, classname }: Props) {

    const [loadingImage, setLoadingImage] = useState(false);
    const [imgSrc, setImgSrc] = useState<string>("");

    useEffect(() => {
        setLoadingImage(true);
        fetch(src)
            .then((response) => response)
            .then((data) => {
                setImgSrc(data.url)
            })
            .then(() => setLoadingImage(false))
    }, []);


    return (
        <div className={cn("w-full h-full flex justify-center items-center", width, height, classname)}>
            {loadingImage
                ? <LoadingIndicator className="stroke-primary" />
                : <img style={{ aspectRatio: aspectRatio }} src={imgSrc} alt={alt || "loading"} />
            }
        </div>
    )
}