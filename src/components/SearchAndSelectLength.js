import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import DropdownSearchSelection from "../layout/Dropdown";
import {  ADD_LENGTH, GET_LENGTH_LIST } from "../redux/actions";


const SearchAndSelectLength = ({ getLengths, productLengths,  error=false, handleDropDownChanges, dropdownName, value = '',placeholder, clearable=true ,addLength}) => {

    const [Options, setOptions] = useState([])

    useEffect(() => {
        getLengths(1, 100, '')
    }, [])

    useEffect(() => {
         const opt = _.map(productLengths, (data, index) => ({ key: data._id, value: data.lengthName }))

         let opts = {...opt,...{key:'',value:''}}
        setOptions(opt)

    }, [productLengths])

    const handleAdd = (lengthName)=>{
        addLength({lengthName })
    }

    return (<DropdownSearchSelection
        placeholder={placeholder}
        ArrayofObj={Options}
        handleDropDownChanges={handleDropDownChanges}
        dropdownName={dropdownName}
        clearable={clearable}
        value={value}
        handleAdditionChanges={handleAdd}
        error={error}
        ></DropdownSearchSelection>
    )

}



const mapStateToProps = (state) => ({
    error: state.productLengths.error,
    productLengths: state.productLengths.productLengths,
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getLengths: (page, count, searchText) => dispatch({ type: GET_LENGTH_LIST, payload: { page, count, searchText } }),
    addLength: (data) => dispatch({type: ADD_LENGTH, payload:data})
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchAndSelectLength);