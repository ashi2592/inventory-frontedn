import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import { ADD_CUSTOMER, GET_CUSTOMER_DETAILS, GET_CUSTOMER_LIST, SET_LOADING, UPDATE_CUSTOMER, DELETE_CUSTOMER, GET_CUSTOMER_LIST_SUCCESS, GET_CUSTOMER_DETAILS_SUCCESS, ADD_CUSTOMER_SUCCESS, UPDATE_CUSTOMER_SUCCESS, DELETE_CUSTOMER_SUCCESS, SET_ERROR, GET_CUSTOMER_STATS_SUCCESS, GET_CUSTOMER_STATS } from '../actions/index';
import { getAdd, getDeatils, DeleteFunction, getList, getUpdate, getStats } from '../services/customers-api'



function* getCustomers({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const customers = yield call(getList, payload.page, payload.count, payload.searchText);
        yield put({ type: GET_CUSTOMER_LIST_SUCCESS, payload: customers })

    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* getCustomer({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const customer = yield call(getDeatils, payload.id);
        yield put({ type: GET_CUSTOMER_DETAILS_SUCCESS, payload: customer })

    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}



function* getCustomerStats({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const customer = yield call(getStats, payload.id);
        yield put({ type: GET_CUSTOMER_STATS_SUCCESS, payload: customer })

    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* addCustomer({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        const newdata = yield call(getAdd, payload);
        yield put({ type: ADD_CUSTOMER_SUCCESS, payload: newdata })

    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}

function* updateCustomer({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        yield call(getUpdate, payload.data, payload.id)
        yield put({ type: UPDATE_CUSTOMER_SUCCESS, payload: payload })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}


function* deleteCustomer({ payload }) {
    try {
        yield put({ type: SET_LOADING })
        yield call(DeleteFunction, payload);
        yield put({ type: DELETE_CUSTOMER_SUCCESS, payload: payload })
    } catch (err) {
        yield put({ type: SET_ERROR, payload: err })
    }

}


export default function* customerSaga() {
    yield takeEvery(GET_CUSTOMER_LIST, getCustomers)
    yield takeEvery(GET_CUSTOMER_DETAILS, getCustomer)
    yield takeLatest(ADD_CUSTOMER, addCustomer)
    yield takeLatest(UPDATE_CUSTOMER, updateCustomer)
    yield takeEvery(DELETE_CUSTOMER, deleteCustomer)
    yield takeEvery(GET_CUSTOMER_STATS,getCustomerStats)

}