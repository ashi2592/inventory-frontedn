import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Card, Modal, Divider, Dropdown, Form, Grid, GridColumn, GridRow, Header, Icon, Input, Segment, Table, TableBody, TableHeader, TableHeaderCell, TableRow, ModalHeader } from "semantic-ui-react";
import SearchAndSelectProduct from "../../components/SearchAndSelectProduct";
import SearchAndSelectVariant from "../../components/SearchAndSelectVariant";
import { AddPurchaseProductSchema, validtionOptions } from "../../constant/validationSchema";
import { ALERT_NOTIFY } from "../../redux/actions";
const AddPurchaseProductpage = ({
    alertMessage,
    setProducts,
    products,
    setInputs,
    inputs,
    setOpenAddModal,
    setPrices,
    prices,
    openAddModel

}) => {
    const [formload, setFormLoad] = useState(false);
    const [formError, setFormError] = useState(false);


    const handleSubmit = () => {

        AddPurchaseProductSchema.validate({ ...inputs, ...prices }, validtionOptions).then((res) => {
            setProducts([...products, res])
            setOpenAddModal(false)
        })
            .catch(function (err) {
                alertMessage('error', err.message)
            });
    }

    useEffect(() => {
        console.log(products)
    }, [products])


    useEffect(() => {
        if (Object.keys(inputs).length) {
            let totalAmount = calculateTotalValue(inputs.purchasePrice, inputs.tax, inputs.qty)
            let singleItem = calculateTotalValue(inputs.purchasePrice, inputs.tax, 1)
            let taxAmount = calculateTotalTax(inputs.purchasePrice, inputs.tax, inputs.qty)
            setPrices(values => { return { ...values, ['totalAmount']: totalAmount, ['taxAmount']: taxAmount, ['singleItem']: singleItem } });

        } else {
            setPrices({})
        }
    }, [inputs])

    const handleChange = (event) => {
        event.preventDefault()
        let name = event.target.name;
        let value = event.target.value;
        setInputs(values => { return { ...values, [name]: value, } });

    }


    const calculateTotalValue = (amount, tax, qty) => {

        let totalQty = qty ? parseInt(qty) : 0;
        let purchasePrice = amount ? parseInt(amount) : 0;
        let purchaseTax = tax ? parseInt(tax) : 0;
        let taxvalue = (purchaseTax * purchasePrice) / 100;
        let purchasecost = (purchasePrice + taxvalue) * totalQty;
        return purchasecost
    }

    const calculateTotalTax = (amount, tax, qty) => {

        let totalQty = qty ? parseInt(qty) : 0;
        let purchasePrice = amount ? parseInt(amount) : 0;
        let purchaseTax = tax ? parseInt(tax) : 0;
        let taxvalue = (purchaseTax * purchasePrice) / 100;
        return taxvalue * totalQty
    }


    const handleProductChange = (name, value, textContent) => {
        let newsearch = { ...inputs, [name]: value };
        if (name == 'productId') {
            newsearch = { ...newsearch, 'productText': textContent }
        }
        else {
            newsearch = { ...newsearch, 'variantText': textContent }
        }
        setInputs(newsearch)
    }

    const handleCloseModel = () => {
        console.log("I am in close")
        setOpenAddModal(false)
    }



    return (
        <Modal
            onClose={() => setOpenAddModal(false)}
            onOpen={() => setOpenAddModal(true)}
            open={openAddModel}
            dimmer='blurring'
        >
            <Modal.Content image>

                <Modal.Description>
                    <Header>Product Info</Header>
                    <Divider></Divider>
                    <Form loading={formload} error={formError} >
                        <Grid columns={1} divided>
                            <GridRow stretched>
                                <GridColumn>



                                    <Form.Group widths={'equal'}>
                                        <Form.Field>
                                            <label>Search Product </label>


                                            <SearchAndSelectProduct
                                                placeholder={'Search and Select Product'}
                                                handleDropDownChanges={handleProductChange}
                                                dropdownName={'productId'}
                                                value={inputs.productId}
                                                clearable={true}
                                            ></SearchAndSelectProduct>
                                        </Form.Field>

                                        <Form.Field>
                                            <label>Search and Select Variants </label>

                                            <SearchAndSelectVariant
                                                placeholder={'Search and Select Variant'}
                                                handleDropDownChanges={handleProductChange}
                                                dropdownName={'variantId'}
                                                value={inputs.variantId}
                                                clearable={true}
                                                productId={inputs.productId}
                                            ></SearchAndSelectVariant>
                                        </Form.Field>
                                    </Form.Group>
                                    <Form.Group widths={'equal'}>
                                        <Form.Field>
                                            <label>MRP/Pcs</label>
                                            <Input

                                                placeholder='Purchase Mrp'
                                                value={inputs.mrp}
                                                type="number"
                                                name="mrp"
                                                onChange={handleChange}
                                            ></Input>
                                        </Form.Field>

                                        <Form.Field>
                                            <label>Purchase Price/Pcs</label>
                                            <Input

                                                placeholder='Purchase Price'
                                                value={inputs.purchasePrice}
                                                type="number"
                                                name="purchasePrice"
                                                onChange={handleChange}
                                            ></Input>
                                        </Form.Field>

                                        <Form.Field>
                                            <label>Tax</label>
                                            <Input
                                                label={'%'}
                                                labelPosition={'right'}
                                                placeholder='Tax'
                                                value={inputs.tax}
                                                type="number"
                                                name="tax"
                                                defaultValue={5}

                                                onChange={handleChange}
                                            ></Input>
                                        </Form.Field>



                                    </Form.Group>


                                    <Form.Group widths={'equal'}>
                                        <Form.Field>
                                            <label>Qty</label>
                                            <Input

                                                placeholder='Purchase Qty'
                                                value={inputs.qty}
                                                type="number"
                                                name="qty"
                                                defaultValue='1'
                                                onChange={handleChange}
                                            ></Input>
                                        </Form.Field>

                                        <Form.Field>
                                            <label>Total Value</label>
                                            <Input

                                                placeholder='Purchase Total Amount '
                                                value={prices.totalAmount}
                                                type="number"
                                                name="totalAmount "
                                                readonly={true}

                                            ></Input>


                                        </Form.Field>

                                        <Form.Field>
                                            <label>Total Tax</label>
                                            <Input

                                                placeholder='Purchase tax'
                                                value={prices.taxAmount}
                                                type="number"
                                                name="totalVal"
                                                readonly={true}

                                            ></Input>


                                        </Form.Field>






                                    </Form.Group>


                                    <Form.Group widths={'equal'} >
                                        <Form.Field>
                                            <label>Purchase Per Pcs</label>
                                            {prices.singleItem}
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Selling Price</label>
                                            <Input

                                                placeholder='Selling Price'
                                                value={inputs.sellPrice}
                                                min={prices.singleItem}
                                                type="number"
                                                name="sellPrice"
                                                onChange={handleChange}
                                            ></Input>
                                        </Form.Field>
                                    </Form.Group>




                                </GridColumn>
                            </GridRow>

                        </Grid>
                    </Form>
                </Modal.Description>

            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={handleCloseModel}>
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

const mapStateToProps = (state) => ({




})

const mapDispatchToProps = (dispatch) => ({
    alertMessage: (type, message) => dispatch({ type: ALERT_NOTIFY, payload: { type, message } })
})

export default connect(mapStateToProps, mapDispatchToProps)(AddPurchaseProductpage)