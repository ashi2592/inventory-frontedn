
import DispatchRequest from "./service-dispatch";
const type = 'customer';
/**
 * Get All  list
 * @returns 
 */

export const getList = async (pageno = 1, count = 10, searchText = '') => {

    try {
        const response = await DispatchRequest.get(`${type}?page=${pageno}&count=${count}&searchText=${searchText}`);
        return response.data
    } catch (error) {
        throw error;
    }

}



/**
 * Get All  list
 * @returns 
 */

 export const getStats = async (id) => {

    try {
        const response = await DispatchRequest.get(`${type}/stats/${id}`);
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