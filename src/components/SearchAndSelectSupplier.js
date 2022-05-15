import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import DropdownSearchSelection from "../layout/Dropdown";
import {  GET_SUPPLIER_LIST } from "../redux/actions";


const SearchAndSelectSupplier = ({ getSuppliers, suppliers,  error=false, handleDropDownChanges, dropdownName, value = '',placeholder,clearable=true}) => {

    const [Options, setOptions] = useState([])

    useEffect(() => {
        getSuppliers(1, 100, '')
    }, [])

    useEffect(() => {
         const opt = _.map(suppliers, (data, index) => ({ key: data._id, value: data.supplierName }))
        setOptions(opt)

    }, [suppliers])

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
    error: state.suppliers.error,
    suppliers: state.suppliers.suppliers,
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getSuppliers: (page, count, searchText) => dispatch({ type: GET_SUPPLIER_LIST, payload: { page, count, searchText } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchAndSelectSupplier);