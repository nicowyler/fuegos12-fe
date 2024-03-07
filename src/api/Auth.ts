import axios, { axiosPrivate } from "@/api/axios";
import { RegisterSchemaType } from "@/pages/Register";
import { ApiResponse, AuthType, EmailRecoverType, OtpType, Response } from "@/types";

const API_BASE = '/api/auth';
const LOGIN_URL = `${API_BASE}/login`;
const PASSWORD_RESET = `${API_BASE}/new-password`;
const PASSWORD_RECOVER = `${API_BASE}/password-recover`;
const REGISTER_URL = `${API_BASE}/register`;
const OTP_URL = `${API_BASE}/verify`;
const LOGOUT_URL = `${API_BASE}/logout`;

export class ApiAuth {

    static register = async (fields: RegisterSchemaType): Promise<Response<AuthType>> => {
        let errorMessage: string = "";
        try {
            const authApi: ApiResponse<AuthType> = await axios.post(REGISTER_URL,
                JSON.stringify({ ...fields }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            return authApi;
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

    static login = async (email: string, password: string): Promise<Response<AuthType>> => {
        let errorMessage: string = "";
        try {
            const authApi: Response<AuthType> = await axios.post(LOGIN_URL,
                JSON.stringify({ email: email, password: password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            return authApi
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (!error.response) {
                errorMessage = 'Algo salio mal, vuelve a intentarlo!';
            } else if (error.response?.data.statusCode === 400) {
                errorMessage = 'El email o la contraseña son incorrectos';
            } else {
                errorMessage = error.response?.data.message;
            }
            return errorMessage;
        }
    }

    static passwordRecover = async (email: string): Promise<Response<EmailRecoverType>> => {
        let errorMessage: string = "";
        try {
            const authApi: Response<EmailRecoverType> = await axios.post(PASSWORD_RECOVER,
                JSON.stringify({ email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            return authApi
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (!error.response) {
                errorMessage = 'Algo salio mal, vuelve a intentarlo!';
            } else if (error.response?.data.statusCode === 400) {
                errorMessage = 'El email o la contraseña son incorrectos';
            } else {
                errorMessage = error.response?.data.message;
            }
            return errorMessage;
        }
    }

    static passwordReset = async (password: string, oldPassword: string | null, email: string | null): Promise<Response<EmailRecoverType>> => {
        let errorMessage: string = "";
        try {
            const authApi: Response<EmailRecoverType> = await axios.post(PASSWORD_RESET,
                JSON.stringify({ password, oldPassword, email }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return authApi
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (!error.response) {
                errorMessage = 'Algo salio mal, vuelve a intentarlo!';
            } else if (error.response?.data.statusCode === 400) {
                errorMessage = 'El email o la contraseña son incorrectos';
            } else {
                errorMessage = error.response?.data.message;
            }
            return errorMessage;
        }
    }

    static otp = async (phone: string, code: string): Promise<Response<OtpType>> => {
        let errorMessage: string = "";
        try {
            const authApi: ApiResponse<OtpType> = await axios.post(OTP_URL,
                JSON.stringify({ phone, activationCode: code }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            return authApi;
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

    static logout = async (): Promise<Response<null>> => {
        let errorMessage: string = "";
        try {
            const authApi: Response<null> = await axiosPrivate.post(LOGOUT_URL,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            return authApi;
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
