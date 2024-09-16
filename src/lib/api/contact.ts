import { AxiosResponse, isAxiosError } from 'axios';
import { axiosInstance } from './axios';

const CONTACT = '/api/contact/';

export async function sendContactMessage({ email, message }: { email: string; message: string }): Promise<void> {
  try {
    const { data: response }: AxiosResponse = await axiosInstance.post(
      CONTACT,
      JSON.stringify({ email: email, message: message }),
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      },
    );
    return response;
  } catch (error) {
    let errorMessage = 'Algo salio mal, vuelve a intentarlo!';

    if (isAxiosError(error)) {
      if (error.response?.data.statusCode === 400) {
        errorMessage = 'El email o la contraseña son incorrectos';
      } else {
        errorMessage = error.response?.data.message;
      }
    }

    throw new Error(errorMessage);
  }
}
