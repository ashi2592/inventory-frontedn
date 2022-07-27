import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import {
    GET_VARIANT_LIST,
    GET_VARIANT_LIST_SUCCESS,
    ADD_VARIANT,
    ADD_VARIANT_SUCCESS,
    GET_VARIANT_DETAILS,
    GET_VARIANT_DETAILS_SUCCESS,
    DELETE_VARIANT,
    DELETE_VARIANT_SUCCESS,
    UPDATE_VARIANT,
    UPDATE_VARIANT_SUCCESS,
    SET_LOADING,
    SET_ERROR,
    ALERT_NOTIFY,
    ALERT_NOTIFY_SUCCESS,
    VARIANT_PURCHASE,
    VARIANT_PURCHASE_SUCCESS,
    VARIANT_SELL,
    VARIANT_SELL_SUCCESS
} from '../actions/index';
import { getAdd, getDeatils, DeleteFunction, getList, getUpdate, getPurchaseTransaction, getVariantTransactionApi } from '../services/variant-api'



function* getPatterns({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const data = yield call(getList, payload.productId, payload.page, payload.count, payload.searchText);
        yield put({ type: GET_VARIANT_LIST_SUCCESS, payload: data })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* getPattern({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const data = yield call(getDeatils, payload.id);
        yield put({ type: GET_VARIANT_DETAILS_SUCCESS, payload: data })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* addPattern({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const newdata = yield call(getAdd, payload);

        yield put({ type: ADD_VARIANT_SUCCESS, payload: newdata })

    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* updatePattern({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        yield call(getUpdate, payload.data, payload.id)
        yield put({ type: UPDATE_VARIANT_SUCCESS, payload: payload })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}


function* deletePattern({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        yield call(DeleteFunction, payload);
        yield put({ type: DELETE_VARIANT_SUCCESS, payload: payload })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }


}

function* getPurchaseTranscation({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const data = yield call(getPurchaseTransaction, payload.id, payload.page, payload.count);
        yield put({ type: VARIANT_PURCHASE_SUCCESS, payload: data })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}
function* getVariantTransction({ payload }) {
    try {

        yield put({ type: SET_LOADING })
        const data = yield call(getVariantTransactionApi, payload.id, payload.page, payload.count)
        yield put({ type: VARIANT_SELL_SUCCESS, payload: data })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }
}


export default function* variantSaga() {
    yield takeEvery(GET_VARIANT_LIST, getPatterns)
    yield takeEvery(GET_VARIANT_DETAILS, getPattern)
    yield takeLatest(ADD_VARIANT, addPattern)
    yield takeLatest(UPDATE_VARIANT, updatePattern)
    yield takeEvery(DELETE_VARIANT, deletePattern)
    yield takeEvery(VARIANT_PURCHASE, getPurchaseTranscation)
    yield takeEvery(VARIANT_SELL, getVariantTransction)


}