import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import { ADD_TRANSCATION, GET_TRANSCATION_DETAILS, GET_TRANSCATION_LIST, SET_LOADING, UPDATE_TRANSCATION, DELETE_TRANSCATION, GET_TRANSCATION_LIST_SUCCESS, GET_TRANSCATION_DETAILS_SUCCESS, ADD_TRANSCATION_SUCCESS, UPDATE_TRANSCATION_SUCCESS, DELETE_TRANSCATION_SUCCESS, SET_ERROR, GET_PRODUCT_AVAILIBLITY_SUCCESS, GET_PRODUCT_AVAILIBLITY, UPDATE_TRANSCATION_STATUS_SUCCESS, UPDATE_TRANSCATION_STATUS } from '../actions/index';
import { getAdd, getDeatils, DeleteFunction, getList, getUpdate, getProductAvailiblity, updateStatus } from '../services/transctions-api'



function* getTranscations({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const categories = yield call(getList, payload.page, payload.count, payload.searchText);
        yield put({ type: GET_TRANSCATION_LIST_SUCCESS, payload: categories })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* getTranscation({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const category = yield call(getDeatils, payload.id);
        yield put({ type: GET_TRANSCATION_DETAILS_SUCCESS, payload: category })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }
}


function* addTranscation({ payload }) {
    try {

        console.log("I am here")
        yield put({ type: SET_LOADING })
        const newdata = yield call(getAdd, payload);
        yield put({ type: ADD_TRANSCATION_SUCCESS, payload: newdata })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }
}

function* updateTranscation({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        yield call(getUpdate, payload.data, payload.id)
        yield put({ type: UPDATE_TRANSCATION_SUCCESS, payload: payload })

    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }
}


function* updateTranscationStatus({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        yield call(updateStatus,  payload.id,payload.data)
        yield put({ type: UPDATE_TRANSCATION_SUCCESS, payload: payload })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }
}


function* deleteTranscation({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        yield call(DeleteFunction, payload);
        yield put({ type: DELETE_TRANSCATION_SUCCESS, payload: payload })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}





export default function* transcationSaga() {
    yield takeEvery(GET_TRANSCATION_LIST, getTranscations)
    yield takeEvery(GET_TRANSCATION_DETAILS, getTranscation)
    yield takeEvery(ADD_TRANSCATION, addTranscation)
    yield takeLatest(UPDATE_TRANSCATION, updateTranscation)
    yield takeLatest(UPDATE_TRANSCATION_STATUS, updateTranscationStatus)
    yield takeEvery(DELETE_TRANSCATION, deleteTranscation)

}