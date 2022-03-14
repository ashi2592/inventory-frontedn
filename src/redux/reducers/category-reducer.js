import { ADD_CATEGORY, GET_CATEGORY_DETAILS, GET_CATEGORY_LIST, SET_LOADING, UPDATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORY_LIST_SUCCESS, GET_CATEGORY_DETAILS_SUCCESS, ADD_CATEGORY_SUCCESS, UPDATE_CATEGORY_SUCCESS, DELETE_CATEGORY_SUCCESS } from '../actions/index';


const initialState = {
    loading: false,
    categories: [],
    category: {}
}



export default (state = initialState, { type, payload }) => {

    switch (type) {

        case SET_LOADING:
            return { ...state, loading: true }
        case GET_CATEGORY_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                categories:payload,
                category: {}
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
                    if (x.id === payload.id) {
                        return payload.data
                    }
                    return x
                }),
            }
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: state.categories.filter(x => x.id !== payload),
                category: {}
            }
        default:
            return state
    }
}