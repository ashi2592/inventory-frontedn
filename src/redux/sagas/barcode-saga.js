import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import {
    GET_BARCODE_LIST,
    GET_BARCODE_LIST_SUCCESS,
    ADD_BARCODE,
    ADD_BARCODE_SUCCESS,
    GET_BARCODE_DETAILS,
    GET_BARCODE_DETAILS_SUCCESS,
    DELETE_BARCODE,
    DELETE_BARCODE_SUCCESS,
    UPDATE_BARCODE,
    UPDATE_BARCODE_SUCCESS,
    SET_LOADING,
    SET_ERROR,
    GET_PRODUCT_DETAILS_SUCCESS
} from '../actions/index';
import { getAdd, getDeatils, DeleteFunction, getList, getUpdate } from '../services/barcode-api';
import {  getDeatils as getProductDetail} from '../services/products-api';



function* getBarcodes({payload}) {
    try{
        yield put({ type: SET_LOADING })
        const barcodes =yield call(getList,payload.page,payload.count,payload.purchaseId, payload.variantId,payload.productId);
        yield put({ type: GET_BARCODE_LIST_SUCCESS, payload: barcodes })

    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
  
}

function* getBarcode({ payload }) {
    try{
        yield put({type: SET_LOADING})
        const category = yield call(getDeatils,payload.barcode);
        yield put({ type: GET_BARCODE_DETAILS_SUCCESS, payload: category })
    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
  
}

function* addBarcode({ payload }) {
    try{
        yield put({ type: SET_LOADING })
        const newdata = yield call(getAdd, payload);
        yield put({ type: ADD_BARCODE_SUCCESS, payload: newdata })
        // const barcodes = yield  call(getList,1,100,payload.purchaseId, payload.variantId,'');
        // yield put({ type: GET_BARCODE_LIST_SUCCESS, payload: barcodes })

        
        
        // yield put({ type: ADD_BARCODE_SUCCESS, payload: newdata })

    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
  
}

function* updateBarcode({ payload }) {
    try{
        yield put({ type: SET_LOADING })
         yield call(getUpdate, payload.data, payload.id)
        yield put({ type: UPDATE_BARCODE_SUCCESS, payload: payload })
    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
 
}


function* deleteBarcode({ payload }) {
    try{
        yield put({ type: SET_LOADING })
      yield call(DeleteFunction, payload);
        yield put({ type: DELETE_BARCODE_SUCCESS, payload: payload })

    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
   
}


export default function* barcodeSaga() {
    yield takeEvery(GET_BARCODE_LIST, getBarcodes)
    yield takeEvery(GET_BARCODE_DETAILS, getBarcode)
    yield takeLatest(ADD_BARCODE, addBarcode)
    yield takeLatest(UPDATE_BARCODE, updateBarcode)
    yield takeEvery(DELETE_BARCODE, deleteBarcode)

}