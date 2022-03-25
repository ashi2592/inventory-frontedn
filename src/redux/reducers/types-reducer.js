import {  SET_LOADING, GET_TYPE_LIST_SUCCESS, GET_TYPE_DETAILS_SUCCESS, ADD_TYPE_SUCCESS, UPDATE_TYPE_SUCCESS, DELETE_TYPE_SUCCESS, SET_ERROR } from '../actions/index';


const initialState = {
    loading: false,
    types: [],
    type: {},
    pagination:{
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
        case GET_TYPE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                types:payload.docs,
                type: {},
                pagination: {
                    totalPages: payload.totalPages,
                    currentPage: payload.page,
                    limit: payload.limit,
                    totalDocs: payload.totalDocs
                }
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
                    if (x._id === payload.id) {
                        return payload.data
                    }
                    return x
                }),
            }
        case DELETE_TYPE_SUCCESS:
            return {
                ...state,
                loading: false,
                types: state.types.filter(x => x._id !== payload),
                type: {}
            }
        default:
            return state
    }
}