import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import {
    GET_LENGTH_LIST,
    GET_LENGTH_LIST_SUCCESS,
    ADD_LENGTH,
    ADD_LENGTH_SUCCESS,
    GET_LENGTH_DETAILS,
    GET_LENGTH_DETAILS_SUCCESS,
    DELETE_LENGTH,
    DELETE_LENGTH_SUCCESS,
    UPDATE_LENGTH,
    UPDATE_LENGTH_SUCCESS,
    SET_LOADING,
    SET_ERROR
} from '../actions/index';
import { getAdd, getDeatils, DeleteFunction, getList, getUpdate } from '../services/length-api'



function* getLenghts({payload}) {
    try{
        yield put({ type: SET_LOADING })
        const types =yield call(getList,payload.page,payload.count,payload.searchText);
        yield put({ type: GET_LENGTH_LIST_SUCCESS, payload: types })
    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
  
}

function* getLength({ payload }) {
    try{
        yield put({ type: SET_LOADING })
        const type = yield call(getDeatils, payload.id);
        yield put({ type: GET_LENGTH_DETAILS_SUCCESS, payload: type })
    
    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
}

function* addLength({ payload }) {
    try{
        yield put({ type: SET_LOADING })
        const newdata = yield call(getAdd, payload);
        yield put({ type: ADD_LENGTH_SUCCESS, payload: newdata })
    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
    
}

function* updateLength({ payload }) {
    try{
        yield put({ type: SET_LOADING })
        yield call(getUpdate, payload.data, payload.id)
        yield put({ type: UPDATE_LENGTH_SUCCESS, payload: payload })
    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
  
}


function* deleteLength({ payload }) {
    try{
        yield put({ type: SET_LOADING })
     yield call(DeleteFunction, payload);
    yield put({ type: DELETE_LENGTH_SUCCESS, payload: payload })

    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
    
}


export default function* typesSaga() {
    yield takeEvery(GET_LENGTH_LIST, getLenghts)
    yield takeEvery(GET_LENGTH_DETAILS, getLength)
    yield takeLatest(ADD_LENGTH, addLength)
    yield takeLatest(UPDATE_LENGTH, updateLength)
    yield takeEvery(DELETE_LENGTH, deleteLength)

}