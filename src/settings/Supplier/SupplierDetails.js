import React, { useEffect, useState } from "react";
import { Button, Container, Divider, Form, Grid, GridColumn, GridRow, Header, Icon, Input, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { DELETE_SUPPLIER, GET_SUPPLIER_DETAILS, UPDATE_SUPPLIER } from "../../redux/actions";
import SettingSidebarPage from "../settingSidebar";

const CategoryDetailsPage = ({ supplier, deleteSupplier, updateSupplier, getSupplier }) => {


    const { id } = useParams();
    const history = useHistory()


    const [inputs, setInputs] = useState({})

    useEffect(() => {
        getSupplier(id)
    }, [id])

    useEffect(()=>{
        setInputs(supplier)
    },[supplier])



    const handleDeleteCategory = (id) => {
        deleteSupplier(id)
    }

    const handleChange = (key,value) => {
        setInputs(values => { return { ...values, [key]: value } })
  
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
                                            Supplier Name
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Form.Field
                                                id="form-input-control-supplier-name"
                                                control={Input}
                                                placeholder='Enter Supplier Name'
                                                onChange={handleChange}
                                                name={'supplierName'}
                                                autoFocus={true}
                                                value={inputs.supplierName}
                                            />
                                        </Table.Cell>

                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            Supplier contact
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Form.Field
                                                id="form-input-control-supplier-contact"
                                                control={Input}
                                                placeholder='Enter Supplier Contact'
                                                onChange={handleChange}
                                                name={'contact'}
                                                autoFocus={true}
                                                value={inputs.contact}
                                            />
                                        </Table.Cell>

                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell>
                                            Supplier location
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Form.Field
                                                id="form-input-control-supplier-contact"
                                                control={Input}
                                                placeholder='Enter Supplier location'
                                                onChange={handleChange}
                                                name={'location'}
                                                autoFocus={true}
                                                value={inputs.location}
                                            />
                                        </Table.Cell>

                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell>
                                            Supplier Address
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Form.Field
                                                id="form-input-control-supplier-address"
                                                control={Input}
                                                placeholder='Enter Supplier Address'
                                                onChange={handleChange}
                                                name={'address'}
                                                autoFocus={true}
                                                value={inputs.address}
                                            />
                                        </Table.Cell>

                                    </Table.Row>


                                    <Table.Row>
                                        <Table.Cell colSpan={2} textAlign="right">
                                            <Button type='submit' color="green"> <Icon name="add"></Icon>Create</Button>
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