import { SET_LOADING, GET_CUSTOMER_LIST_SUCCESS, GET_CUSTOMER_DETAILS_SUCCESS, ADD_CUSTOMER_SUCCESS, UPDATE_CUSTOMER_SUCCESS, DELETE_CUSTOMER_SUCCESS, SET_ERROR, GET_CUSTOMER_STATS_SUCCESS } from '../actions/index';


const initialState = {
    loading: false,
    customers: [],
    customer: {},
    stats: {},
    pagination: {
        totalPages: 0,
        currentPage: 1,
        limit: 10,
        totalDocs: 0
    },
    error: ""
}



export default (state = initialState, { type, payload }) => {
    // console.log(payload)

    switch (type) {

        case SET_LOADING:
            return { ...state, loading: true }
        case SET_ERROR:
            return { ...state, loading: false, error: payload.message }
        case GET_CUSTOMER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                customers: payload.docs,
                customer: {},
                pagination: {
                    totalPages: payload.totalPages,
                    currentPage: payload.page,
                    limit: payload.limit,
                    totalDocs: payload.totalDocs
                }
            }
        case GET_CUSTOMER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                customer: payload
            }

        case GET_CUSTOMER_STATS_SUCCESS:
            return {
                ...state,
                loading: false,
                stats: payload
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
                    if (x._id === payload.id) {
                        return payload.data
                    }
                    return x
                }),
            }
        case DELETE_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                customers: state.customers.filter(x => x._id !== payload),
                customer: {}
            }
        default:
            return state
    }
}