import { SET_LOADING, GET_SIZE_LIST_SUCCESS, GET_SIZE_DETAILS_SUCCESS, ADD_SIZE_SUCCESS, UPDATE_SIZE_SUCCESS, DELETE_SIZE_SUCCESS, SET_ERROR } from '../actions/index';


const initialState = {
    loading: false,
    sizes: [],
    size: {},
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
        case GET_SIZE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                sizes: payload.docs,
                size: {},
                pagination: {
                    totalPages: payload.totalPages,
                    currentPage: payload.page,
                    limit: payload.limit,
                    totalDocs: payload.totalDocs
                }
            }
        case GET_SIZE_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                size: payload
            }

        case ADD_SIZE_SUCCESS:
            return {
                ...state,
                loading: false,
                sizes: [...state.sizes, payload],
                size: payload
            }
        case UPDATE_SIZE_SUCCESS:
            return {
                ...state,
                loading: false,
                size: payload.data,
                sizes: state.sizes.map(x => {
                    if (x._id === payload.id) {
                        return payload.data
                    }
                    return x
                }),
            }
        case DELETE_SIZE_SUCCESS:
            return {
                ...state,
                loading: false,
                sizes: state.sizes.filter(x => x._id !== payload),
                size: {}
            }
        default:
            return state
    }
}