import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import {

    SET_LOADING,
    SET_ERROR,
    GET_TOP_SELLING,
    GET_TOP_SELLING_SUCCESS,
    GET_CATEGORY_PRODUCT_COUNT_SUCCESS,
    GET_DAY_WISE_TRANSCATION_SUCCESS,
    GET_STATS_DASHBOARD,
    GET_STATS_DASHBOARD_SUCCESS,
    GET_CATEGORY_PRODUCT_COUNT,
    GET_DAY_WISE_TRANSCATION,
    GET_MONTH_WISE_TRANSCATION,
    GET_MONTH_WISE_TRANSCATION_SUCCESS
} from '../actions/index';
import {
    getTopSelling,
    getDaywiseSell,
    getCategoryWiseProductCount,
    getDashboardStats,
    getMonthwiseSell,
} from '../services/dashboard';



function* getTopSellingProduct({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const data = yield call(getTopSelling);
        yield put({ type: GET_TOP_SELLING_SUCCESS, payload: data })

    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* getCategorWiseCount() {
    try {
        yield put({ type: SET_LOADING })
        const data = yield call(getCategoryWiseProductCount);
        yield put({ type: GET_CATEGORY_PRODUCT_COUNT_SUCCESS, payload: data })

    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}


function* getDaywiseSellReport({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const data = yield call(getDaywiseSell);
        yield put({ type: GET_DAY_WISE_TRANSCATION_SUCCESS, payload: data })

    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* getMonthwiseSellReport({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const data = yield call(getMonthwiseSell);
        yield put({ type: GET_MONTH_WISE_TRANSCATION_SUCCESS, payload: data })

    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* getStatsReport() {
    try {

        yield put({ type: SET_LOADING })
        const data = yield call(getDashboardStats);
        console.log("I am here")
        yield put({ type: GET_STATS_DASHBOARD_SUCCESS, payload: data })

    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}


export default function* dashboardSaga() {
    yield takeEvery(GET_TOP_SELLING, getTopSellingProduct)
    yield takeLatest(GET_CATEGORY_PRODUCT_COUNT, getCategorWiseCount)
    yield takeEvery(GET_DAY_WISE_TRANSCATION, getDaywiseSellReport)
    yield takeEvery(GET_MONTH_WISE_TRANSCATION, getMonthwiseSellReport)
    yield takeLatest(GET_STATS_DASHBOARD, getStatsReport)

}