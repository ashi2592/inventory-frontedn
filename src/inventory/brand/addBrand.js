import React, { useState } from "react";
import {  Form, Input,  Button, Checkbox, Message, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { ADD_BRAND } from "../../redux/actions";

const AddBrand = ({addBrand,handleAddBrand}) => {

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
        addBrand(inputs);
        handleAddBrand(false)
    }


    const validate = ()=>{
        
    }

    return (

        <Form loading={formload} error={formError} onSubmit={handleSubmit}>
            <Form.Group widths='equal'>
            <Table>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                Brand Name
                            </Table.Cell>
                            <Table.Cell>
                                <Form.Field
                                    id="form-input-control-brand-name"
                                    control={Input}
                                    placeholder='Enter brand Name'
                                    onChange={handleChange}
                                    name={'brandName'}
                                />

                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                            Brand Status
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


const mapDispatchToProps = (dispatch) =>({
    addBrand: (data) => dispatch({type: ADD_BRAND,payload: data})
})


const mapStateToProps = (state)=>({

})

export default connect(mapStateToProps,mapDispatchToProps)(AddBrand);