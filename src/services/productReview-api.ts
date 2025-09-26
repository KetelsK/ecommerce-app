import { User } from "./auth-api";
import { api } from "./base-api";

export interface ProductReview {
    id?: number;
    review: string;
    rating: number;
    userId: number;
    user?: User;
    productId: number;
}

export const getProductReviews = async (productReviewId: number) => {
    try {
        console.log("oui")
        const response = await api.get(`/productreview/${productReviewId}`);
        return response.data;
    } catch (error: unknown) {
        console.error('Error during login', error);
        throw error;
    }
};

export const createProductReview = async (productReview: ProductReview) => {
    try {
        const response = await api.post('/productreview', productReview);
        return response.data;
    } catch (error: unknown) {
        console.error('Error during login', error);
        throw error;
    }
};