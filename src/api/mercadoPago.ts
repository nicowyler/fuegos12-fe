import { axiosPrivate } from "@/api/axios";
import { Response, TOrderData, TPreference } from '@/types';

const CREATE_PREFERENCE = '/api/mercadopago/create_preference';

export class ApiMercadoPago {

    static createPreference = async (fields: TOrderData[]): Promise<Response<TPreference>> => {
        let errorMessage: string = "";
        try {
            const response = await axiosPrivate.post(CREATE_PREFERENCE,
                JSON.stringify(fields),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            return response;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (!error.response) {
                errorMessage = 'Algo salio mal, vuelve a intentarlo!';
            } else {
                errorMessage = error.response?.data.message;
            }
            return errorMessage;
        }
    }
}
