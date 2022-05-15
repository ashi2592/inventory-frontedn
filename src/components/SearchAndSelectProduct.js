import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import DropdownSearchSelection from "../layout/Dropdown";
import { GET_PRODUCT_LIST } from "../redux/actions";


const SearchAndSelectProduct = ({ getProducts, products,  error=false, handleDropDownChanges, dropdownName, value = '',placeholder,clearable=true}) => {

    const [Options, setOptions] = useState([])

    useEffect(() => {
        getProducts(1, 100, '',{})
    }, [])

    useEffect(() => {
        const opt = _.map(products, (data, index) => ({ key: data._id, value: data.productName }));
        setOptions(opt)
    }, [products])


    return (<DropdownSearchSelection
        placeholder={placeholder}
        ArrayofObj={Options}
        handleDropDownChanges={handleDropDownChanges}
        dropdownName={dropdownName}
        value={value}
        clearable={clearable}
        error={error}
        
        ></DropdownSearchSelection>
    )

}



const mapStateToProps = (state) => ({
    error: state.products.error,
    products: state.products.products,
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getProducts: (page, count, searchText, searchInputs) => dispatch({ type: GET_PRODUCT_LIST, payload: { page, count, searchText, searchInputs } }),
   
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchAndSelectProduct);