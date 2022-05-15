import defaultAxios from 'axios';
import { backendUrl } from '../../constant/global';
const DispatchRequest =defaultAxios.create({
    baseURL: backendUrl,
    headers: {
        'Content-Type': 'application/json',
        storeId: localStorage.getItem('storeId') ? localStorage.getItem('storeId') : null,
        customer: "54887755",
        contract: "inventFashion",
        token:localStorage.getItem('token')
    }
});


export default DispatchRequest;