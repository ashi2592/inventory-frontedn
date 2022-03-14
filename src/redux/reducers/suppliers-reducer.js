import {  SET_LOADING, GET_SUPPLIER_LIST_SUCCESS, GET_SUPPLIER_DETAILS_SUCCESS, ADD_SUPPLIER_SUCCESS, UPDATE_SUPPLIER_SUCCESS, DELETE_SUPPLIER_SUCCESS } from '../actions/index';


const initialState = {
    loading: false,
    suppliers: [],
    supplier: {}
}



export default (state = initialState, { type, payload }) => {
    // console.log(payload)

    switch (type) {

        case SET_LOADING:
            return { ...state, loading: true }
        case GET_SUPPLIER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                suppliers:payload,
                supplier: {}
            }
        case GET_SUPPLIER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                supplier: payload
            }

        case ADD_SUPPLIER_SUCCESS:
            return {
                ...state,
                loading: false,
                suppliers: [...state.suppliers, payload],
                supplier: payload
            }
        case UPDATE_SUPPLIER_SUCCESS:
            return {
                ...state,
                loading: false,
                supplier: payload.data,
                suppliers: state.suppliers.map(x => {
                    if (x.id === payload.id) {
                        return payload.data
                    }
                    return x
                }),
            }
        case DELETE_SUPPLIER_SUCCESS:
            return {
                ...state,
                loading: false,
                suppliers: state.suppliers.filter(x => x.id !== payload),
                supplier: {}
            }
        default:
            return state
    }
}