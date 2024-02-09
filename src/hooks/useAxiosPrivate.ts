import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { axiosPrivate } from "@/api/axios";
import { Auth } from "@/types/auth.types";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.tokens.access_token}`;
                }
                return config;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }, (error:any) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 || error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    console.log('auth?.tokens.refresh_token ===========')
                    console.log(auth?.tokens.refresh_token)
                    console.log('auth?.tokens.refresh_token ===========')
                    const newAccessToken:Auth = await refresh(auth?.tokens.refresh_token);
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken.tokens?.access_token}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;