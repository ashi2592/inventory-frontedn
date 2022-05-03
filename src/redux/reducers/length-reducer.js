import { SET_LOADING, GET_LENGTH_LIST_SUCCESS, GET_LENGTH_DETAILS_SUCCESS, ADD_LENGTH_SUCCESS, UPDATE_LENGTH_SUCCESS, DELETE_LENGTH_SUCCESS, SET_ERROR,  UPDATE_LENGTH_STATUS_SUCCESS, GET_LENGTH_CUSTOMER_LIST_SUCCESS } from '../actions/index';


const initialState = {
    loading: false,
    productLengths: [],
    productLength: {},
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
        case GET_LENGTH_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                productLengths: payload.docs,
                productLength: {},
                pagination: {
                    totalPages: payload.totalPages,
                    currentPage: payload.page,
                    limit: payload.limit,
                    totalDocs: payload.totalDocs
                },
                error: ""
            }
      
        case GET_LENGTH_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                productLength: payload,
                error: "",
            }

        case ADD_LENGTH_SUCCESS:
            return {
                ...state,
                loading: false,
                productLengths: [...state.productLengths, payload],
                productLength: payload,
                error: "",
            }
        case UPDATE_LENGTH_SUCCESS:
            return {
                ...state,
                loading: false,
                productLength: payload.data,
                error: "",
                productLengths: state.productLengths.map(x => {
                    if (x._id === payload.id) {
                        return payload.data
                    }
                    return x
                }),
            }
        case DELETE_LENGTH_SUCCESS:
            return {
                ...state,
                loading: false,
                productLengths: state.productLengths.filter(x => x._id !== payload),
                length: {},
                error: "",
            }
        default:
            return state
    }
}