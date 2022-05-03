import { SET_LOADING, SET_ERROR, GET_TOP_SELLING_SUCCESS, GET_CATEGORY_PRODUCT_COUNT_SUCCESS, GET_DAY_WISE_TRANSCATION_SUCCESS, GET_STATS_DASHBOARD_SUCCESS, GET_MONTH_WISE_TRANSCATION_SUCCESS, } from '../actions/index';
const initialState = {
    loading: false,
    topSelling: [],
    productCounts: [],
    dashboardStats: {},
    daywiseSell: [],
    monthwiseSell: [],
    error: ''
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case SET_LOADING:
            return { ...state, loading: true }
        case SET_ERROR:

            return { ...state, loading: false, error: payload.message }
        case GET_TOP_SELLING_SUCCESS:
            return {
                ...state,
                loading: false,
                topSelling: payload
            }
        case GET_CATEGORY_PRODUCT_COUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                productCounts: payload
            }

        case GET_DAY_WISE_TRANSCATION_SUCCESS:
            return {
                ...state,
                loading: false,
                daywiseSell: payload
            }
        case GET_MONTH_WISE_TRANSCATION_SUCCESS:
            return {
                ...state,
                loading: false,
                monthwiseSell: payload
            }
        case GET_STATS_DASHBOARD_SUCCESS:
            return {
                ...state,
                loading: false,
                dashboardStats: payload
            }

        default:
            return state
    }
}