import { api } from "./base-api";

export interface User {
    id?: number;
    email: string;
    password?: string
}

type LoginResponse = {
    access_token: string;
}


export const authLogin = async (login: User) => {
    try {
        const response = await api.post<LoginResponse>('/auth/login', login);
        return response;
    } catch (error: unknown) {
        console.error('Error during login', error);
        throw error;
    }
};

export const authRegister = async (login: User) => {
    try {
        const response = await api.post<LoginResponse>('/auth/register', login);
        return response;
    } catch (error: unknown) {
        console.error('Error during login', error);
        throw error;
    }
};

export const authLogout = async () => {
    try {
        const response = await api.post('/auth/logout');
        return response;
    } catch (error: unknown) {
        console.error('Error during login', error);
        throw error;
    }
};