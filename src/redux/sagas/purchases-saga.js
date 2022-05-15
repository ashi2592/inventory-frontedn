import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import {
    GET_PURCHASE_LIST,
    GET_PURCHASE_LIST_SUCCESS,
    ADD_PURCHASE,
    ADD_PURCHASE_SUCCESS,
    GET_PURCHASE_DETAILS,
    GET_PURCHASE_DETAILS_SUCCESS,
    DELETE_PURCHASE,
    DELETE_PURCHASE_SUCCESS,
    UPDATE_PURCHASE,
    UPDATE_PURCHASE_SUCCESS,
    SET_LOADING,
    SET_ERROR
} from '../actions/index';
import { getAdd, getDeatils, DeleteFunction, getList, getUpdate } from '../services/purchases'



function* getPurchases({ payload }) {
    try {
        yield put({ type: SET_LOADING })
              const data = yield call(getList, payload.page, payload.count, payload.searchText);
        yield put({ type: GET_PURCHASE_LIST_SUCCESS, payload: data })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* getPurchase({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const data = yield call(getDeatils, payload.id);
        yield put({ type: GET_PURCHASE_DETAILS_SUCCESS, payload: data })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* addPurchase({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const newdata = yield call(getAdd, payload);
        yield put({ type: ADD_PURCHASE_SUCCESS, payload: newdata })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* updatePurchase({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        yield call(getUpdate, payload.data, payload.id)
        yield put({ type: UPDATE_PURCHASE_SUCCESS, payload: payload })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}


function* deletePurchase({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        yield call(DeleteFunction, payload);
        yield put({ type: DELETE_PURCHASE_SUCCESS, payload: payload })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }


}


export default function* variantSaga() {
    yield takeEvery(GET_PURCHASE_LIST, getPurchases)
    yield takeEvery(GET_PURCHASE_DETAILS, getPurchase)
    yield takeLatest(ADD_PURCHASE, addPurchase)
    yield takeLatest(UPDATE_PURCHASE, updatePurchase)
    yield takeEvery(DELETE_PURCHASE, deletePurchase)

}