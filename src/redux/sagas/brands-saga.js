import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import {
    GET_BRAND_LIST,
    GET_BRAND_LIST_SUCCESS,
    ADD_BRAND,
    ADD_BRAND_SUCCESS,
    GET_BRAND_DETAILS,
    GET_BRAND_DETAILS_SUCCESS,
    DELETE_BRAND,
    DELETE_BRAND_SUCCESS,
    UPDATE_BRAND,
    UPDATE_BRAND_SUCCESS,
    SET_LOADING,
    SET_ERROR
} from '../actions/index';
import { getAdd, getDeatils, DeleteFunction, getList, getUpdate } from '../services/brands-api'



function* getBrands({payload}) {
    try{
        yield put({ type: SET_LOADING })
        const categories =yield call(getList,payload.page,payload.count,payload.searchText);
        yield put({ type: GET_BRAND_LIST_SUCCESS, payload: categories })

    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
  
}

function* getBrand({ payload }) {
    try{
        yield put({type: SET_LOADING})
        const category = yield call(getDeatils,payload.id);
        yield put({ type: GET_BRAND_DETAILS_SUCCESS, payload: category })
    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
  
}

function* addBrand({ payload }) {
    try{
        yield put({ type: SET_LOADING })
        const newdata = yield call(getAdd, payload);
        yield put({ type: ADD_BRAND_SUCCESS, payload: newdata })
    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
  
}

function* updateBrand({ payload }) {
    try{
        yield put({ type: SET_LOADING })
      yield call(getUpdate, payload.data, payload.id)
        yield put({ type: UPDATE_BRAND_SUCCESS, payload: payload })
    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
 
}


function* deleteBrand({ payload }) {
    try{
        yield put({ type: SET_LOADING })
        yield call(DeleteFunction, payload);
        yield put({ type: DELETE_BRAND_SUCCESS, payload: payload })

    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
   
}


export default function* brandSaga() {
    yield takeEvery(GET_BRAND_LIST, getBrands)
    yield takeEvery(GET_BRAND_DETAILS, getBrand)
    yield takeLatest(ADD_BRAND, addBrand)
    yield takeLatest(UPDATE_BRAND, updateBrand)
    yield takeEvery(DELETE_BRAND, deleteBrand)

}