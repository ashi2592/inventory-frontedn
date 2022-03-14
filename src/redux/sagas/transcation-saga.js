import { takeLatest,put, call, takeEvery } from 'redux-saga/effects';
import { ADD_PRODUCT, GET_PRODUCT_DETAILS, GET_PRODUCT_LIST, SET_LOADING, UPDATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCT_LIST_SUCCESS, GET_PRODUCT_DETAILS_SUCCESS, ADD_PRODUCT_SUCCESS, UPDATE_PRODUCT_SUCCESS, DELETE_PRODUCT_SUCCESS } from '../actions/index';
import {getAdd, getDeatils, DeleteFunction, getList, getUpdate} from '../services/transctions-api'



function* getTranscations(){
    yield put({type: SET_LOADING})
    const categories = yield call(getList);
    yield put({type: GET_PRODUCT_LIST_SUCCESS,payload: categories})
}

function* getTranscation({payload}){
    yield put({type: SET_LOADING})
    const category = yield call(getDeatils,payload.id);
    yield put({type: GET_PRODUCT_DETAILS_SUCCESS,payload: category})
}

function* addTranscation({payload}){
    yield put({type: SET_LOADING})
    const newdata = yield call(getAdd,payload);
    yield put({type: ADD_PRODUCT_SUCCESS,payload: newdata})
}

function* updateTranscation({payload}){
    yield put({type: SET_LOADING})
    yield call(getUpdate,payload.data,payload.id)
    yield put({type: UPDATE_PRODUCT_SUCCESS, payload: payload})
}


function* deleteTranscation ({payload}){
    yield put({type: SET_LOADING})
    yield call(DeleteFunction,payload);
    yield put({type: DELETE_PRODUCT_SUCCESS, payload: payload})
}


export default function* transcationSaga(){
    yield takeEvery(GET_PRODUCT_LIST, getTranscations)
    yield takeEvery(GET_PRODUCT_DETAILS, getTranscation)
    yield takeLatest(ADD_PRODUCT, addTranscation)
    yield takeLatest(UPDATE_PRODUCT, updateTranscation)
    yield takeEvery(DELETE_PRODUCT, deleteTranscation)

}