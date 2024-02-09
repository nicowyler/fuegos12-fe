import axios from "@/api/axios";
import { ApiResponse, Auth, ErrorMessage } from "@/types";

const LOGIN_URL = '/api/auth/login';

export class ApiAuth {

    static login = async (email:string, password:string):Promise<ApiResponse<Auth> | ErrorMessage> => {
        let errorMessage:string = "";
        try{
            const authApi:ApiResponse<Auth> = await axios.post(LOGIN_URL,
                JSON.stringify({ email:email, password:password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            return authApi;
        } catch (error:any) {
            if (!error.response) {
                errorMessage = 'No Server Response';
            } else if (error.response?.data.statusCode === 400) {
                errorMessage = 'Missing Username or Password';
            } else if (error.response?.data.statusCode === 401) {
                errorMessage = error.response?.data.message;
            } else if (error.response?.data.statusCode === 404) {
                errorMessage = error.response?.data.message;
            }
             else {
                errorMessage = 'Login Failed';
            }
            return errorMessage;
        }
    }
}
