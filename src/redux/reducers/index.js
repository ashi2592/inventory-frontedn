import { combineReducers } from "redux";

// Reducers
import category from './category-reducer';
import brands from './brand-reducer';
import products from './products-reducer';
import colors from './colors-reducer';
import customers from './customers-reducer';
import types from './types-reducer';
import suppliers from './suppliers-reducer';
import transcation from "./transcation-reducer";
import sizes from "./sizes-reducer";
import others from "./other-reducer";
import barcodes from './barcode-reducer'
import dashboard from './dashboard-reducer';
import intercomm from './intercomm-reducer';
import productLengths  from './length-reducer';
import patterns  from './patterns-reducer';
import variants  from './variants-reducer';
import purchases  from './purchases-reducer';








 export default combineReducers({
    category,
    brands,
    products,
    colors,
    customers,
    types,
    suppliers,
    transcation,
    sizes,
    others,
    barcodes,
    dashboard,
    intercomm,
    productLengths,
    patterns,
    variants,
    purchases
 })