import { api } from "./base-api";
import { Product } from "./product-api";
import axios from "axios";

export interface Cart {
    id?: number
    productId: number;
    product?: Product;
    items?: CartItem[];
    userId: number;
    count?: number
}

interface CartItem {
    id?: number;
    cartId?: number;
    product: Product;
    productId: number;
    quantity: number;
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

export const deleteCartItem = async (id: number) => {
    try {
        const response = await api.delete(`/cart/item/${id}`);
        return response.data;
    } catch (error: unknown) {
        console.error('Error fetching cart:', error);
        throw error;
    }
}