import { SET_LOADING, GET_PRODUCT_LIST_SUCCESS, GET_PRODUCT_DETAILS_SUCCESS, ADD_PRODUCT_SUCCESS, UPDATE_PRODUCT_SUCCESS, DELETE_PRODUCT_SUCCESS, SET_ERROR, SEARCH_PRODUCT_SUCCESS, GET_PRODUCT_AVAILIBLITY_SUCCESS, BARCODE_PRODUCT_SUCCESS } from '../actions/index';


const initialState = {
    loading: false,
    products: [],
    product: {},
    pagination: {
        totalPages: 0,
        currentPage: 1,
        limit: 10,
        totalDocs: 0
    },
    error: '',
    searchProduct: [],
    productAvailability:[],
    barcodeData: {}
}



export default (state = initialState, { type, payload }) => {
    // console.log(payload)

    switch (type) {

        case SET_LOADING:
            return { ...state, loading: true }
        case SET_ERROR:
            return { ...state, loading: false, error: payload.message }
        case GET_PRODUCT_AVAILIBLITY_SUCCESS:
            return {
                ...state,
                loading: false,
                productAvailability: payload,
                error: "",
                barcodeData:{}
            }
        case GET_PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                products: payload.docs,
                product: {},
                pagination: {
                    totalPages: payload.totalPages,
                    currentPage: payload.page,
                    limit: payload.limit,
                    totalDocs: payload.totalDocs
                },
                barcodeData:{}
            }
        case SEARCH_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                searchProduct: payload,
                barcodeData:{}
            }
        case GET_PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                product: payload,
                barcodeData:{}
            }

        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: [...state.products, payload],
                product: payload,
                barcodeData:{}
            }
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                product: payload,
                barcodeData:{},
                products: state.products.map(x => {
                    if (x._id === payload._id) {
                        return payload
                    }
                    return x
                    
                }),
            }


        case BARCODE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                barcodeData: payload
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: state.products.filter(x => x._id !== payload),
                product: {},
                barcodeData:{}
            }
        default:
            return state
    }
}