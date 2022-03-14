import { takeLatest,put, call, takeEvery } from 'redux-saga/effects';
import { ADD_CUSTOMER, GET_CUSTOMER_DETAILS, GET_CUSTOMER_LIST, SET_LOADING, UPDATE_CUSTOMER, DELETE_CUSTOMER, GET_CUSTOMER_LIST_SUCCESS, GET_CUSTOMER_DETAILS_SUCCESS, ADD_CUSTOMER_SUCCESS, UPDATE_CUSTOMER_SUCCESS, DELETE_CUSTOMER_SUCCESS } from '../actions/index';
import {getAdd, getDeatils, DeleteFunction, getList, getUpdate} from '../services/customers-api'



function* getCustomers(){
    yield put({type: SET_LOADING})
    const customers = yield call(getList);
    yield put({type: GET_CUSTOMER_LIST_SUCCESS,payload: customers})
}

function* getCustomer({payload}){
    yield put({type: SET_LOADING})
    const customer = yield call(getDeatils,payload.id);
    yield put({type: GET_CUSTOMER_DETAILS_SUCCESS,payload: customer})
}

function* addCustomer({payload}){
    yield put({type: SET_LOADING})
    const newdata = yield call(getAdd,payload);
    yield put({type: ADD_CUSTOMER_SUCCESS,payload: newdata})
}

function* updateCustomer({payload}){
    yield put({type: SET_LOADING})
    yield call(getUpdate,payload.data,payload.id)
    yield put({type: UPDATE_CUSTOMER_SUCCESS, payload: payload})
}


function* deleteCustomer ({payload}){
    yield put({type: SET_LOADING})
    yield call(DeleteFunction,payload);
    yield put({type: DELETE_CUSTOMER_SUCCESS, payload: payload})
}


export default function* customerSaga(){
    yield takeEvery(GET_CUSTOMER_LIST, getCustomers)
    yield takeEvery(GET_CUSTOMER_DETAILS, getCustomer)
    yield takeLatest(ADD_CUSTOMER, addCustomer)
    yield takeLatest(UPDATE_CUSTOMER, updateCustomer)
    yield takeEvery(DELETE_CUSTOMER, deleteCustomer)

}