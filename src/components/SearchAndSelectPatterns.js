import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import DropdownSearchSelection from "../layout/Dropdown";
import { ADD_PATTERN, GET_PATTERN_LIST } from "../redux/actions";


const SearchAndSelectPatterns = ({ getPatterns, patterns,  error=false, handleDropDownChanges, dropdownName, value = '',placeholder, clearable=false,addPattern }) => {

    const [Options, setOptions] = useState([])

    useEffect(() => {
        getPatterns(1, 100, '')
    }, [])

    useEffect(() => {
         const opt = _.map(patterns, (data, index) => ({ key: data._id, value: data.patternName }))

         let opts = {...opt,...{key:'',value:''}}
        setOptions(opt)

    }, [patterns])
    const handleAdd = (lengthName)=>{
        addPattern({lengthName })
    }

    return (<DropdownSearchSelection
        placeholder={placeholder}
        ArrayofObj={Options}
        handleDropDownChanges={handleDropDownChanges}
        dropdownName={dropdownName}
        clearable={clearable}
        value={value}
        error={error}
        handleAdditionChanges={handleAdd}
        ></DropdownSearchSelection>
    )

}



const mapStateToProps = (state) => ({
    error: state.category.error,
    patterns: state.patterns.patterns,
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getPatterns: (page, count, searchText) => dispatch({ type: GET_PATTERN_LIST, payload: { page, count, searchText } }),
    addPattern: (data)=> dispatch({type: ADD_PATTERN, payload:data})
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchAndSelectPatterns);