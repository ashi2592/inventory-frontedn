import { SET_LOADING, GET_PATTERN_LIST_SUCCESS, GET_PATTERN_DETAILS_SUCCESS, ADD_PATTERN_SUCCESS, UPDATE_PATTERN_SUCCESS, DELETE_PATTERN_SUCCESS, SET_ERROR } from '../actions/index';


const initialState = {
    loading: false,
    patterns: [],
    pattern: {},
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
        case GET_PATTERN_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                patterns: payload.docs,
                pattern: {},
                pagination: {
                    totalPages: payload.totalPages,
                    currentPage: payload.page,
                    limit: payload.limit,
                    totalDocs: payload.totalDocs
                }
            }
        case GET_PATTERN_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                pattern: payload
            }

        case ADD_PATTERN_SUCCESS:
            return {
                ...state,
                loading: false,
                patterns: [...state.patterns, payload],
                pattern: payload
            }
        case UPDATE_PATTERN_SUCCESS:
            return {
                ...state,
                loading: false,
                pattern: payload.data,
                patterns: state.patterns.map(x => {
                    if (x._id === payload.id) {
                        return payload.data
                    }
                    return x
                }),
            }
        case DELETE_PATTERN_SUCCESS:
            return {
                ...state,
                loading: false,
                patterns: state.patterns.filter(x => x._id !== payload),
                pattern: {}
            }
        default:
            return state
    }
}