import React, { useEffect, useState } from "react";
import { Icon, TableCell, TableRow, Button, Confirm } from "semantic-ui-react";

import _ from "lodash";

import SearchAndSelectColor from "../../components/SearchAndSelectColor";
import SearchAndSelectProductType from "../../components/SearchAndSelectProductType";
import SearchAndSelectSize from "../../components/SearchAndSelectSize";
import SearchAndSelectLength from "../../components/SearchAndSelectLength";
import SearchAndSelectPatterns from "../../components/SearchAndSelectPatterns";
import { connect } from "react-redux";
import { DELETE_VARIANT, GET_VARIANT_LIST, UPDATE_VARIANT } from "../../redux/actions";
import UpdateVariantPageModal from "./updateVariants";
import { Link } from "react-router-dom";

const ProductVariantListPage = ({ productId, variant, updateVariants, deleteVariants }) => {

    let [inputs, setInputs] = useState({});
    let [isChange, setChanges] = useState(false);
    let [dialogState, setdialogState] = useState(false);
    let [openupdateModal, setupdateModal] = useState(false)
    useEffect(() => {
        setInputs(variant)
    }, [variant])


    const handleDropDownChanges = (key, value, text) => {
        setChanges(true)
        let newProduct = { ...inputs };
        setInputs({ ...newProduct, [key]: value })
    }

    const handleDeleteButton = (id) => {
        deleteVariants(id)
    }

    const show = () => setdialogState(true)
    const handleConfirm = () => setdialogState(false)
    const handleCancel = () => setdialogState(false)
    return (
        <TableRow >
            <TableCell>
               {inputs.productColorObj?inputs.productColorObj.colorName:""}

            </TableCell>
            <TableCell>
            {inputs.productTypeObj?inputs.productTypeObj.typeName:""}
            </TableCell>
            <TableCell>
            {inputs.productLengthObj?inputs.productLengthObj.lengthName:""}
            </TableCell>
            <TableCell>
            {inputs.productPatternObj?inputs.productPatternObj.patternName:""}
              
            </TableCell>
            <TableCell>
            {inputs.productSizeObj?inputs.productSizeObj.sizeName:""}
               
            </TableCell>
            <TableCell>
                <Link to={`/purchase/variant/${inputs._id}`}> {inputs.qty}</Link>
            </TableCell>

            <TableCell>
                <Confirm
                    open={dialogState}

                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                />
                <UpdateVariantPageModal open={openupdateModal} variant={inputs} setOpen={setupdateModal}  updateVariants={updateVariants} ></UpdateVariantPageModal>
                 <Icon name="edit" onClick={() => setupdateModal(true)}></Icon>
               <Icon name="trash" onClick={() => show()}></Icon>
            </TableCell>


        </TableRow>
    )
}

const mapStateToProps= (state)=>({})

const mapDispatchToProps = (dispatch) => ({
    updateVariants: (id, data) => dispatch({ type: UPDATE_VARIANT, payload: { id, data } }),
    deleteVariants: (id) => dispatch({ type: DELETE_VARIANT, payload: id }),
  
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductVariantListPage);