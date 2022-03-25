import { SET_LOADING, GET_COLOR_LIST_SUCCESS, GET_COLOR_DETAILS_SUCCESS, ADD_COLOR_SUCCESS, UPDATE_COLOR_SUCCESS, DELETE_COLOR_SUCCESS, SET_ERROR } from '../actions/index';


const initialState = {
    loading: false,
    colors: [],
    color: {},
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
        case GET_COLOR_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                colors: payload.docs,
                color: {},
                pagination: {
                    totalPages: payload.totalPages,
                    currentPage: payload.page,
                    limit: payload.limit,
                    totalDocs: payload.totalDocs
                }
            }
        case GET_COLOR_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                color: payload
            }

        case ADD_COLOR_SUCCESS:
            return {
                ...state,
                loading: false,
                colors: [...state.colors, payload],
                color: payload
            }
        case UPDATE_COLOR_SUCCESS:
            return {
                ...state,
                loading: false,
                color: payload.data,
                colors: state.colors.map(x => {
                    if (x._id === payload.id) {
                        return payload.data
                    }
                    return x
                }),
            }
        case DELETE_COLOR_SUCCESS:
            return {
                ...state,
                loading: false,
                colors: state.colors.filter(x => x._id !== payload),
                color: {}
            }
        default:
            return state
    }
}