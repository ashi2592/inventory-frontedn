import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Message, Modal } from 'semantic-ui-react'
import SearchAndSelectColor from '../../components/SearchAndSelectColor'
import SearchAndSelectLength from '../../components/SearchAndSelectLength';
import SearchAndSelectPatterns from '../../components/SearchAndSelectPatterns';
import SearchAndSelectProductType from '../../components/SearchAndSelectProductType';
import SearchAndSelectSize from '../../components/SearchAndSelectSize';
import { variantSchema } from '../../constant/validationSchema';


let validtionOptions = {
    strict: false,
    abortEarly: true,
    stripUnknown: false,
    recursive: true
}

function CreateVariantPageModal({ open = false, setOpen, productId, addVariant, alertMessage,handleUpdateList }) {

    let [inputs, setInputs] = useState({
        productPattern: '',
        productSize: '',
        productType: '',
        productLength: '',
        productColor: '',

    });
    let [formError, setFormError] = useState(false);
    let [errorText, setErrorText] = useState('');


    useEffect(() => {
        console.log(inputs)
    }, [inputs])


    const handleChange = (event) => {
        event.preventDefault()
        let name = event.target.name;
        let value = event.target.value;
         setInputs(values => { return { ...values, [name]: value } });

    }

    const handleDropDownChanges = (key, value, text) => {
        let newProduct = { ...inputs };
        setInputs({ ...newProduct, [key]: value })
    }

    const handleSubmit = () => {
        variantSchema.validate(inputs, validtionOptions).then((res) => {
            let inputs = { ...res, 'productId': productId }
            // console.log(inputs)
            addVariant(inputs)
            handleUpdateList()
            setOpen(false)
            setFormError(false)
        })

            .catch(function (err) {
                setErrorText(err.name + "=>" + err.errors)
                setFormError(true)
            });

    }

    const handleClose = () => {
        setOpen(false)
    }


    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            dimmer='blurring'
        >
            <Modal.Header>Add Product Variants</Modal.Header>
            <Modal.Content image>
                <Modal.Description>

                    <Form error={formError}>



                        <Form.Group widths='equal'>
                            <Form.Field >

                                <label>Product Color</label>
                                <SearchAndSelectColor
                                    placeholder={'Product Color'}
                                    handleDropDownChanges={handleDropDownChanges}
                                    dropdownName={'productColor'}
                                    value={inputs.productColor}
                                    clearable={true}
                                ></SearchAndSelectColor>
                            </Form.Field>
                            <Form.Field>
                                <label>Product Type</label>
                                <SearchAndSelectProductType
                                    placeholder={'Product Type'}
                                    handleDropDownChanges={handleDropDownChanges}
                                    dropdownName={'productType'}
                                    value={inputs.productType}
                                    clearable={true}
                                ></SearchAndSelectProductType>
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Product Length</label>
                                <SearchAndSelectLength
                                    placeholder={'Product Length'}
                                    handleDropDownChanges={handleDropDownChanges}
                                    dropdownName={'productLength'}
                                    value={inputs.productLength}
                                    clearable={true}
                                ></SearchAndSelectLength>
                            </Form.Field>
                            <Form.Field>
                                <label>Product Pattern</label>
                                <SearchAndSelectPatterns
                                    placeholder={'Product Pattern'}
                                    handleDropDownChanges={handleDropDownChanges}
                                    dropdownName={'productPattern'}
                                    value={inputs.productPattern}
                                    clearable={true}
                                ></SearchAndSelectPatterns>
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Product Size</label>
                                <SearchAndSelectSize
                                    placeholder={'Product Size'}
                                    handleDropDownChanges={handleDropDownChanges}
                                    dropdownName={'productSize'}
                                    value={inputs.productSize}
                                    clearable={true}
                                ></SearchAndSelectSize>
                            </Form.Field>
                            <Form.Field>
                                <label>Article No</label>
                                <Input

                                    placeholder='Enter Article No'
                                    name={'articleNo'}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Field>
                        </Form.Group>
                    </Form>

                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => handleClose()}>
                    Nope
                </Button>
                <Button
                    content="Yep, Correct"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => handleSubmit()}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default CreateVariantPageModal
