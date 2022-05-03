const backendUrl = 'http://localhost:3001';
// const backendUrl = 'http://54.157.108.209:3001';

const themeDefault = 'dark'
const namesOfModes = ['dark', 'moonlight', 'eclipse', 'light'];
// const storeId = 'thefashionhub'
const dateFormat = (date) =>{
    var d = new Date(date);

    var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
    d.getHours() + ":" + d.getMinutes();
    return datestring
}


const getProductName = (product) =>{
//    console.log(product)
   return (product.productBrandObj ? product.productBrandObj.brandName+'-' : '')+
    (product.productCategoryObj ? product.productCategoryObj.categoryName+'-' : '')+
    (product.productTypeObj ? product.productTypeObj.typeName+'-' : '')+
    (product.productColorObj ? product.productColorObj.colorName+'-' : '')+
    (product.productSizeObj ? product.productSizeObj.sizeName : '')
}

export { backendUrl, themeDefault, namesOfModes,dateFormat,getProductName}