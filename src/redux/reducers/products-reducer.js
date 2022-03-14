import {  SET_LOADING, GET_PRODUCT_LIST_SUCCESS, GET_PRODUCT_DETAILS_SUCCESS, ADD_PRODUCT_SUCCESS, UPDATE_PRODUCT_SUCCESS, DELETE_PRODUCT_SUCCESS } from '../actions/index';


const initialState = {
    loading: false,
    products: [],
    product: {}
}



export default (state = initialState, { type, payload }) => {
    // console.log(payload)

    switch (type) {

        case SET_LOADING:
            return { ...state, loading: true }
        case GET_PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                products:payload,
                product: {}
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
                    if (x.id === payload.id) {
                        return payload.data
                    }
                    return x
                }),
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: state.products.filter(x => x.id !== payload),
                product: {}
            }
        default:
            return state
    }
}