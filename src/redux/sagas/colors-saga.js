import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import {
    GET_COLOR_LIST,
    GET_COLOR_LIST_SUCCESS,
    ADD_COLOR,
    ADD_COLOR_SUCCESS,
    GET_COLOR_DETAILS,
    GET_COLOR_DETAILS_SUCCESS,
    DELETE_COLOR,
    DELETE_COLOR_SUCCESS,
    UPDATE_COLOR,
    UPDATE_COLOR_SUCCESS,
    SET_LOADING,
    SET_ERROR
} from '../actions/index';
import { getAdd, getDeatils, DeleteFunction, getList, getUpdate } from '../services/colors-api'



function* getColors({payload}) {
    try{
        yield put({ type: SET_LOADING })
        const colors = yield call(getList,payload.page,payload.count,payload.searchText);
        yield put({ type: GET_COLOR_LIST_SUCCESS, payload: colors })

    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
  
}

function* getColor({ payload }) {
    try{
        yield put({ type: SET_LOADING })
        const color = yield call(getDeatils, payload.id);
        yield put({ type: GET_COLOR_DETAILS_SUCCESS, payload: color })

    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
 
}

function* addColor({ payload }) {
    try{
        yield put({ type: SET_LOADING })
        const newdata = yield call(getAdd, payload);
        yield put({ type: ADD_COLOR_SUCCESS, payload: newdata })
    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
 
}

function* updateColor({ payload }) {
    try{
        yield put({ type: SET_LOADING })
        yield call(getUpdate, payload.data, payload.id)
        yield put({ type: UPDATE_COLOR_SUCCESS, payload: payload })

    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
   
}


function* deleteColor({ payload }) {
    try{

        yield put({ type: SET_LOADING })
        yield call(DeleteFunction, payload);
        yield put({ type: DELETE_COLOR_SUCCESS, payload: payload })
    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
   
}


export default function* colorSaga() {
    yield takeEvery(GET_COLOR_LIST, getColors)
    yield takeEvery(GET_COLOR_DETAILS, getColor)
    yield takeLatest(ADD_COLOR, addColor)
    yield takeLatest(UPDATE_COLOR, updateColor)
    yield takeEvery(DELETE_COLOR, deleteColor)

}