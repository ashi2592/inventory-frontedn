import { SET_LOADING, GET_SUPPLIER_LIST_SUCCESS, GET_SUPPLIER_DETAILS_SUCCESS, ADD_SUPPLIER_SUCCESS, UPDATE_SUPPLIER_SUCCESS, DELETE_SUPPLIER_SUCCESS, SET_ERROR } from '../actions/index';


const initialState = {
    loading: false,
    suppliers: [],
    supplier: {},
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
        case GET_SUPPLIER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                suppliers: payload.docs,
                supplier: {},
                pagination: {
                    totalPages: payload.totalPages,
                    currentPage: payload.page,
                    limit: payload.limit,
                    totalDocs: payload.totalDocs
                }
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
                    if (x._id === payload.id) {
                        return payload.data
                    }
                    return x
                }),
            }
        case DELETE_SUPPLIER_SUCCESS:
            return {
                ...state,
                loading: false,
                suppliers: state.suppliers.filter(x => x._id !== payload),
                supplier: {}
            }
        default:
            return state
    }
}