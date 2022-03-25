import React, { useState } from "react";
import {  Form, Input,  Button, Checkbox, Message } from "semantic-ui-react";
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
            <Form.Group widths='equal'>
                <Form.Field
                    id="form-input-control-color-name"
                    control={Input}
                    placeholder='Enter color Name'
                    onChange={handleChange}
                    name={'colorName'}
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
    addColor: (data) => dispatch({type: ADD_COLOR,payload: data})
})


const mapStateToProps = (state)=>({

})

export default connect(mapStateToProps,mapDispatchToProps)(AddColor);