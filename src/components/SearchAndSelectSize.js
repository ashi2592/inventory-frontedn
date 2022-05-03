import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import DropdownSearchSelection from "../layout/Dropdown";
import {  ADD_SIZE, GET_SIZE_LIST } from "../redux/actions";


const SearchAndSelectSize = ({ getSizes, sizes, error, handleDropDownChanges, dropdownName, value = '',placeholder,clearable=true ,addSize}) => {

    const [Options, setOptions] = useState([])

    useEffect(() => {
        getSizes(1, 100, '')
    }, [])

    useEffect(() => {
         const opt = _.map(sizes, (data, index) => ({ key: data._id, value: data.sizeName }))
        setOptions(opt)

    }, [sizes])

    const handleAdd = (sizeName)=>{
        addSize({sizeName })
    }

    return (<DropdownSearchSelection
        placeholder={placeholder}
        ArrayofObj={Options}
        handleDropDownChanges={handleDropDownChanges}
        dropdownName={dropdownName}
        value={value}
        clearable={clearable}
        handleAdditionChanges={handleAdd}
        allowAdditions
        ></DropdownSearchSelection>
    )

}



const mapStateToProps = (state) => ({
    error: state.sizes.error,
    sizes: state.sizes.sizes,
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getSizes: (page, count, searchText) => dispatch({ type: GET_SIZE_LIST, payload: { page, count, searchText } }),
    addSize: (data) => dispatch({type: ADD_SIZE,payload:data})
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchAndSelectSize);