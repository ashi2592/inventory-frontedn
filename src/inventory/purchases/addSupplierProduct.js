import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Button, Card, Modal, Divider, Form, Grid, GridColumn, GridRow, Input } from "semantic-ui-react";
import SearchAndSelectSupplier from "../../components/SearchAndSelectSupplier";
import { ALERT_NOTIFY } from "../../redux/actions";
const AddPurchaseSupplierpage = ({
    handleSupplierChange,
    purchases,
    setOpenSupplierModel,
    openSupplierModel,
}) => {

    return (
        <Modal
            onClose={() => setOpenSupplierModel(false)}
            onOpen={() => setOpenSupplierModel(true)}
            open={openSupplierModel}
            dimmer='blurring'
        >
            <Modal.Header>Add Supplier and Delivery</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                    <Form >
                        <Form.Group width={'equal'}>
                            <Form.Field >
                                <label>Select Supplier </label>
                                <SearchAndSelectSupplier
                                    placeholder={'Search and Select Supplier'}
                                    handleDropDownChanges={handleSupplierChange}
                                    dropdownName={'supplier'}
                                    value={purchases.supplier}
                                    clearable={true}
                                ></SearchAndSelectSupplier>
                            </Form.Field>

                            <Form.Field>
                                <label>Delivery Charge</label>
                                <Input

                                    placeholder='Delivery Charge'
                                    value={purchases.delivery}
                                    type="number"
                                    name="delivery"
                                    onChange={(event) => handleSupplierChange('delivery', event.target.value)}
                                    defaultValue='0'
                                ></Input>
                            </Form.Field>

                        </Form.Group>

                    </Form>
                </Modal.Description>

            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpenSupplierModel(false)}>
                    Close
                </Button>
                <Button
                    content="Yep, Correct"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => setOpenSupplierModel(false)}
                    positive
                />
            </Modal.Actions>

        </Modal>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
    alertMessage: (type, message) => dispatch({ type: ALERT_NOTIFY, payload: { type, message } })
})

export default connect(mapStateToProps, mapDispatchToProps)(AddPurchaseSupplierpage)