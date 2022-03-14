import defaultAxios from 'axios';
const type ='customers';

const axios = defaultAxios.create({
    baseURL: 'http://localhost:3001/',
    headers: { 'Content-Type': 'application/json' }
});

/**
 * Get All  list
 * @returns 
 */

export const getList = async () => {

    try {
        const response = await axios.get(`api?type=${type}`);
        return response.data
    } catch (error) {
        // console.log(error)
        return []
    }

}

/**
 * Get  Details by Id
 * @param {*} id 
 * @returns 
 */

export const getDeatils = async (id) => {

    try {
        const response = await axios.get(`api/${id}?type=${type}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

/**
 * Add new Category
 */

export const getAdd = async (data) => {
    try {
        const  response= await axios.post(`api?type=${type}`, data);
        return response.data;

    } catch (error) {
        console.log(error)
    }
}

export const getUpdate = async (data,id) =>{
    try {
        const  response= await axios.put(`api/${id}?type=${type}`, data);
        return response.data;

    } catch (error) {
        console.log(error)
    }
}



export const DeleteFunction = async (id) =>{
    try {
      await axios.delete(`api/${id}?type=${type}`);
      return true;

    } catch (error) {
        console.log("error",error)           
    }
}