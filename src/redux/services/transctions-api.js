import DispatchRequest from "./service-dispatch";
const type = 'transcation';




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

 export const getListforCustomer = async (pageno = 1, count = 10, searchText = '',customer='') => {

    try {
        const response = await DispatchRequest.get(`${type}?page=${pageno}&count=${count}&searchText=${searchText}&customer=${customer}`);
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

        console.log("Transaction", data)
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



export const updateStatus = async (id,data) => {
    try {
        const response = await DispatchRequest.put(`${type}/status/${id}`, data);
        return response.data;

    } catch (error) {
        console.log("error", error)
    }
}

