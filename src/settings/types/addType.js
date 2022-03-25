import React, { useState } from "react";
import {  Form, Input,  Button, Checkbox, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { ADD_TYPE } from "../../redux/actions";

const AddType = ({addType,handleAddType}) => {

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
        addType(inputs);
        handleAddType(false)
    }


    const validate = ()=>{
        
    }

    return (

        <Form loading={formload} error={formError} onSubmit={handleSubmit}>
            <Form.Group widths='equal'>
                <Form.Field
                    id="form-input-control-typeName-name"
                    control={Input}
                    placeholder='Enter type Name'
                    onChange={handleChange}
                    name={'typeName'}
                />

                <Checkbox
                    toggle
                    checked={inputs.status}
                    label='is Active'
                    onChange={() => handleCheckbox('status', (inputs.status ? inputs.status : false))}
                />

                <Button type='submit'>save</Button>
            </Form.Group>
        </Form>

    )
}


const mapDispatchToProps = (dispatch) =>({
    addType: (data) => dispatch({type: ADD_TYPE,payload: data})
})


const mapStateToProps = (state)=>({

})

export default connect(mapStateToProps,mapDispatchToProps)(AddType);