import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import { ADD_PRODUCT, GET_PRODUCT_DETAILS, GET_PRODUCT_LIST, SET_LOADING, UPDATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCT_LIST_SUCCESS, GET_PRODUCT_DETAILS_SUCCESS, ADD_PRODUCT_SUCCESS, UPDATE_PRODUCT_SUCCESS, DELETE_PRODUCT_SUCCESS, SET_ERROR } from '../actions/index';
import { getAdd, getDeatils, DeleteFunction, getList, getUpdate } from '../services/transctions-api'



function* getTranscations({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const categories = yield call(getList, payload.page, payload.count, payload.searchText);
        yield put({ type: GET_PRODUCT_LIST_SUCCESS, payload: categories })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* getTranscation({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const category = yield call(getDeatils, payload.id);
        yield put({ type: GET_PRODUCT_DETAILS_SUCCESS, payload: category })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* addTranscation({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const newdata = yield call(getAdd, payload);
        yield put({ type: ADD_PRODUCT_SUCCESS, payload: newdata })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* updateTranscation({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        yield call(getUpdate, payload.data, payload.id)
        yield put({ type: UPDATE_PRODUCT_SUCCESS, payload: payload })

    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }
}


function* deleteTranscation({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        yield call(DeleteFunction, payload);
        yield put({ type: DELETE_PRODUCT_SUCCESS, payload: payload })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}


export default function* transcationSaga() {
    yield takeEvery(GET_PRODUCT_LIST, getTranscations)
    yield takeEvery(GET_PRODUCT_DETAILS, getTranscation)
    yield takeLatest(ADD_PRODUCT, addTranscation)
    yield takeLatest(UPDATE_PRODUCT, updateTranscation)
    yield takeEvery(DELETE_PRODUCT, deleteTranscation)

}