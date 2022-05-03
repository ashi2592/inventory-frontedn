// LOGIN STATUS
export const isLogin = () => {
    if (localStorage.getItem('storeId')) return true;
    return false;
}