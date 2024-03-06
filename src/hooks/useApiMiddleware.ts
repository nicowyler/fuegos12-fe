import { Response } from "@/types";
import { useState } from "react";


export const useApiMiddleware = () => {
    const [isLoading, setIsLoading] = useState(false);

    async function apiCall<T>(fetchFunction: () => Promise<Response<T>>) {
        setIsLoading(true);
        const response = await fetchFunction();
        setIsLoading(false);
        return response;
    }

    return { apiCall, isLoading };
}
