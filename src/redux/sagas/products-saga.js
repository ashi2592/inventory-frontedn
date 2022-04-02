import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import { ADD_PRODUCT, GET_PRODUCT_DETAILS, GET_PRODUCT_LIST, SET_LOADING, UPDATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCT_LIST_SUCCESS, GET_PRODUCT_DETAILS_SUCCESS, ADD_PRODUCT_SUCCESS, UPDATE_PRODUCT_SUCCESS, DELETE_PRODUCT_SUCCESS, SET_ERROR, SEARCH_PRODUCT_SUCCESS, SEARCH_PRODUCT, GET_PRODUCT_AVAILIBLITY, GET_PRODUCT_AVAILIBLITY_SUCCESS } from '../actions/index';
import { getAdd, getDeatils, DeleteFunction, getList, getUpdate, searchList, getProductAvailiblity } from '../services/products-api'



function* getProducts({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const categories = yield call(getList, payload.page, payload.count, payload.searchText);
        yield put({ type: GET_PRODUCT_LIST_SUCCESS, payload: categories })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* searchProduct({ payload }) {
    try {
        console.log(payload)
        yield put({ type: SET_LOADING })
        const categories = yield call(searchList,payload.searchText);
        yield put({ type: SEARCH_PRODUCT_SUCCESS, payload: categories })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}


function* getProduct({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const category = yield call(getDeatils, payload.id);
        yield put({ type: GET_PRODUCT_DETAILS_SUCCESS, payload: category })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* addProduct({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const newdata = yield call(getAdd, payload);
        yield put({ type: ADD_PRODUCT_SUCCESS, payload: newdata })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* updateProduct({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        yield call(getUpdate, payload.data, payload.id)
        yield put({ type: UPDATE_PRODUCT_SUCCESS, payload: payload })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}


function* deleteProduct({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        yield call(DeleteFunction, payload);
        yield put({ type: DELETE_PRODUCT_SUCCESS, payload: payload })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}



function* getProductAvailability({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const category = yield call(getProductAvailiblity, payload.id);
        yield put({ type: GET_PRODUCT_AVAILIBLITY_SUCCESS, payload: category })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}


export default function* productSaga() {
    yield takeEvery(GET_PRODUCT_LIST, getProducts)
    yield takeEvery(GET_PRODUCT_DETAILS, getProduct)
    yield takeEvery(ADD_PRODUCT, addProduct)
    yield takeLatest(UPDATE_PRODUCT, updateProduct)
    yield takeEvery(DELETE_PRODUCT, deleteProduct)
    yield takeLatest(SEARCH_PRODUCT,searchProduct)
    yield takeEvery(GET_PRODUCT_AVAILIBLITY, getProductAvailability)

}