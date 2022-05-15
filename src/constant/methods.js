
const calculateSellingPrice = (amount = 100, taxAmount = 5, profit = 30) => {
    let taxvalue = (taxAmount * amount) / 100;
    let purchasecost = (amount + taxvalue) ;
    let sellingPrice = (purchasecost + (profit * purchasecost) / 100);
    return { sellingPrice, purchasecost,taxvalue, profit};

}


export { calculateSellingPrice }