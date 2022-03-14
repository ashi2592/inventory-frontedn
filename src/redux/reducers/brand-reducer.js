import {  SET_LOADING, GET_BRAND_LIST_SUCCESS, GET_BRAND_DETAILS_SUCCESS, ADD_BRAND_SUCCESS, UPDATE_BRAND_SUCCESS, DELETE_BRAND_SUCCESS } from '../actions/index';


const initialState = {
    loading: false,
    brands: [],
    brand: {}
}



export default (state = initialState, { type, payload }) => {
    // console.log(payload)

    switch (type) {

        case SET_LOADING:
            return { ...state, loading: true }
        case GET_BRAND_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                brands:payload,
                brand: {}
            }
        case GET_BRAND_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                brand: payload
            }

        case ADD_BRAND_SUCCESS:
            return {
                ...state,
                loading: false,
                brands: [...state.brands, payload],
                brand: payload
            }
        case UPDATE_BRAND_SUCCESS:
            return {
                ...state,
                loading: false,
                brand: payload.data,
                brands: state.brands.map(x => {
                    if (x.id === payload.id) {
                        return payload.data
                    }
                    return x
                }),
            }
        case DELETE_BRAND_SUCCESS:
            return {
                ...state,
                loading: false,
                brands: state.brands.filter(x => x.id !== payload),
                brand: {}
            }
        default:
            return state
    }
}