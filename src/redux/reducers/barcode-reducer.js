import { SET_LOADING, GET_BARCODE_LIST_SUCCESS, GET_BARCODE_DETAILS_SUCCESS, ADD_BARCODE_SUCCESS, UPDATE_BARCODE_SUCCESS, DELETE_BARCODE_SUCCESS, SET_ERROR } from '../actions/index';
const initialState = {
    loading: false,
    barcodes: [],
    barcode: {},
    pagination: {
        totalPages: 0,
        currentPage: 1,
        limit: 10,
        totalDocs: 0
    },
    error: ''
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case SET_LOADING:
            return { ...state, loading: true }
        case SET_ERROR:

            return { ...state, loading: false, error: payload.message }
        case GET_BARCODE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                barcodes: payload.docs,
                barcode: {},
                pagination: {
                    totalPages: payload.totalPages,
                    currentPage: payload.page,
                    limit: payload.limit,
                    totalDocs: payload.totalDocs
                }
            }
        case GET_BARCODE_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                barcode: payload
            }

        case ADD_BARCODE_SUCCESS:
            return {
                ...state,
                loading: false,
                barcodes: [...state.barcodes, payload],
                barcode: payload,

            }
        case UPDATE_BARCODE_SUCCESS:
            return {
                ...state,
                loading: false,
                barcode: payload.data,
                barcodes: state.barcodes.map(x => {
                    if (x._id === payload.id) {
                        return payload.data
                    }
                    return x
                }),
            }
        case DELETE_BARCODE_SUCCESS:
            return {
                ...state,
                loading: false,
                barcodes: state.barcodes.filter(x => x.barcode !== payload),
                barcode: {}
            }
        default:
            return state
    }
}