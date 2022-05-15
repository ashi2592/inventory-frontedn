import React, { useEffect } from "react";
import { Button, Container, Divider, Grid, GridColumn, GridRow, Header, Icon, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { DELETE_SUPPLIER, GET_SUPPLIER_DETAILS, UPDATE_SUPPLIER } from "../../redux/actions";
import SettingSidebarPage from "../settingSidebar";

const CategoryDetailsPage = ({ supplier, deleteSupplier, updateSupplier, getSupplier }) => {


    const { id } = useParams();
    const history = useHistory()



    useEffect(() => {
        getSupplier(id)
    }, [id])

    const handleDeleteCategory = (id) => {
        deleteSupplier(id)
    }

    const handleUpdateFunction = (id, key, value) => {
        updateSupplier(id, { ...supplier, [key]: value })
    }


    const handleBack = () => {
        history.push(`/supplier`)
    }
    const handleAddBrand = () => {

        history.push('/supplier/add')
    }

    return (
        <Container>
            <Header>Supplier</Header>
            <Grid>
                <GridRow columns={2}>
                    <GridColumn>
                        <SettingSidebarPage activeItem={'supplier'}></SettingSidebarPage>
                    </GridColumn>
                    <GridColumn textAlign="right">
                        <Button color="orange" onClick={handleBack}><Icon name="left arrow"></Icon> Back to Listing</Button>
                        <Button color="green" onClick={handleAddBrand}><Icon name="plus"></Icon> Add Supplier</Button>
                        <Button color='red' onClick={() => { handleDeleteCategory(supplier._id) }}> <Icon name="close"></Icon> Delete Supplier</Button>
                    </GridColumn>
                </GridRow>
            </Grid>
            <Divider></Divider>
            <Grid>
                <GridRow>
                    <GridColumn>
                        <Table>
                            <Table.Header>
                                <Table.Row >
                                    <Table.HeaderCell>{supplier.supplierName}</Table.HeaderCell>
                                    {/* <Table.HeaderCell collapsing={3} textAlign="right"></Table.HeaderCell> */}
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        Supplier ID
                                    </Table.Cell>
                                    <Table.Cell>
                                        {supplier._id}
                                    </Table.Cell>

                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        Supplier Name
                                    </Table.Cell>
                                    <Table.Cell>
                                        {supplier.supplierName}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Icon name="edit" onClick={{}}></Icon>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        Supplier Contact
                                    </Table.Cell>
                                    <Table.Cell>
                                        {supplier.contact}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Icon name="edit" onClick={{}}></Icon>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        Supplier location
                                    </Table.Cell>
                                    <Table.Cell>
                                        {supplier.location}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Icon name="edit" onClick={{}}></Icon>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        Supplier address
                                    </Table.Cell>
                                    <Table.Cell>
                                        {supplier.address}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Icon name="edit" onClick={{}}></Icon>
                                    </Table.Cell>
                                </Table.Row>
                                

                            </Table.Body>

                        </Table>
                    </GridColumn>

                </GridRow>
            </Grid>
        </Container>

    )
}



const mapStateToProps = (state) => ({
    supplier: state.suppliers.supplier
})
const mapDispatchToProps = (dispatch) => ({
    deleteSupplier: (id) => dispatch({ type: DELETE_SUPPLIER, payload: id }),
    updateSupplier: (id, data) => dispatch({ type: UPDATE_SUPPLIER, payload: { id, data } }),
    getSupplier: (id) => dispatch({ type: GET_SUPPLIER_DETAILS, payload: { id } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetailsPage);