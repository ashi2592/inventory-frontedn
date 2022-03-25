import { SET_LOADING, GET_PRODUCT_LIST_SUCCESS, GET_PRODUCT_DETAILS_SUCCESS, ADD_PRODUCT_SUCCESS, UPDATE_PRODUCT_SUCCESS, DELETE_PRODUCT_SUCCESS, SET_ERROR } from '../actions/index';


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
    error: ''
}



export default (state = initialState, { type, payload }) => {
    // console.log(payload)

    switch (type) {

        case SET_LOADING:
            return { ...state, loading: true }
        case SET_ERROR:
            return { ...state, loading: false, error: payload.message }
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
                }
            }
        case GET_PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                product: payload
            }

        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: [...state.products, payload],
                product: payload
            }
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                product: payload.data,
                products: state.products.map(x => {
                    if (x._id === payload.id) {
                        return payload.data
                    }
                    return x
                }),
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: state.products.filter(x => x._id !== payload),
                product: {}
            }
        default:
            return state
    }
}