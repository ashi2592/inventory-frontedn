import _, { parseInt } from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Card, Container, Divider, Grid, GridColumn, GridRow, Header, Icon, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import TranscationViewSteps from "../../components/TranscationViewSteps";
import PaginationCompact from "../../layout/pagination";
import {  ALERT_NOTIFY, GET_BARCODE_LIST, VARIANT_SELL } from "../../redux/actions";

const VariantTranscationProduct = ({
    sells,
    getSellTranscation,
    sellpagination
}) => {

    const { id } = useParams();
    const [activePage, SetActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [ellipsisItem, setEllipsisItem] = useState(null);

    const handlePaginationChange = (e, { activePage }) => {
        // getProducts(activePage, 10, searchText)
        getSellTranscation(id, activePage, 10)
    }

    useEffect(() => {

        getSellTranscation(id, 1, 10)

    }, [id])


    useEffect(() => {
        console.log(sells)
        let ellipsis = sellpagination.totalPages > 10 ? undefined : null;
        // let activePage = 1
        setEllipsisItem(ellipsis)
        setTotalPages(sellpagination.totalPages)
        SetActivePage(sellpagination.currentPage)

    }, [sells, sellpagination])



    return (
        <Container fluid>
              <Header>Variant Wise Purchase</Header>
            <Grid columns={2} stackable>
                <GridColumn>
                  
                </GridColumn>

                <GridColumn textAlign="right" >
                    <TranscationViewSteps
                    variantId={id}
                    page='sell'
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
                                    <TableHeaderCell>Customer</TableHeaderCell>
                                    <TableHeaderCell>Mrp</TableHeaderCell>
                                    <TableHeaderCell>Sell Price</TableHeaderCell>
                                 
                                    <TableHeaderCell>Qty</TableHeaderCell>
                                   
                                </TableRow>

                            </TableHeader>
                            <TableBody>
                                {(sells || []).map((s, index) => (
                                    <TableRow key={`product-sells-purchase${s._id}`}>
                                        <TableCell>
                                            {s.products.productText}

                                        </TableCell>
                                        <TableCell>
                                            {s.products.variantText}
                                        </TableCell>
                                        <TableCell>
                                        {s.customer.mobile}
                                        </TableCell>

                                        <TableCell>{s.products.mrp}</TableCell>
                                        <TableCell>{s.products.sellPrice}</TableCell>
                                                                               <TableCell>{s.products.productQty}</TableCell>                                     
                                     
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
    sells: state.variants.sells,
    sellpagination: state.variants.sellpagination
})

const mapDispatchToProps = (dispatch) => ({
    alertMessage: (type, message) => dispatch({ type: ALERT_NOTIFY, payload: { type, message } }),
    getSellTranscation: (id, page, count) => dispatch({ type: VARIANT_SELL, payload: { id, page, count } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(VariantTranscationProduct)