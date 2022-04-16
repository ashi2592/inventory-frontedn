import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import DropdownSearchSelection from "../layout/Dropdown";
import { GET_BRAND_LIST, GET_COLOR_LIST } from "../redux/actions";


const SearchAndSelectColor = ({ getColors, colors, error, handleDropDownChanges, dropdownName, value = '',placeholder, clearable=false }) => {

    const [Options, setOptions] = useState([])

    useEffect(() => {
        getColors(1, 100, '')
    }, [])

    useEffect(() => {
         const opt = _.map(colors, (data, index) => ({ key: data._id, value: data.colorName }))
        setOptions(opt)

    }, [colors])

    return (<DropdownSearchSelection
        placeholder={placeholder}
        ArrayofObj={Options}
        handleDropDownChanges={handleDropDownChanges}
        dropdownName={dropdownName}
        clearable={clearable}
        value={value}></DropdownSearchSelection>
    )

}



const mapStateToProps = (state) => ({
    error: state.colors.error,
    colors: state.colors.colors,
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getColors: (page, count, searchText) => dispatch({ type: GET_COLOR_LIST, payload: { page, count, searchText } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchAndSelectColor);