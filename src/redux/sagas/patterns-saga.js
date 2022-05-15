import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import {
    GET_PATTERN_LIST,
    GET_PATTERN_LIST_SUCCESS,
    ADD_PATTERN,
    ADD_PATTERN_SUCCESS,
    GET_PATTERN_DETAILS,
    GET_PATTERN_DETAILS_SUCCESS,
    DELETE_PATTERN,
    DELETE_PATTERN_SUCCESS,
    UPDATE_PATTERN,
    UPDATE_PATTERN_SUCCESS,
    SET_LOADING,
    SET_ERROR
} from '../actions/index';
import { getAdd, getDeatils, DeleteFunction, getList, getUpdate } from '../services/pattern-api'



function* getPatterns({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        console.log("I am pattern")
        const data = yield call(getList, payload.page, payload.count, payload.searchText);
        yield put({ type: GET_PATTERN_LIST_SUCCESS, payload: data })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* getPattern({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const data = yield call(getDeatils, payload.id);
        yield put({ type: GET_PATTERN_DETAILS_SUCCESS, payload: data })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* addPattern({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const newdata = yield call(getAdd, payload);
        yield put({ type: ADD_PATTERN_SUCCESS, payload: newdata })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* updatePattern({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        yield call(getUpdate, payload.data, payload.id)
        yield put({ type: UPDATE_PATTERN_SUCCESS, payload: payload })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}


function* deletePattern({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        yield call(DeleteFunction, payload);
        yield put({ type: DELETE_PATTERN_SUCCESS, payload: payload })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }


}


export default function* patternSaga() {
    yield takeEvery(GET_PATTERN_LIST, getPatterns)
    yield takeEvery(GET_PATTERN_DETAILS, getPattern)
    yield takeLatest(ADD_PATTERN, addPattern)
    yield takeLatest(UPDATE_PATTERN, updatePattern)
    yield takeEvery(DELETE_PATTERN, deletePattern)

}