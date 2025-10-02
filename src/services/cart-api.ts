import { api } from "./base-api";
import { Product } from "./product-api";

export interface Cart {
    id?: number
    productId: number;
    product?: Product;
    userId: number;
    count?: number
}

export const getCart = async (userId: number) => {
    try {
        const response = await api.get(`/cart/${userId}`);
        return response.data;
    } catch (error: unknown) {
        console.error('Error fetching cart:', error);
        throw error;
    }
}

export const addToCart = async (cart: Cart) => {
    try {
        const response = await api.post('/cart', cart);
        return response.data;
    } catch (error: unknown) {
        console.error('Error fetching cart:', error);
        throw error;
    }
}

export const deleteCart = async (id:number) => {
    try {
        const response = await api.delete(`/cart/${id}`);
        return response.data;
    } catch (error: unknown) {
        console.error('Error fetching cart:', error);
        throw error;
    }
}