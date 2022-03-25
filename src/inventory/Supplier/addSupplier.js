import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Message, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { ADD_SUPPLIER } from "../../redux/actions";

const AddSupplier = ({ addSupplier, handleAddSupplier }) => {

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
        addSupplier(inputs);
        handleAddSupplier(false)
    }


    const validate = () => {

    }

    return (

        <Form loading={formload} error={formError} onSubmit={handleSubmit}>
            <Message
                error
                header='Action Forbidden'
                content='You can only sign up for an account once with a given e-mail address.'
            />
            <Form.Group widths='equal'>
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
                                    placeholder='Enter supplier Name'
                                    onChange={handleChange}
                                    name={'supplierName'}
                                />

                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                Supplier Status
                            </Table.Cell>
                            <Table.Cell>
                                <Checkbox
                                    toggle
                                    checked={inputs.status}
                                    label='is Active'
                                    onChange={() => handleCheckbox('status', (inputs.status ? inputs.status : false))}
                                />

                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Button type='submit'>save</Button>
                        </Table.Row>
                    </Table.Body>
                </Table>




            </Form.Group>
        </Form>

    )
}


const mapDispatchToProps = (dispatch) => ({
    addSupplier: (data) => dispatch({ type: ADD_SUPPLIER, payload: data })
})


const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AddSupplier);