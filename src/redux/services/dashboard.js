
import DispatchRequest from "./service-dispatch";
const type = 'dashboard';
/**
 * Get All  list
 * @returns 
 */

export const getTopSelling = async () => {
    try {
        const response = await DispatchRequest.get(`/${type}/top-selling-product`);
        return response.data
    } catch (error) {
        throw error;
    }

}


export const getDaywiseSell = async () => {
    try {
        const response = await DispatchRequest.get(`/${type}/day-wise-sale`);
        return response.data
    } catch (error) {
        throw error;
    }

}



export const getMonthwiseSell = async () => {
    try {
        const response = await DispatchRequest.get(`/${type}/month-wise-sale`);
        return response.data
    } catch (error) {
        throw error;
    }

}



export const getCategoryWiseProductCount = async () => {
    try {
        const response = await DispatchRequest.get(`/${type}/product-count`);
        return response.data
    } catch (error) {
        throw error;
    }

}



export const getDashboardStats = async () => {
    try {
        const response = await DispatchRequest.get(`/${type}/stats`);
        return response.data
    } catch (error) {
        throw error;
    }

}
