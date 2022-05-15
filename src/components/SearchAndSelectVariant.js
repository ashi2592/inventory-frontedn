import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import DropdownSearchSelection from "../layout/Dropdown";
import { GET_VARIANT_LIST } from "../redux/actions";


const SearchAndSelectVariant = ({ getVariants, variants, productId,  error=false, handleDropDownChanges, dropdownName, value = '',placeholder,clearable=true}) => {

    const [Options, setOptions] = useState([])

    useEffect(() => {
        if(productId !== undefined)
        {
            getVariants(productId,1, 100, '')

        }
    }, [productId])

    useEffect(() => {
        const opt = _.map(variants, (data, index) => {
            return (
                {
                    key: data._id,
                    value: `${data.productColorObj ? data.productColorObj.colorName + '/' : ''}${data.productTypeObj ? data.productTypeObj.typeName + '/' : ""}${data.productSizeObj ? data.productSizeObj.sizeName + '/' : ""}${data.productPatternObj ? data.productPatternObj.patternName + '/' : ""}${data.productLengthObj ? data.productLengthObj.lengthName : ""}`
                })
        })
        setOptions(opt)
    }, [variants])


    return (<DropdownSearchSelection
        placeholder={placeholder}
        ArrayofObj={Options}
        handleDropDownChanges={handleDropDownChanges}
        dropdownName={dropdownName}
        value={value}
        clearable={clearable}
        error={error}
        ></DropdownSearchSelection>
    )

}



const mapStateToProps = (state) => ({
    variantloading: state.variants.loading,
    variants: state.variants.variants
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getVariants: (productId, page, count, searchText) => dispatch({ type: GET_VARIANT_LIST, payload: { productId, page, count, searchText } }),

})

export default connect(mapStateToProps, mapDispatchToProps)(SearchAndSelectVariant);