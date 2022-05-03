
import React, { useState } from "react";
import { Form, Input, Button, Table, Header, Grid, GridRow, GridColumn, Icon, Container } from "semantic-ui-react";
import { connect } from "react-redux";
import {  ADD_OTHER, ALERT_NOTIFY } from "../../redux/actions";
import SettingSidebarPage from "../settingSidebar";
import { useHistory } from "react-router-dom";

const AddOtherPage = ({ add, alertMessage }) => {

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
            history.push('/colors')

        }, 300);

    }

    const handleAdd = () => {
        history.push('/colors/add')
    }


    return (<Container>
        <Header textAlign="left">Others</Header>


        <Grid>
            <GridRow columns={2}>
                <GridColumn>
                    <SettingSidebarPage activeItem={'others'}></SettingSidebarPage>
                </GridColumn>
                <GridColumn textAlign="right">

                    <Button color="green" onClick={handleAdd}><Icon name="plus"></Icon> Add Others</Button>
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
                                Key Name
                            </Table.Cell>
                            <Table.Cell>
                                <Form.Field
                                    id="form-input-control-size-name"
                                    control={Input}
                                    placeholder='Enter Key Name'
                                    onChange={handleChange}
                                    name={'keyName'}
                                />
                            </Table.Cell>

                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                Value
                            </Table.Cell>
                            <Table.Cell>
                                <Form.Field
                                    id="form-input-control-size-name"
                                    control={Input}
                                    placeholder='Enter value'
                                    onChange={handleChange}
                                    name={'value'}
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
    add: (data) => dispatch({ type: ADD_OTHER, payload: data }),
    alertMessage: (type, message) => dispatch({ type: ALERT_NOTIFY, payload: { type, message } }),

})


const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AddOtherPage);