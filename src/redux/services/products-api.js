import defaultAxios from 'axios';
import { backendUrl } from '../../constant/global';
const type = 'product';

const axios = defaultAxios.create({
    baseURL: backendUrl,
    headers: {
        'Content-Type': 'application/json',
        storeId: localStorage.getItem('storeId') ? localStorage.getItem('storeId') : null,
        customer: "54887755",
        contract: "inventFashion"
    }
});

/**
 * Get All  list
 * @returns 
 */

export const getList = async (pageno = 1, count = 10, searchText = '', searchInputs = {}) => {

    try {
        let query = `page=${pageno}&count=${count}&searchText=${searchText}`;

        Object.keys(searchInputs).map((key) => {
            query = query + `&${key}=${searchInputs[key]}`
        })

        const response = await axios.get(`${type}?${query}`);
        return response.data
    } catch (error) {
        throw error;
    }

}



export const searchList = async (searchText = '') => {
    try {
        const response = await axios.get(`${type}/search/?searchText=${searchText}`);
        return response.data;
    } catch (error) {
        throw error;
    }

}



export const barcodelist = async (id = '') => {
    try {
        const response = await axios.get(`${type}/barcode/${id}`);
        return response.data;
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
        const response = await axios.get(`${type}/${id}`);
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
        const response = await axios.post(`${type}`, data);
        return response.data;

    } catch (error) {
        throw error;
    }
}

export const getUpdate = async (data, id) => {
    try {
        const response = await axios.put(`${type}/${id}`, data);
        return response.data;

    } catch (error) {
        throw error;
    }
}



export const DeleteFunction = async (id) => {
    try {
        await axios.delete(`${type}/${id}`);
        return true;

    } catch (error) {
        console.log("error", error)
    }
}


export const getProductAvailiblity = async (id) => {
    try {
        const response = await axios.get(`${type}/availiablity?ids=${id}`);
        return response.data;

    } catch (error) {
        console.log("error", error)
    }
}
