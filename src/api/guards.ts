import { ApiResponse, ErrorMessage } from "@/types";

export function isApiResponse<T>(response: any): response is ApiResponse<T> {
    return response && response.hasOwnProperty('data') && typeof response !== 'string';
}

export function isErrorMessage(response: any): response is ErrorMessage {
    return typeof response === 'string';
}