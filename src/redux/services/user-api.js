import defaultAxios from 'axios';
import { backendUrl } from '../../constant/global';
const type ='user';

const axios = defaultAxios.create({
    baseURL:backendUrl,
    headers: { 'Content-Type': 'application/json',storeId: localStorage.getItem('storeId')?localStorage.getItem('storeId'):null }
});

/**
 * Get All  list
 * @returns 
 */

export const login = async (username,password) => {
    try {
        const response = await axios.post(`${type}/login`,{username,password});
        return response.data
    } catch (error) {
        throw error;
    }

}