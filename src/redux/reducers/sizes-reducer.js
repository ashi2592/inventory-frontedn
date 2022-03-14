import {  SET_LOADING, GET_SIZE_LIST_SUCCESS, GET_SIZE_DETAILS_SUCCESS, ADD_SIZE_SUCCESS, UPDATE_SIZE_SUCCESS, DELETE_SIZE_SUCCESS } from '../actions/index';


const initialState = {
    loading: false,
    sizes: [],
    size: {}
}



export default (state = initialState, { type, payload }) => {
    // console.log(payload)

    switch (type) {

        case SET_LOADING:
            return { ...state, loading: true }
        case GET_SIZE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                sizes:payload,
                size: {}
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
                    if (x.id === payload.id) {
                        return payload.data
                    }
                    return x
                }),
            }
        case DELETE_SIZE_SUCCESS:
            return {
                ...state,
                loading: false,
                sizes: state.sizes.filter(x => x.id !== payload),
                size: {}
            }
        default:
            return state
    }
}