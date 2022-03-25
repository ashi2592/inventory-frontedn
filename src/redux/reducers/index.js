import { combineReducers } from "redux";

// Reducers
import category from './category-reducer';
import brand from './brand-reducer';
import products from './products-reducer';
import colors from './colors-reducer';
import customers from './customers-reducer';
import types from './types-reducer';
import suppliers from './suppliers-reducer';
import transcation from "./transcation-reducer";
import sizes from "./sizes-reducer";
import others from "./other-reducer";



 export default combineReducers({
    category,
    brand,
    products,
    colors,
    customers,
    types,
    suppliers,
    transcation,
    sizes,
    others,

 })