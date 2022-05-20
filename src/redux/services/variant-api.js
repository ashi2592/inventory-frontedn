
import DispatchRequest from "./service-dispatch";
const type = 'variants';
/**
 * Get All  list
 * @returns 
 */

export const getList = async (productId,pageno = 1, count = 10, searchText = '') => {

    try {
        const response = await DispatchRequest.get(`${type}/${productId}?page=${pageno}&count=${count}&searchText=${searchText}`);
        return response.data
    } catch (error) {
        throw error;
    }

}

/**
 * Get  Details by Id
 * @param {*} id 
 * @returns 
 */

export const getDeatils = async (id) => {

    try {
        const response = await DispatchRequest.get(`${type}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

/**
 * Add new Category
 */

export const getAdd = async (data) => {
    try {
        const response = await DispatchRequest.post(`${type}`, data);
        return response.data;

    } catch (error) {
        throw error;
    }
}

export const getUpdate = async (data, id) => {
    try {
        const response = await DispatchRequest.put(`${type}/${id}`, data);
        return response.data;

    } catch (error) {
        throw error;
    }
}



export const DeleteFunction = async (id) => {
    try {
        await DispatchRequest.delete(`${type}/${id}`);
        return true;

    } catch (error) {
        console.log("error", error)
    }
}


export const getPurchaseTransaction = async (id,pageno,count) => {

    try {
        const response = await DispatchRequest.get(`${type}/purchase/${id}?page=${pageno}&count=${count}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
