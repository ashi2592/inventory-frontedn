import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import DropdownSearchSelection from "../layout/Dropdown";
import {  GET_SIZE_LIST } from "../redux/actions";


const SearchAndSelectSize = ({ getSizes, sizes, error, handleDropDownChanges, dropdownName, value = '',placeholder,clearable=false }) => {

    const [Options, setOptions] = useState([])

    useEffect(() => {
        getSizes(1, 100, '')
    }, [])

    useEffect(() => {
         const opt = _.map(sizes, (data, index) => ({ key: data._id, value: data.sizeName }))
        setOptions(opt)

    }, [sizes])

    return (<DropdownSearchSelection
        placeholder={placeholder}
        ArrayofObj={Options}
        handleDropDownChanges={handleDropDownChanges}
        dropdownName={dropdownName}
        value={value}
        clearable={clearable}
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
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchAndSelectSize);