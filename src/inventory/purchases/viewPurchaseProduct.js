import _, { parseInt } from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Card, Container, Divider, Grid, GridColumn, GridRow, Header, Icon, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import AddBarcodes from "../../components/addBarcodes";
import UpdateSellingPrice from "../../components/UpdateSellingPrice";
import { ADD_PURCHASE, ALERT_NOTIFY, GET_BARCODE_LIST, GET_PURCHASE_DETAILS } from "../../redux/actions";

const ViewPuchasepage = ({
    alertMessage,
    getPurchase,
    purchase,
    getBarcodes,
    barcodes
}) => {

    const { id } = useParams();
    const [openBarcodeModal, setBarcodeModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({})
    const [openPriceModal, setOpenPriceModal] = useState(false);

    useEffect(() => {
        getPurchase(id)
       
    }, [id])

    const handleAddBarcode = (puc) => {
        setSelectedProduct(puc)
        setBarcodeModal(true);
    }

    useEffect(()=>{
        getBarcodes(1, 1000, selectedProduct.purchaseId, selectedProduct.variantId, '')
    },[selectedProduct])

    const handleViewSellPrice = (puc) => {
        setSelectedProduct(puc)
        setOpenPriceModal(true);
    }


    return (
        <Container fluid>
                 <Header>Purchase Invoice</Header>

            <AddBarcodes
                setOpen={setBarcodeModal}
                open={openBarcodeModal}
                barcodes={barcodes}
                variantId={selectedProduct.variantId}
                productId={selectedProduct.productId}
                purchaseProductId={selectedProduct._id}
                purchaseId={id}
                qty={selectedProduct.qty}
                articleNo={selectedProduct.articleNo}
             
            ></AddBarcodes>

            <UpdateSellingPrice
            open={openPriceModal}
            setOpen={setOpenPriceModal}
            purchaseProductId={selectedProduct._id}
            sellPrice={selectedProduct.sellPrice}
            >

            </UpdateSellingPrice>
            <Grid columns={1}>
                <GridColumn >
                    Supplier: <Header color="red">{purchase.supplierText}</Header>
                </GridColumn>
            </Grid>





            <Card fluid>
                <Card.Content>
                  
                    <Grid columns={5} stackable stretched>
                        <GridColumn>
                            Total Qty : <Header color="red">{purchase.totalQty}</Header>
                        </GridColumn>
                        <GridColumn>
                            Total Amount : <Header color="red">{purchase.totalAmount - purchase.taxAmount} </Header>
                        </GridColumn>
                        <GridColumn>
                            Tax : <Header color="red">{purchase.taxAmount}</Header>
                        </GridColumn>

                        <GridColumn>
                            Delivery: <Header color="red">{purchase.delivery || 0}</Header>
                        </GridColumn>
                        <GridColumn>
                            Final Amount : <Header color="red">{parseInt(purchase.totalAmount) + parseInt(purchase.delivery || 0)}</Header>
                        </GridColumn>
                    </Grid>

                    <Card.Description>
                        <Table celled striped selectable>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderCell>Product</TableHeaderCell>
                                    <TableHeaderCell>Variants</TableHeaderCell>
                                    <TableHeaderCell>Mrp</TableHeaderCell>
                                    <TableHeaderCell>Purchase Price</TableHeaderCell>
                                    <TableHeaderCell>Tax</TableHeaderCell>
                                    <TableHeaderCell>Qty</TableHeaderCell>
                                    <TableHeaderCell>Sell Price</TableHeaderCell>
                                    <TableHeaderCell>Total Value</TableHeaderCell>
                                    <TableHeaderCell>Action</TableHeaderCell>
                                    

                                </TableRow>

                            </TableHeader>
                            <TableBody>
                                {(purchase.products || []).map((product, index) => (
                                    <TableRow key={`purchase-product-${index}`}>
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
                                        <TableCell onClick={()=>handleViewSellPrice(product)}> {product.sellPrice}</TableCell>
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewPuchasepage)