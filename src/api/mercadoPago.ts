import { axiosPrivate } from "@/api/axios";
import { Response, TOrderData, TPreferenceId } from "@/types";

const CREATE_PREFERENCE = '/api/mercadopago/create_preference';

export class ApiMercadoPago {

    static createPreference = async (fields: TOrderData): Promise<Response<TPreferenceId>> => {
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
