import * as yup from 'yup';

let AddPurchaseProductSchema = yup.object().shape({
    productId: yup.string().required(),
    variantId: yup.string().required(),
    qty: yup.number().required(),
    purchasePrice: yup.number().required(),
    tax: yup.number().required(),
    taxAmount: yup.number().required(),
    totalAmount: yup.number().required(),
    mrp: yup.number().required(),
    sellPrice: yup.number().required(),
});



let purchaseProductSchema = yup.object().shape({
    supplier: yup.string().required(),
    totalAmount:yup.number().required(),
    totalQty: yup.number().required(),
    taxAmount: yup.number().required(),
    delivery: yup.number().optional().default(0),
    products: yup.array().of(AddPurchaseProductSchema)

})


let variantSchema = yup.object().shape({
    productColor: yup.string().required(),
    productType: yup.string().required(),
    productLength: yup.string().required(),
    productSize: yup.string().required(),
    productPattern: yup.string().required(),
    articleNo: yup.string().required(),
});

let validtionOptions = {
    strict: false,
    abortEarly: true,
    stripUnknown: false,
    recursive: true
}


export { AddPurchaseProductSchema, validtionOptions,variantSchema,purchaseProductSchema }