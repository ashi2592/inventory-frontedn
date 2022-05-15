import _, { parseInt } from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Card, Container, Divider, Grid, GridColumn, GridRow, Header, Icon, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import AddBarcodes from "../../components/addBarcodes";
import { purchaseProductSchema } from "../../constant/validationSchema";
import { ADD_PURCHASE, ALERT_NOTIFY, GET_BARCODE_LIST, GET_PURCHASE_DETAILS } from "../../redux/actions";

const VariantPurchaseProduct = ({
    alertMessage,
    getPurchase,
    purchase,
    getBarcodes,
    barcodes
}) => {

    const { id } = useParams();
    const [openBarcodeModal, setBarcodeModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({})

    useEffect(() => {
        getPurchase(id)
       
    }, [id])

    const handleAddBarcode = (puc) => {
        setSelectedProduct(puc)
        setBarcodeModal(true);
        getBarcodes(1,1000,id,selectedProduct.variantId,'')
    }



    return (
        <Container>
            <AddBarcodes
                product={selectedProduct}
                purchaseId={id}
                setOpen={setBarcodeModal}
                open={openBarcodeModal}
                barcodes={barcodes}
            ></AddBarcodes>
            <Grid columns={3} stackable>

                <GridColumn>
                    <Header>Purchase Invoice</Header>
                </GridColumn>

                <GridColumn >
                    Supplier: <Header color="red">{purchase.supplierText}</Header>
                </GridColumn>
            </Grid>





            <Card fluid>
                <Card.Content>
                    <Card.Header></Card.Header>
                    <Divider></Divider>
                    <Card.Description>
                        <Table celled striped selectable>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderCell>Product</TableHeaderCell>
                                    <TableHeaderCell>Variants</TableHeaderCell>
                                    <TableHeaderCell>Supplier</TableHeaderCell>
                                    <TableHeaderCell>Mrp</TableHeaderCell>
                                    <TableHeaderCell>Purchase Price</TableHeaderCell>
                                    <TableHeaderCell>Tax</TableHeaderCell>
                                    <TableHeaderCell>Qty</TableHeaderCell>
                                    <TableHeaderCell>Sell Price</TableHeaderCell>
                                    <TableHeaderCell>Total Value</TableHeaderCell>
                                    <TableHeaderCell>Status</TableHeaderCell>
                                    <TableHeaderCell>Action</TableHeaderCell>

                                </TableRow>

                            </TableHeader>
                            <TableBody>
                                {(purchase.products || []).map((product, index) => (
                                    <TableRow>
                                        <TableCell>
                                            {product.productText}

                                        </TableCell>
                                        <TableCell>
                                            {product.variantText}
                                        </TableCell>
                                        <TableCell>{product.mrp}</TableCell>
                                        <TableCell>{product.purchasePrice}</TableCell>
                                        <TableCell>{product.taxAmount}</TableCell>
                                        <TableCell>{product.qty}</TableCell>
                                        <TableCell>{product.sellPrice}</TableCell>
                                        <TableCell>{product.totalAmount}</TableCell>
                                        <TableCell> <Icon name="barcode" onClick={() => handleAddBarcode(product)}></Icon></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card.Description>
                </Card.Content>

            </Card>




        </Container>
    )
}

const mapStateToProps = (state) => ({
    purchase: state.purchases.purchase,
    barcodes: state.barcodes.barcodes
})

const mapDispatchToProps = (dispatch) => ({
    alertMessage: (type, message) => dispatch({ type: ALERT_NOTIFY, payload: { type, message } }),
    getPurchase: (id) => dispatch({ type: GET_PURCHASE_DETAILS, payload: { id } }),
    getBarcodes : (page,count,purchaseId,variantId,productId) =>dispatch({ type: GET_BARCODE_LIST, payload: { page,count,purchaseId,variantId,productId } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(VariantPurchaseProduct)