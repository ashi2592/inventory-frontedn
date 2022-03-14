import {  SET_LOADING, GET_TRANSCATION_LIST_SUCCESS, GET_TRANSCATION_DETAILS_SUCCESS, ADD_TRANSCATION_SUCCESS, UPDATE_TRANSCATION_SUCCESS, DELETE_TRANSCATION_SUCCESS } from '../actions/index';


const initialState = {
    loading: false,
    transactions: [],
    transcation: {}
}



export default (state = initialState, { type, payload }) => {
    // console.log(payload)

    switch (type) {

        case SET_LOADING:
            return { ...state, loading: true }
        case GET_TRANSCATION_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                transactions:payload,
                transcation: {}
            }
        case GET_TRANSCATION_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                transcation: payload
            }

        case ADD_TRANSCATION_SUCCESS:
            return {
                ...state,
                loading: false,
                transactions: [...state.transactions, payload],
                transcation: payload
            }
        case UPDATE_TRANSCATION_SUCCESS:
            return {
                ...state,
                loading: false,
                transcation: payload.data,
                transactions: state.transactions.map(x => {
                    if (x.id === payload.id) {
                        return payload.data
                    }
                    return x
                }),
            }
        case DELETE_TRANSCATION_SUCCESS:
            return {
                ...state,
                loading: false,
                transactions: state.transactions.filter(x => x.id !== payload),
                transcation: {}
            }
        default:
            return state
    }
}