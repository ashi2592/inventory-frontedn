import { takeLatest,put, call, takeEvery } from 'redux-saga/effects';
import { ADD_PRODUCT, GET_PRODUCT_DETAILS, GET_PRODUCT_LIST, SET_LOADING, UPDATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCT_LIST_SUCCESS, GET_PRODUCT_DETAILS_SUCCESS, ADD_PRODUCT_SUCCESS, UPDATE_PRODUCT_SUCCESS, DELETE_PRODUCT_SUCCESS } from '../actions/index';
import {getAdd, getDeatils, DeleteFunction, getList, getUpdate} from '../services/products-api'



function* getProducts(){
    yield put({type: SET_LOADING})
    const categories = yield call(getList);
    yield put({type: GET_PRODUCT_LIST_SUCCESS,payload: categories})
}

function* getProduct({payload}){
    yield put({type: SET_LOADING})
    const category = yield call(getDeatils,payload.id);
    yield put({type: GET_PRODUCT_DETAILS_SUCCESS,payload: category})
}

function* addProduct({payload}){
    yield put({type: SET_LOADING})
    const newdata = yield call(getAdd,payload);
    yield put({type: ADD_PRODUCT_SUCCESS,payload: newdata})
}

function* updateProduct({payload}){
    yield put({type: SET_LOADING})
    yield call(getUpdate,payload.data,payload.id)
    yield put({type: UPDATE_PRODUCT_SUCCESS, payload: payload})
}


function* deleteProduct ({payload}){
    yield put({type: SET_LOADING})
    yield call(DeleteFunction,payload);
    yield put({type: DELETE_PRODUCT_SUCCESS, payload: payload})
}


export default function* productSaga(){
    yield takeEvery(GET_PRODUCT_LIST, getProducts)
    yield takeEvery(GET_PRODUCT_DETAILS, getProduct)
    yield takeEvery(ADD_PRODUCT, addProduct)
    yield takeLatest(UPDATE_PRODUCT, updateProduct)
    yield takeEvery(DELETE_PRODUCT, deleteProduct)

}