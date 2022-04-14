import { SET_LOADING, GET_TRANSCATION_LIST_SUCCESS, GET_TRANSCATION_DETAILS_SUCCESS, ADD_TRANSCATION_SUCCESS, UPDATE_TRANSCATION_SUCCESS, DELETE_TRANSCATION_SUCCESS, SET_ERROR, GET_PRODUCT_AVAILIBLITY_SUCCESS, UPDATE_TRANSCATION_STATUS_SUCCESS } from '../actions/index';


const initialState = {
    loading: false,
    transcations: [],
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
                transcations: payload.docs,
                transcation: {},
                pagination: {
                    totalPages: payload.totalPages,
                    currentPage: payload.page,
                    limit: payload.limit,
                    totalDocs: payload.totalDocs
                },
                error: ""
            }
        case GET_TRANSCATION_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                transcation: payload,
                error: "",
            }
       

        case UPDATE_TRANSCATION_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                transcation: payload.data,
                error: "",
                transcations: state.transcations.map(x => {
                    if (x._id === payload.id) {
                        return payload.data
                    }
                    return x
                }),
            }

        case ADD_TRANSCATION_SUCCESS:
            return {
                ...state,
                loading: false,
                transcations: [...state.transcations, payload],
                transcation: payload,
                error: "",
            }
        case UPDATE_TRANSCATION_SUCCESS:
            return {
                ...state,
                loading: false,
                transcation: payload.data,
                error: "",
                transcations: state.transcations.map(x => {
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
                transcations: state.transcations.filter(x => x._id !== payload),
                transcation: {},
                error: "",
            }
        default:
            return state
    }
}