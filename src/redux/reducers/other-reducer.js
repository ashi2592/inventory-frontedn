import { SET_LOADING, GET_OTHER_LIST_SUCCESS, GET_OTHER_DETAILS_SUCCESS, ADD_OTHER_SUCCESS, UPDATE_OTHER_SUCCESS, DELETE_OTHER_SUCCESS, SET_ERROR } from '../actions/index';


const initialState = {
    loading: false,
    others: [],
    other: {},
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
        case GET_OTHER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                others: payload.docs,
                other: {},
                pagination: {
                    totalPages: payload.totalPages,
                    currentPage: payload.page,
                    limit: payload.limit,
                    totalDocs: payload.totalDocs
                }
            }
        case GET_OTHER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                other: payload
            }

        case ADD_OTHER_SUCCESS:
            return {
                ...state,
                loading: false,
                others: [...state.others, payload],
                other: payload
            }
        case UPDATE_OTHER_SUCCESS:
            return {
                ...state,
                loading: false,
                other: payload.data,
                others: state.others.map(x => {
                    if (x._id === payload.id) {
                        return payload.data
                    }
                    return x
                }),
            }
        case DELETE_OTHER_SUCCESS:
            return {
                ...state,
                loading: false,
                others: state.others.filter(x => x._id !== payload),
                other: {}
            }
        default:
            return state
    }
}