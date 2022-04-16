import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import DropdownSearchSelection from "../layout/Dropdown";
import { GET_CATEGORY_LIST } from "../redux/actions";


const SearchAndSelectCateory = ({ getCategories, categories, error, handleDropDownChanges, dropdownName, value = '',   clearable=true }) => {

    const [categoriesOptions, setCategoriesOptions] = useState([])

    useEffect(() => {
        getCategories(1, 100, '')
    }, [])

    useEffect(() => {
        // getCategories()

        const categoryOpt = _.map(categories, (data, index) => ({ key: data._id, value: data.categoryName }))
        setCategoriesOptions(categoryOpt)

    }, [categories])

    return (<DropdownSearchSelection
        placeholder={'Category'}
        ArrayofObj={categoriesOptions}
        handleDropDownChanges={handleDropDownChanges}
        dropdownName={dropdownName}
        clearable={clearable}
        value={value}></DropdownSearchSelection>
    )

}



const mapStateToProps = (state) => ({
    error: state.category.error,
    categories: state.category.categories,
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getCategories: (page, count, searchText) => dispatch({ type: GET_CATEGORY_LIST, payload: { page, count, searchText } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchAndSelectCateory);