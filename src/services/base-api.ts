import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3000', // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});