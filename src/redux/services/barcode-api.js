import DispatchRequest from "./service-dispatch";

const type = 'barcode';

/**
 * Get All  list
 * @returns 
 */

export const getList = async (pageno = 1, count = 10, purchaseId = '',variantId='',productId='') => {

    try {
        const response = await DispatchRequest.get(`${type}?page=${pageno}&count=${count}&purchaseId=${purchaseId}&variantId=${variantId}&productId=${productId}`);
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



export const DeleteFunction = async (barcode) => {
    try {
        await DispatchRequest.delete(`${type}/${barcode}`);
        return true;

    } catch (error) {
        console.log("error", error)
    }
}