import { ADD_CATEGORY, GET_CATEGORY_DETAILS, GET_CATEGORY_LIST, SET_LOADING, UPDATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORY_LIST_SUCCESS, GET_CATEGORY_DETAILS_SUCCESS, ADD_CATEGORY_SUCCESS, UPDATE_CATEGORY_SUCCESS, DELETE_CATEGORY_SUCCESS, SET_ERROR } from '../actions/index';


const initialState = {
    loading: false,
    categories: [],
    category: {},
    pagination:{
        totalPages: 0,
        currentPage: 1,
        limit: 10,
        totalDocs: 0
    },
    error:''
    
}



export default (state = initialState, { type, payload }) => {

    switch (type) {

        case SET_LOADING:
            return { ...state, loading: true }
            case SET_ERROR:
                return { ...state, loading: false, error: payload.message }
        case GET_CATEGORY_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                categories:payload.docs,
                category: {},
                pagination: {
                    totalPages: payload.totalPages,
                    currentPage: payload.page,
                    limit: payload.limit,
                    totalDocs: payload.totalDocs
                }
            }
        case GET_CATEGORY_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                category: payload
            }

        case ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: [...state.categories, payload],
                category: payload
            }
        case UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                category: payload.data,
                categories: state.categories.map(x => {
                    if (x._id === payload.id) {
                        return payload.data
                    }
                    return x
                }),
            }
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: state.categories.filter(x => x._id !== payload),
                category: {}
            }
        default:
            return state
    }
}