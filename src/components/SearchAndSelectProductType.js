import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import DropdownSearchSelection from "../layout/Dropdown";
import {  GET_TYPE_LIST } from "../redux/actions";


const SearchAndSelectProductType = ({ getTypes, types, error, handleDropDownChanges, dropdownName, value = '',placeholder,clearable=false }) => {

    const [Options, setOptions] = useState([])

    useEffect(() => {
        getTypes(1, 100, '')
    }, [])

    useEffect(() => {
         const opt = _.map(types, (data, index) => ({ key: data._id, value: data.typeName }))
        setOptions(opt)

    }, [types])

    return (<DropdownSearchSelection
        placeholder={placeholder}
        ArrayofObj={Options}
        handleDropDownChanges={handleDropDownChanges}
        dropdownName={dropdownName}
        value={value}
        clearable={clearable}></DropdownSearchSelection>

    )

}



const mapStateToProps = (state) => ({
    error: state.types.error,
    types: state.types.types,
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getTypes: (page, count, searchText) => dispatch({ type: GET_TYPE_LIST, payload: { page, count, searchText } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchAndSelectProductType);