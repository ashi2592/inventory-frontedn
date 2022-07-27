import { SET_LOADING, GET_VARIANT_LIST_SUCCESS, GET_VARIANT_DETAILS_SUCCESS, ADD_VARIANT_SUCCESS, UPDATE_VARIANT_SUCCESS, DELETE_VARIANT_SUCCESS, SET_ERROR, VARIANT_PURCHASE_SUCCESS, VARIANT_SELL, VARIANT_SELL_SUCCESS } from '../actions/index';


const initialState = {
    loading: false,
    variants: [],
    variant: {},
    purchases: [],
    sells: [],

    pagination: {
        totalPages: 0,
        currentPage: 1,
        limit: 10,
        totalDocs: 0
    },
    purchasepagination: {
        totalPages: 0,
        currentPage: 1,
        limit: 10,
        totalDocs: 0
    },
    sellpagination: {
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
        case GET_VARIANT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                variants: payload.docs,
                variant: {},
                pagination: {
                    totalPages: payload.totalPages,
                    currentPage: payload.page,
                    limit: payload.limit,
                    totalDocs: payload.totalDocs
                }
            }
        case VARIANT_PURCHASE_SUCCESS:
            return {
                ...state,
                loading: false,
                purchases: payload.docs,
                purchasepagination: {
                    totalPages: payload.totalPages,
                    currentPage: payload.page,
                    limit: payload.limit,
                    totalDocs: payload.totalDocs
                }
            }
        case VARIANT_SELL_SUCCESS:
            return {
                ...state,
                loading: false,
                sells: payload.docs,
                sellpagination: {
                    totalPages: payload.totalPages,
                    currentPage: payload.page,
                    limit: payload.limit,
                    totalDocs: payload.totalDocs
                }
            }
        case GET_VARIANT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                variant: payload
            }

        case ADD_VARIANT_SUCCESS:
            // yield put({ type: ALERT_NOTIFY_SUCCESS, payload: { type:'success', message:"Product Variant Add Successfully" } })
            return {
                ...state,
                loading: false,
                variants: [...state.variants, payload],
                variant: payload
            }
        case UPDATE_VARIANT_SUCCESS:
            return {
                ...state,
                loading: false,
                variant: payload.data,
                variants: state.variants.map(x => {
                    if (x._id === payload.id) {
                        return payload.data
                    }
                    return x
                }),
            }
        case DELETE_VARIANT_SUCCESS:
            return {
                ...state,
                loading: false,
                variants: state.variants.filter(x => x._id !== payload),
                variant: {}
            }
        default:
            return state
    }
}