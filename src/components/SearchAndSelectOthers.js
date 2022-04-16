import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import DropdownSearchSelection from "../layout/Dropdown";
import { GET_OTHER_LIST } from "../redux/actions";


const SearchAndSelectOthers = ({ getOthers, others, error, handleDropDownChanges, dropdownName, value = '', placeholder, keyName ,clearable=false}) => {

    const [Options, setOptions] = useState([])

    useEffect(() => {
        getOthers(1, 100, '')
    }, [])

    useEffect(() => {
        const seasonOpt = others.filter(data => data.keyName == keyName)
            .map((data) => ({ key: data._id, value: data.value }))
        setOptions(seasonOpt)
    }, [others])


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
    error: state.others.error,
    others: state.others.others,
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getOthers: (page, count, searchText) => dispatch({ type: GET_OTHER_LIST, payload: { page, count, searchText } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchAndSelectOthers);