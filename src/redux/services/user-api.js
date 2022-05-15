import DispatchRequest from "./service-dispatch";

const type = 'user';



/**
 * Get All  list
 * @returns 
 */

export const login = async (username, password) => {
    try {
        const response = await DispatchRequest.post(`${type}/login`, { username, password });
        return response.data
    } catch (error) {
        throw error;
    }

}