import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Message, Table, Header, Grid, GridRow, GridColumn, Icon, Container } from "semantic-ui-react";
import { connect } from "react-redux";
import { ADD_SUPPLIER, ALERT_NOTIFY } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import SettingSidebarPage from "../settingSidebar";

const AddSupplierPage = ({ add, alertMessage }) => {

    const history = useHistory()
    const [formload, setFormLoad] = useState(false);
    const [formError, setFormError] = useState(false);
    const [inputs, setInputs] = useState({})

    const handleChange = (event) => {
        event.preventDefault()
        let name = event.target.name;
        let value = event.target.value;
        setInputs(values => { return { ...values, [name]: value } });
    }

    const handleCheckbox = (name, value) => {
        setInputs(values => { return { ...values, [name]: !value } });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        add(inputs);
        setTimeout(() => {
            alertMessage('success', `Add successfully`)
            history.push('/supplier')

        }, 300);

    }

    const handleAdd = () => {
        history.push('/supplier')
    }


    return (<Container>
        <Header textAlign="left">Supplier</Header>


        <Grid>
            <GridRow columns={2}>
                <GridColumn>
                    <SettingSidebarPage activeItem={'supplier'}></SettingSidebarPage>
                </GridColumn>
                <GridColumn textAlign="right">

                    <Button color="orange" onClick={handleAdd}><Icon name="left arrow"></Icon> Back to Listing</Button>
                </GridColumn>
            </GridRow>
        </Grid>
        <Grid>
            <GridRow columns={1}>
                <GridColumn>
                    <Form loading={formload} error={formError} onSubmit={handleSubmit}>
                        <Form.Group >
                            <Table>
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
                        </Form.Group>
                    </Form>
                </GridColumn>
            </GridRow>
        </Grid>


    </Container>
    )
}


const mapDispatchToProps = (dispatch) => ({
    add: (data) => dispatch({ type: ADD_SUPPLIER, payload: data }),
    alertMessage: (type, message) => dispatch({ type: ALERT_NOTIFY, payload: { type, message } }),

})


const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AddSupplierPage);