// LOGIN STATUS
export const isLogin = () => {
    let token =  window.localStorage.getItem('token');
    if (window.localStorage.getItem('storeId') &&  token && token != null ) return true;
    return false;
}