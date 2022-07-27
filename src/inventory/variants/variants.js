import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Container, Divider, Grid, GridColumn, GridRow, Header, Icon, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, } from "semantic-ui-react";
import { connect } from "react-redux";
import _ from "lodash";
import { ADD_VARIANT, ALERT_NOTIFY, GET_VARIANT_LIST } from "../../redux/actions";
import ProductVariantListPage from "./variantList";
import TableNoRecordFound from "../../components/TableNoRecordFound";
import CreateVariantPageModal from "./addVariants";
import { useParams } from "react-router-dom";
import Productviewsteps from "../Products/Productviewsteps";
import { useHistory } from "react-router-dom";

const ProductVariantPage = ({ alertMessage, addVariant, getVariants, variants, loading }) => {

    const history = useHistory()
    const { id } = useParams()
    let [inputs, setInputs] = useState({});
    let [openVarintModel, setVariantModel] = useState(false);
    const [open, setOpen] = React.useState(false);


    useEffect(() => {
        getVariants(id, 1, 100, '')
    }, [id])

    useEffect(() => {
        console.log(inputs)
    }, [inputs])

    const handleDropDownChanges = (key, value) => {
        let newProduct = { ...inputs };
        setInputs({ ...newProduct, [key]: value })
    }

    const handleAddVariant = () => {
        setOpen(true)
    }

    const handleNavigateList = () => {
        history.push('/product')
    }
    const handleUpdateList =() =>{
        getVariants(id, 1, 100, '')
    } 



    return (
        (<Container fluid>


            <Grid columns={2} stackable>
                <GridRow>
                    <GridColumn largeScreen={8} mobile={6} >
                        <Productviewsteps productId={id} page='variant'></Productviewsteps>
                    </GridColumn>
                    <GridColumn largeScreen={8} mobile={6} textAlign="right">
                        <Button color='blue' onClick={() => { handleNavigateList() }}> <Icon name="arrow left"></Icon> Back</Button>
                        <Button color="blue" onClick={handleAddVariant}><Icon name="plus"></Icon>Add New Variants</Button>
                    </GridColumn>
                </GridRow>
            </Grid>


            <Card fluid>
                <Card.Content>
                    <Card.Description>
                        <Table selectable singleLine celled>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderCell>Article No</TableHeaderCell>
                                    <TableHeaderCell>Product color</TableHeaderCell>
                                    <TableHeaderCell>Product Type</TableHeaderCell>
                                    <TableHeaderCell>Product Length</TableHeaderCell>
                                    <TableHeaderCell>Product Pattern</TableHeaderCell>
                                    <TableHeaderCell>Product Size</TableHeaderCell>
                                    <TableHeaderCell>Qty</TableHeaderCell>
                                    <TableHeaderCell>Action</TableHeaderCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {/* {loading && <TableLoaderPage colSpan={"3"}></TableLoaderPage>} */}
                                {(loading === false && variants.length === 0) && (<TableNoRecordFound></TableNoRecordFound>)}
                                {(variants || []).map(x => (<ProductVariantListPage
                                    variant={x}
                                    productId={id}

                                ></ProductVariantListPage>))}
                            </TableBody>
                        </Table>
                    </Card.Description>
                </Card.Content>
            </Card>
            <CreateVariantPageModal open={open} setOpen={setOpen} productId={id} addVariant={addVariant} handleUpdateList={handleUpdateList} alertMessage={alertMessage}></CreateVariantPageModal>
        </Container>)
    )
}


const mapStateToProps = (state) => ({
    error: state.variants.error,
    loading: state.variants.loading,
    variants: state.variants.variants
})
const mapDispatchToProps = (dispatch) => ({
    alertMessage: (type, message) => dispatch({ type: ALERT_NOTIFY, payload: { type, message } }),
    getVariants: (productId, page, count, searchText) => dispatch({ type: GET_VARIANT_LIST, payload: { productId, page, count, searchText } }),
    addVariant: (data) => dispatch({ type: ADD_VARIANT, payload: data }),

})

export default connect(mapStateToProps, mapDispatchToProps)(ProductVariantPage);