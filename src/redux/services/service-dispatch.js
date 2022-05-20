import defaultAxios from 'axios';
import { backendUrl } from '../../constant/global';
const DispatchRequest =defaultAxios.create({
    baseURL: backendUrl,
    headers: {
        'Content-Type': 'application/json',
        storeId:  window.localStorage.getItem('storeId') ?  window.localStorage.getItem('storeId') : null,
        customer: "54887755",
        contract: "inventFashion",
        token: window.localStorage.getItem('token')
    }
});


export default DispatchRequest;