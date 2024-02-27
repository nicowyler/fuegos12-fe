import axios from '@/api/axios';
import useAuth from './useAuth';
import { ApiResponse, AuthType } from '@/types';

const useRefreshToken = () => {

    const { setAuth } = useAuth();

    const refresh = async (refreshToken: string | undefined) => {
        const response: ApiResponse<AuthType> = await axios.get('/api/auth/refresh', {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        });
        console.log('response === > ', response)
        const { data } = response.data;
        setAuth((prev: unknown): AuthType | null => {
            if (prev) {
                return { ...prev, ...data }
            } else {
                return data;
            }
        });
        return data;
    }
    return refresh;
};

export default useRefreshToken;
