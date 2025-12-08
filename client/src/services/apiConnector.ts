import axios, { type AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({ 
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});

export const apiConnector = (
    method: "get" | "post" | "put" | "delete" | "patch", 
    url: string, 
    body?: any, 
    params?: any,
) => {
    return axiosInstance({
        method,
        url,
        data: body,
        params: params || undefined,
    });
};
