import defaultAxios from 'axios';
import { backendUrl } from '../../constant/global';
const type = 'dashboard';
const axios = defaultAxios.create({
    baseURL: backendUrl,
    headers: { 'Content-Type': 'application/json', storeId: localStorage.getItem('storeId')?localStorage.getItem('storeId'):null}
});

/**
 * Get All  list
 * @returns 
 */

export const getTopSelling = async () => {
    try {
        const response = await axios.get(`/${type}/top-selling-product`);
        return response.data
    } catch (error) {
        throw error;
    }

}


export const getDaywiseSell = async () => {
    try {
        const response = await axios.get(`/${type}/day-wise-sale`);
        return response.data
    } catch (error) {
        throw error;
    }

}



export const getCategoryWiseProductCount = async () => {
    try {
        const response = await axios.get(`/${type}/product-count`);
        return response.data
    } catch (error) {
        throw error;
    }

}



export const getDashboardStats = async () => {
    try {
        const response = await axios.get(`/${type}/stats`);
        return response.data
    } catch (error) {
        throw error;
    }

}
