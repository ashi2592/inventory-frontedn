import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import { ADD_CATEGORY, GET_CATEGORY_DETAILS, GET_CATEGORY_LIST, SET_LOADING, UPDATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORY_LIST_SUCCESS, GET_CATEGORY_DETAILS_SUCCESS, ADD_CATEGORY_SUCCESS, UPDATE_CATEGORY_SUCCESS, DELETE_CATEGORY_SUCCESS, SET_ERROR } from '../actions/index';
import { getAdd, getDeatils, DeleteFunction, getList, getUpdate } from '../services/category-api'



function* getCategories({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const categories = yield call(getList, payload.page, payload.count, payload.searchText);
        yield put({ type: GET_CATEGORY_LIST_SUCCESS, payload: categories })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* getCategory({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const category = yield call(getDeatils, payload.id);
        yield put({ type: GET_CATEGORY_DETAILS_SUCCESS, payload: category })

    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* addCategory({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const newdata = yield call(getAdd, payload);
        yield put({ type: ADD_CATEGORY_SUCCESS, payload: newdata })

    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* updateCategory({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const updateddata = yield call(getUpdate, payload.data, payload.id)
        yield put({ type: UPDATE_CATEGORY_SUCCESS, payload: payload })

    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}


function* deleteCategory({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const deletedData = yield call(DeleteFunction, payload);
        yield put({ type: DELETE_CATEGORY_SUCCESS, payload: payload })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}


export default function* categorySaga() {
    yield takeEvery(GET_CATEGORY_LIST, getCategories)
    yield takeEvery(GET_CATEGORY_DETAILS, getCategory)
    yield takeLatest(ADD_CATEGORY, addCategory)
    yield takeLatest(UPDATE_CATEGORY, updateCategory)
    yield takeEvery(DELETE_CATEGORY, deleteCategory)

}