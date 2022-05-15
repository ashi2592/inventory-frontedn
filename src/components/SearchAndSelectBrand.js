import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import DropdownSearchSelection from "../layout/Dropdown";
import { ADD_BRAND, GET_BRAND_LIST } from "../redux/actions";


const SearchAndSelectBrand = ({ getBrand, brands,  error=false, handleDropDownChanges, dropdownName, value = '',placeholder, 
clearable=false,addBrand }) => {

    const [Options, setOptions] = useState([])

    useEffect(() => {
        getBrand(1, 100, '')
    }, [])

    useEffect(() => {
         const opt = _.map(brands, (data, index) => ({ key: data._id, value: data.brandName }))

         let opts = {...opt,...{key:'',value:''}}
        setOptions(opt)

    }, [brands])
    const handleAdd = (lengthName)=>{
        addBrand({lengthName })
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
    error: state.category.error,
    brands: state.brands.brands,
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getBrand: (page, count, searchText) => dispatch({ type: GET_BRAND_LIST, payload: { page, count, searchText } }),
    addBrand: (data)=> dispatch({type: ADD_BRAND, payload:data})
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchAndSelectBrand);