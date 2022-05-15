import React, { useState } from "react";
import { Form, Input, Button, Checkbox,  Table, Header, Grid, GridRow, GridColumn, Icon, Container } from "semantic-ui-react";
import { connect } from "react-redux";
import { ALERT_NOTIFY, ADD_PATTERN} from "../../redux/actions";
import SettingSidebarPage from "../settingSidebar";
import { useHistory } from "react-router-dom";

const AddPatternPage = ({ add, alertMessage }) => {

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
            history.push('/pattern')

        }, 300);

    }

    const handleAdd = () => {
        history.push('/pattern')
    }


    return (<Container>
        <Header textAlign="left">Product Size</Header>


        <Grid>
            <GridRow columns={2}>
                <GridColumn>
                    <SettingSidebarPage activeItem={'pattern'}></SettingSidebarPage>
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
                                            Pattern Name
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Form.Field
                                                id="form-input-control-size-name"
                                                control={Input}
                                                placeholder='Enter Pattern Name'
                                                onChange={handleChange}
                                                name={'patternName'}
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
    add: (data) => dispatch({ type: ADD_PATTERN, payload: data }),
    alertMessage: (type, message) => dispatch({ type: ALERT_NOTIFY, payload: { type, message } }),

})


const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AddPatternPage);