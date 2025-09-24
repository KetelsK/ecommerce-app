import { api } from "./base-api";

export interface Product {
    id?: number | undefined;
    name: string;
    price: number | '';
}

export const getProducts = async () => {
    try {
        const response = await api.get('/product');
        return response.data;
    } catch (error: unknown) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
export const getProductById = async (id: number) => {
    try {
        const response = await api.get(`/product/${id}`);
        return response.data;
    } catch (error: unknown) {
        console.error(`Error fetching product with id ${id}:`, error);
        throw error;
    }
};
export const createProduct = async (product: Product) => {
    try {
        const response = await api.post('/product', product);
        return response.data;
    } catch (error: unknown) {
        console.error('Error creating product:', error);
        throw error;
    }
};
export const updateProduct = async (id: number, product: Product) => {
    try {
        const response = await api.put(`/product/${id}`, product);
        return response.data;
    } catch (error: unknown) {
        console.error(`Error updating product with id ${id}:`, error);
        throw error;
    }
};
export const deleteProduct = async (id: number) => {
    try {
        const response = await api.delete(`/product/${id}`);
        return response.data;
    } catch (error: unknown) {
        console.error(`Error deleting product with id ${id}:`, error);
        throw error;
    }
};
export default api;
