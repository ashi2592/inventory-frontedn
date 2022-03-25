import { SET_LOADING, GET_TRANSCATION_LIST_SUCCESS, GET_TRANSCATION_DETAILS_SUCCESS, ADD_TRANSCATION_SUCCESS, UPDATE_TRANSCATION_SUCCESS, DELETE_TRANSCATION_SUCCESS, SET_ERROR } from '../actions/index';


const initialState = {
    loading: false,
    transactions: [],
    transcation: {},
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
        case GET_TRANSCATION_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                transactions: payload.docs,
                transcation: {},
                pagination: {
                    totalPages: payload.totalPages,
                    currentPage: payload.page,
                    limit: payload.limit,
                    totalDocs: payload.totalDocs
                }
            }
        case GET_TRANSCATION_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                transcation: payload
            }

        case ADD_TRANSCATION_SUCCESS:
            return {
                ...state,
                loading: false,
                transactions: [...state.transactions, payload],
                transcation: payload
            }
        case UPDATE_TRANSCATION_SUCCESS:
            return {
                ...state,
                loading: false,
                transcation: payload.data,
                transactions: state.transactions.map(x => {
                    if (x._id === payload.id) {
                        return payload.data
                    }
                    return x
                }),
            }
        case DELETE_TRANSCATION_SUCCESS:
            return {
                ...state,
                loading: false,
                transactions: state.transactions.filter(x => x._id !== payload),
                transcation: {}
            }
        default:
            return state
    }
}