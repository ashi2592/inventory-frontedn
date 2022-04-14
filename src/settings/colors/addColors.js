import React, { useState } from "react";
import {  Form, Input,  Button, Checkbox, Message, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { ADD_COLOR} from "../../redux/actions";

const AddColor = ({addColor,handleAddColor}) => {

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
        addColor(inputs);
        handleAddColor(false)
    }


    const validate = ()=>{
        
    }

    return (
    
        <Form loading={formload} error={formError} onSubmit={handleSubmit}>
            <Form.Group >
                <Table>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                Color Name
                            </Table.Cell>
                            <Table.Cell>
                                <Form.Field
                                    id="form-input-control-color-name"
                                    control={Input}
                                    placeholder='Enter Color Name'
                                    onChange={handleChange}
                                    name={'colorName'}
                                />
                            </Table.Cell>

                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                Status
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
                            <Table.Cell>
                                <Button type='submit'>Save</Button>
                            </Table.Cell>


                        </Table.Row>
                    </Table.Body>
                </Table>





            </Form.Group>
        </Form>

    )
}


const mapDispatchToProps = (dispatch) =>({
    addColor: (data) => dispatch({type: ADD_COLOR,payload: data})
})


const mapStateToProps = (state)=>({

})

export default connect(mapStateToProps,mapDispatchToProps)(AddColor);