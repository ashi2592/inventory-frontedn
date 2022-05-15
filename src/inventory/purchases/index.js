import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Button, Grid, GridColumn, GridRow, Header, Icon, Table, TableBody, TableHeader, TableHeaderCell, TableRow, TableCell } from "semantic-ui-react";
import AddBarcodes from "../../components/addBarcodes";
import SearchAndSelectSupplier from "../../components/SearchAndSelectSupplier";
import { dateFormat } from "../../constant/global";
import { GET_PURCHASE_LIST } from "../../redux/actions";
const PurchasePage = ({ getPurchase, purchases }) => {

   
    const history = useHistory();
    const handleAdd = () => {
        history.push('add')
    }
    useEffect(() => {
        getPurchase(1, 100, '')
    }, [])
    useEffect(() => {
        console.log(purchases)
    }, [purchases])
    const handleViewpurhase = (id) =>{
        history.push(`/purchase/${id}`)
    }
   

    return (<Container>

      

        <Grid columns={2} stackable>
            <GridRow >
                <GridColumn>
                    <Header>Purchases</Header>
                </GridColumn>

                <GridColumn textAlign="right">

                    <Button size="small" color="green" onClick={() => handleAdd()}> <Icon name="plus"></Icon> Create New Order</Button>
                </GridColumn>

            </GridRow>
        </Grid>
        <Table celled striped selectable>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>Supplier</TableHeaderCell>
                    <TableHeaderCell>Total Amount</TableHeaderCell>
                    <TableHeaderCell>Tax</TableHeaderCell>
                    <TableHeaderCell>Delivery</TableHeaderCell>
                    <TableHeaderCell>Qty</TableHeaderCell>
                    <TableHeaderCell>Date</TableHeaderCell>
                    <TableHeaderCell>Action</TableHeaderCell>
                </TableRow>

            </TableHeader>
            <TableBody>
                {purchases.map((pur, index) => (
                    <TableRow>
                        <TableCell>{pur.supplierText} </TableCell>
                        <TableCell> {pur.totalAmount} </TableCell>
                        <TableCell>{pur.taxAmount}</TableCell>
                        <TableCell>{pur.delivery ? pur.delivery : 0}</TableCell>
                   
                        <TableCell>{pur.totalQty}</TableCell>
                        <TableCell>{dateFormat(pur.createdAt)}</TableCell>
                        <TableCell>
                            <Icon name="eye" onClick={()=> handleViewpurhase(pur._id)}></Icon>
                           
                        </TableCell>

                    </TableRow>
                ))}

            </TableBody>
        </Table>

    </Container>)
}
const mapDispatchToProps = (dispatch) => ({
    getPurchase: (page, count, searchText) => dispatch({ type: GET_PURCHASE_LIST, payload: { page, count, searchText } })
})
const mapStateToProps = (state) => ({
    purchases: state.purchases.purchases
})
export default connect(mapStateToProps, mapDispatchToProps)(PurchasePage)