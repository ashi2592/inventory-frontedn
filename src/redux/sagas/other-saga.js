import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import {
    GET_OTHER_LIST,
    GET_OTHER_LIST_SUCCESS,
    ADD_OTHER,
    ADD_OTHER_SUCCESS,
    GET_OTHER_DETAILS,
    GET_OTHER_DETAILS_SUCCESS,
    DELETE_OTHER,
    DELETE_OTHER_SUCCESS,
    UPDATE_OTHER,
    UPDATE_OTHER_SUCCESS,
    SET_LOADING,
    SET_ERROR
} from '../actions/index';
import { getAdd, getDeatils, DeleteFunction, getList, getUpdate } from '../services/other-api'



function* getOthers({payload}) {
    try{
        yield put({ type: SET_LOADING })
        const categories =yield call(getList,payload.page,payload.count,payload.searchText);
        yield put({ type: GET_OTHER_LIST_SUCCESS, payload: categories })

    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
  
}

function* getOther({ payload }) {
    try{
        yield put({type: SET_LOADING})
        const category = yield call(getDeatils,payload.id);
        yield put({ type: GET_OTHER_DETAILS_SUCCESS, payload: category })
    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
  
}

function* addOther({ payload }) {
    try{
        yield put({ type: SET_LOADING })
        const newdata = yield call(getAdd, payload);
        yield put({ type: ADD_OTHER_SUCCESS, payload: newdata })
    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
  
}

function* updateOther({ payload }) {
    try{
        yield put({ type: SET_LOADING })
         yield call(getUpdate, payload.data, payload.id)
        yield put({ type: UPDATE_OTHER_SUCCESS, payload: payload })
    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
 
}


function* deleteOther({ payload }) {
    try{
        yield put({ type: SET_LOADING })
        yield call(DeleteFunction, payload);
        yield put({ type: DELETE_OTHER_SUCCESS, payload: payload })

    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
   
}


export default function* OtherSaga() {
    yield takeEvery(GET_OTHER_LIST, getOthers)
    yield takeEvery(GET_OTHER_DETAILS, getOther)
    yield takeLatest(ADD_OTHER, addOther)
    yield takeLatest(UPDATE_OTHER, updateOther)
    yield takeEvery(DELETE_OTHER, deleteOther)

}