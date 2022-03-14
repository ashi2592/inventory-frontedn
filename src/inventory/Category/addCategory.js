import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Message, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { ADD_CATEGORY } from "../../redux/actions";

const AddCategory = ({ addCategory, handleAddCategory }) => {

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
        // alert(JSON.stringify(inputs))
        addCategory(inputs);
        handleAddCategory(false)
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
                                Category Name
                            </Table.Cell>
                            <Table.Cell>
                                <Form.Field
                                    id="form-input-control-category-name"
                                    control={Input}
                                    placeholder='Enter category Name'
                                    onChange={handleChange}
                                    name={'categoryName'}
                                />

                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                Category Status
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
                            <Button type='submit'>Save</Button>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Form.Group>
        </Form>

    )
}


const mapDispatchToProps = (dispatch) => ({
    addCategory: (data) => dispatch({ type: ADD_CATEGORY, payload: data })
})


const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);