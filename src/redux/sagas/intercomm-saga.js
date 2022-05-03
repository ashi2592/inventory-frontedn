import {  put,  takeEvery } from 'redux-saga/effects';
import {
   ALERT_NOTIFY, ALERT_NOTIFY_SUCCESS, SET_ERROR
} from '../actions/index';



function* alterNotify({ payload }) {
    try{
        yield put({ type: ALERT_NOTIFY_SUCCESS, payload: payload })

    }catch(err){
        yield put({ type: SET_ERROR, payload: err })
    }
   
}


export default function* OtherSaga() {
    yield takeEvery(ALERT_NOTIFY, alterNotify)
  
}