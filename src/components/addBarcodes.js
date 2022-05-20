import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Card, Modal, Divider, Form, Grid, GridColumn, GridRow, Input, Label, Icon } from "semantic-ui-react";
import { ADD_BARCODE, ALERT_NOTIFY, DELETE_BARCODE } from "../redux/actions";

const AddBarcodesMOdal = ({
    setOpen,
    open,
    product,
    addBarcode,
    barcodes,
    deleteBarcode,
    variantId,
    productId,
    purchaseProductId,
    purchaseId,
}) => {

    const [barcode, setBarcode] = useState('');
    const [updatedBarcode, setUpdatedBrcode] = useState('')


    const debounceFn = useCallback(_.debounce(handleDebounceFn, 2000), []);

    const handleUpdateFunction = (e, { value }) => {
        e.preventDefault()
        setBarcode(value);
    }
    useEffect(() => {
        debounceFn(barcode);
    }, [barcode])

    function handleDebounceFn(value) {
        if (value) {
            setUpdatedBrcode(value)
        }
    }

    useEffect(() => {
        if (updatedBarcode) {

            let data = {
                variantId,
                productId,
                barcode,
                purchaseProductId,
                purchaseId

            }

            addBarcode(data)



            setTimeout(() => {
                setUpdatedBrcode('');
                setBarcode('')
            }, 300)
        }
    }, [updatedBarcode])

    const handleDeletebarcode = (id) => {
        deleteBarcode(id)
    }


    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            dimmer='blurring'
        >
            <Modal.Header>Add/View Barcode ({purchaseId})  </Modal.Header>



            <Modal.Content image>

                <Modal.Description>
                    <Form >
                        <Form.Group width={'equal'}>
                            <Form.Field>
                                <label>Scan with scanner or Add By Enter</label>
                                <Input
                                    autoFocus={true}
                                    placeholder='Enter Barcode'
                                    name={'barcode'}
                                    value={barcode}
                                    onChange={handleUpdateFunction}
                                />

                            </Form.Field>

                        </Form.Group>

                    </Form>

                    <Card fluid>
                        <Card.Content>
                            <Card.Description>
                            {barcodes.map(x => (<Label as='a'>
                            {x.barcode}
                            <Icon name='delete' onClick={()=> handleDeletebarcode(x._id)}/>
                        </Label>
                        ))}

                            </Card.Description>
                        </Card.Content>

                        

                    </Card>
                </Modal.Description>

            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Close
                </Button>


            </Modal.Actions>

        </Modal>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
    alertMessage: (type, message) => dispatch({ type: ALERT_NOTIFY, payload: { type, message } }),
    addBarcode: (data) => dispatch({ type: ADD_BARCODE, payload: data }),
    deleteBarcode: (barcode) => dispatch({ type: DELETE_BARCODE, payload: barcode })
})

export default connect(mapStateToProps, mapDispatchToProps)(AddBarcodesMOdal)