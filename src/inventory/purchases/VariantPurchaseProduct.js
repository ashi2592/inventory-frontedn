import _, { parseInt } from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Card, Container, Divider, Grid, GridColumn, GridRow, Header, Icon, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import AddBarcodes from "../../components/addBarcodes";
import TranscationViewSteps from "../../components/TranscationViewSteps";
import { purchaseProductSchema } from "../../constant/validationSchema";
import PaginationCompact from "../../layout/pagination";
import { ALERT_NOTIFY, GET_BARCODE_LIST, VARIANT_PURCHASE } from "../../redux/actions";

const VariantPurchaseProduct = ({
    alertMessage,
    getBarcodes,
    barcodes,
    purchases,
    getPurchaseTranscation,
    purchasepagination
}) => {

    const { id } = useParams();
    const [openBarcodeModal, setBarcodeModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({})
    const [activePage, SetActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [ellipsisItem, setEllipsisItem] = useState(null);

    const handlePaginationChange = (e, { activePage }) => {
        // getProducts(activePage, 10, searchText)
        getPurchaseTranscation(id, activePage, 10)
    }

    useEffect(() => {
        getPurchaseTranscation(id, activePage, 10)

    }, [id])

    const handleAddBarcode = (puc) => {
        setSelectedProduct(puc)
        setBarcodeModal(true);
        // 
    }


    useEffect(()=>{
        getBarcodes(1, 1000, selectedProduct.purchaseId, selectedProduct.variantId, '')
    },[selectedProduct])


    useEffect(() => {
        let ellipsis = purchasepagination.totalPages > 10 ? undefined : null;
        // let activePage = 1
        setEllipsisItem(ellipsis)
        setTotalPages(purchasepagination.totalPages)
        SetActivePage(purchasepagination.currentPage)
      
    }, [purchases, purchasepagination])



    return (
        <Container fluid>

            <Header>Variant Wise Purchase</Header>
            <AddBarcodes
                setOpen={setBarcodeModal}
                open={openBarcodeModal}
                barcodes={barcodes}
                variantId={id}
                productId={selectedProduct.productId}
                purchaseProductId={selectedProduct._id}
                purchaseId={selectedProduct.purchaseId}
                qty={selectedProduct.qty}
                articleNo={selectedProduct.articleNo}

            ></AddBarcodes>
            <Grid columns={2} stackable>

                <GridColumn>

                </GridColumn>

                <GridColumn textAlign="right" >
                    {/* Supplier: <Header color="red">{purchases.supplierText}</Header> */}
                    <TranscationViewSteps
                        variantId={id}
                        page='purchase'
                    ></TranscationViewSteps>
                </GridColumn>
            </Grid>

            <Card fluid>
                <Card.Content>
                    <Card.Header></Card.Header>
                  
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
                                    <TableHeaderCell>Action</TableHeaderCell>

                                </TableRow>

                            </TableHeader>
                            <TableBody>
                                {(purchases || []).map((pro, index) => (
                                    <TableRow key={`variant-purchase${pro._id}`}>
                                        <TableCell>
                                            {pro.productText}

                                        </TableCell>
                                        <TableCell>
                                            {pro.variantText}
                                        </TableCell>
                                        <TableCell>
                                            {pro.purchases.supplier.supplierName}
                                        </TableCell>

                                        <TableCell>{pro.mrp}</TableCell>
                                        <TableCell>{pro.purchasePrice}</TableCell>
                                        <TableCell>{pro.taxAmount}</TableCell>
                                        <TableCell>{pro.qty}</TableCell>
                                        <TableCell>{pro.sellPrice}</TableCell>
                                        <TableCell>{pro.totalAmount}</TableCell>
                                        <TableCell> <Icon name="barcode" onClick={() => handleAddBarcode(pro)}></Icon></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <PaginationCompact
                            activePage={activePage}
                            totalPages={totalPages}
                            ellipsisItem={ellipsisItem}
                            handlePaginationChange={handlePaginationChange}
                        ></PaginationCompact>

                    </Card.Description>
                </Card.Content>

            </Card>




        </Container>
    )
}

const mapStateToProps = (state) => ({
    purchases: state.variants.purchases,
    barcodes: state.barcodes.barcodes,
    purchasepagination: state.variants.purchasepagination
})

const mapDispatchToProps = (dispatch) => ({
    alertMessage: (type, message) => dispatch({ type: ALERT_NOTIFY, payload: { type, message } }),
    getPurchaseTranscation: (id, page, count) => dispatch({ type: VARIANT_PURCHASE, payload: { id, page, count } }),
    getBarcodes: (page, count, purchaseId, variantId, productId) => dispatch({ type: GET_BARCODE_LIST, payload: { page, count, purchaseId, variantId, productId } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(VariantPurchaseProduct)