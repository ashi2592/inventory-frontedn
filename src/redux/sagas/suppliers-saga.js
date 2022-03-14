import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import {
    GET_SUPPLIER_LIST,
    GET_SUPPLIER_LIST_SUCCESS,
    ADD_SUPPLIER,
    ADD_SUPPLIER_SUCCESS,
    GET_SUPPLIER_DETAILS,
    GET_SUPPLIER_DETAILS_SUCCESS,
    DELETE_SUPPLIER,
    DELETE_SUPPLIER_SUCCESS,
    UPDATE_SUPPLIER,
    UPDATE_SUPPLIER_SUCCESS,
    SET_LOADING
} from '../actions/index';
import { getAdd, getDeatils, DeleteFunction, getList, getUpdate } from '../services/suppliers-api'



function* getSuppliers() {
    yield put({ type: SET_LOADING })
    const suppliers = yield call(getList);
    yield put({ type: GET_SUPPLIER_LIST_SUCCESS, payload: suppliers })
}

function* getSupplier({ payload }) {
    yield put({ type: SET_LOADING })
    const supplier = yield call(getDeatils, payload.id);
    yield put({ type: GET_SUPPLIER_DETAILS_SUCCESS, payload: supplier })
}

function* addSupplier({ payload }) {
    yield put({ type: SET_LOADING })
    const newdata = yield call(getAdd, payload);
    yield put({ type: ADD_SUPPLIER_SUCCESS, payload: newdata })
}

function* updateSupplier({ payload }) {
    yield put({ type: SET_LOADING })
    yield call(getUpdate, payload.data, payload.id)
    yield put({ type: UPDATE_SUPPLIER_SUCCESS, payload: payload })
}


function* deleteSupplier({ payload }) {
    console.log(payload)
    yield put({ type: SET_LOADING })
    yield call(DeleteFunction, payload);
    yield put({ type: DELETE_SUPPLIER_SUCCESS, payload: payload })
}


export default function* suppliersSaga() {
    yield takeEvery(GET_SUPPLIER_LIST, getSuppliers)
    yield takeEvery(GET_SUPPLIER_DETAILS, getSupplier)
    yield takeLatest(ADD_SUPPLIER, addSupplier)
    yield takeLatest(UPDATE_SUPPLIER, updateSupplier)
    yield takeEvery(DELETE_SUPPLIER, deleteSupplier)

}