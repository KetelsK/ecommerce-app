import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getProducts = async () => {
    try {
        const response = await api.get('/product');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
export const getProductById = async (id: string) => {
    try {
        const response = await api.get(`/product/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        throw error;
    }
};
export const createProduct = async (product: any) => {
    try {
        const response = await api.post('/product', product);
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};
export const updateProduct = async (id: string, product: any) => {
    try {
        const response = await api.put(`/product/${id}`, product);
        return response.data;
    } catch (error) {
        console.error(`Error updating product with id ${id}:`, error);
        throw error;
    }
};
export const deleteProduct = async (id: string) => {
    try {
        const response = await api.delete(`/product/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting product with id ${id}:`, error);
        throw error;
    }
};
export default api;
