import { SET_LOADING, GET_PURCHASE_LIST_SUCCESS, GET_PURCHASE_DETAILS_SUCCESS, ADD_PURCHASE_SUCCESS, UPDATE_PURCHASE_SUCCESS, DELETE_PURCHASE_SUCCESS, SET_ERROR } from '../actions/index';
const initialState = {
    loading: false,
    purchases: [],
    purchase: {},
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
        case GET_PURCHASE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                purchases: payload.docs,
                purchase: {},
                pagination: {
                    totalPages: payload.totalPages,
                    currentPage: payload.page,
                    limit: payload.limit,
                    totalDocs: payload.totalDocs
                }
            }
        case GET_PURCHASE_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                purchase: payload
            }

        case ADD_PURCHASE_SUCCESS:
            return {
                ...state,
                loading: false,
                purchases: [...state.purchases, payload],
                purchase: payload
            }
        case UPDATE_PURCHASE_SUCCESS:
            return {
                ...state,
                loading: false,
                purchase: payload.data,
                purchases: state.purchases.map(x => {
                    if (x._id === payload.id) {
                        return payload.data
                    }
                    return x
                }),
            }
        case DELETE_PURCHASE_SUCCESS:
            return {
                ...state,
                loading: false,
                purchases: state.purchases.filter(x => x._id !== payload),
                purchase: {}
            }
        default:
            return state
    }
}