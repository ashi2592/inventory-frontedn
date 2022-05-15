import { all, spawn } from 'redux-saga/effects'

// Sagas
import categorySaga from './category-saga';
import brandSaga from './brands-saga';
import colorSaga from './colors-saga';
import productSaga from './products-saga';
import suppliersSaga from './suppliers-saga';
import transcationSaga from './transcation-saga';
import typesSaga from './types-saga';
import customerSaga from './customer-saga';
import sizeSaga from './sizes-saga';
import OtherSaga from './other-saga';
import barcodeSaga from './barcode-saga';
import dashboardSaga from './dashboard-saga';
import interCommSaga from './intercomm-saga';
import lengthSaga from './lengths-saga';
import patternSaga from './patterns-saga';
import variantSaga from './variant-saga';
import purchaseSage from './purchases-saga';







// Export the root saga
export default function* rootSaga() {
  console.log("Hello From Redux-Saga!")
  yield spawn(categorySaga)
  yield spawn(colorSaga)
  yield spawn(productSaga)
  yield spawn(suppliersSaga)
  yield spawn(transcationSaga)
  yield spawn(typesSaga)
  yield spawn(customerSaga)
  yield spawn(brandSaga)
  yield spawn(sizeSaga)
  yield spawn(OtherSaga)
  yield spawn(barcodeSaga)
  yield spawn(dashboardSaga)
  yield spawn(interCommSaga)
  yield spawn(lengthSaga)
  yield spawn(patternSaga)
  yield spawn(variantSaga) 
  yield spawn(purchaseSage) 


}