import {  SET_LOADING, GET_TYPE_LIST_SUCCESS, GET_TYPE_DETAILS_SUCCESS, ADD_TYPE_SUCCESS, UPDATE_TYPE_SUCCESS, DELETE_TYPE_SUCCESS } from '../actions/index';


const initialState = {
    loading: false,
    types: [],
    type: {}
}



export default (state = initialState, { type, payload }) => {
    // console.log(payload)

    switch (type) {

        case SET_LOADING:
            return { ...state, loading: true }
        case GET_TYPE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                types:payload,
                type: {}
            }
        case GET_TYPE_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                type: payload
            }

        case ADD_TYPE_SUCCESS:
            return {
                ...state,
                loading: false,
                types: [...state.types, payload],
                type: payload
            }
        case UPDATE_TYPE_SUCCESS:
            return {
                ...state,
                loading: false,
                type: payload.data,
                types: state.types.map(x => {
                    if (x.id === payload.id) {
                        return payload.data
                    }
                    return x
                }),
            }
        case DELETE_TYPE_SUCCESS:
            return {
                ...state,
                loading: false,
                types: state.types.filter(x => x.id !== payload),
                type: {}
            }
        default:
            return state
    }
}