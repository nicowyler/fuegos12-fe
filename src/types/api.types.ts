export interface ApiResponse<T> {
    data: {
        statusCode: number;
        message: string;
        data: T;
    };
}

export type ErrorMessage = string;