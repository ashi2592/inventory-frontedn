import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import DropdownSearchSelection from "../layout/Dropdown";
import { ADD_COLOR, GET_COLOR_LIST } from "../redux/actions";


const SearchAndSelectColor = ({ getColors, colors,  error=false, handleDropDownChanges, 
    dropdownName, value = '',placeholder, clearable=true, addColors,
    disabled= false
 }) => {

    const [Options, setOptions] = useState([])

    useEffect(() => {
        getColors(1, 100, '')
    }, [])

    useEffect(() => {
         const opt = _.map(colors, (data, index) => ({ key: data._id, value: data.colorName }))
        setOptions(opt)

    }, [colors])

    const handleAdd = (color) => {
        addColors({ colorName: color })
    }


    return (<DropdownSearchSelection
        placeholder={placeholder}
        ArrayofObj={Options}
        handleDropDownChanges={handleDropDownChanges}
        dropdownName={dropdownName}
        clearable={clearable}
        value={value}
        allowAdditions= {true}
        handleAdditionChanges={handleAdd}
        disabled={disabled}
        error={error}
        ></DropdownSearchSelection>
    )

}



const mapStateToProps = (state) => ({
    error: state.colors.error,
    colors: state.colors.colors,
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getColors: (page, count, searchText) => dispatch({ type: GET_COLOR_LIST, payload: { page, count, searchText } }),
    addColors: (data) => dispatch({type: ADD_COLOR, payload:data})
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchAndSelectColor);