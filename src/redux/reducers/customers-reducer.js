import {  SET_LOADING, GET_CUSTOMER_LIST_SUCCESS, GET_CUSTOMER_DETAILS_SUCCESS, ADD_CUSTOMER_SUCCESS, UPDATE_CUSTOMER_SUCCESS, DELETE_CUSTOMER_SUCCESS } from '../actions/index';


const initialState = {
    loading: false,
    customers: [],
    customer: {}
}



export default (state = initialState, { type, payload }) => {
    // console.log(payload)

    switch (type) {

        case SET_LOADING:
            return { ...state, loading: true }
        case GET_CUSTOMER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                customers:payload,
                customer: {}
            }
        case GET_CUSTOMER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                customer: payload
            }

        case ADD_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                customers: [...state.customers, payload],
                customer: payload
            }
        case UPDATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                customer: payload.data,
                customers: state.customers.map(x => {
                    if (x.id === payload.id) {
                        return payload.data
                    }
                    return x
                }),
            }
        case DELETE_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                customers: state.customers.filter(x => x.id !== payload),
                customer: {}
            }
        default:
            return state
    }
}