import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Card, Modal, Divider, Form, Grid, GridColumn, GridRow, Input, Label, Icon, Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from "semantic-ui-react";
import { ADD_BARCODE, ALERT_NOTIFY, DELETE_BARCODE } from "../redux/actions";

const AddBarcodesModal = ({
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
    qty,
    articleNo
}) => {

    const [updatedBarcode, setUpdatedBrcode] = useState('')
    const [inputs, setInputs] = useState({qty: 1})
    const [artilceinputs, setActiveInputs] = useState({})
    const [isInputEnable, setInputsEnable] =  useState(false)
    const debounceFn = useCallback(_.debounce(handleDebounceFn, 2000), []);
   const handleUpdateFunction = (e) => {
        e.preventDefault();
        let name = e.target.name;
        let value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }


    function handleDebounceFn() {
        setUpdatedBrcode(inputs)
    }

    useEffect(() => {
        if (updatedBarcode) {
            setTimeout(() => {
                let { qty, barcode } = inputs;
                let data = {
                    variantId,
                    productId,
                    barcode,
                    purchaseProductId,
                    purchaseId,
                    qty,
                }
        
                addBarcode(data)

                setUpdatedBrcode('');
                setInputs({qty: 1})
            }, 300)
        }
    }, [updatedBarcode])

    const handleDeletebarcode = (id) => {
        deleteBarcode(id)
    }
   

    const handleAddbarcode = (e) => {
        let value = e.target.value;
        setInputs(values => ({ ...values, 'barcode': value }))
        debounceFn()
    }



    const handleAddWithArticle = ()=>{
        setActiveInputs(values => ({ ...values, 'barcode': articleNo, 'qty': qty }))
    }


    useEffect(()=>{

        if(Object.keys(artilceinputs).length)
        {
            let { qty, barcode } = artilceinputs;
            let data = {
                variantId,
                productId,
                barcode,
                purchaseProductId,
                purchaseId,
                qty,
            }
            addBarcode(data)
        }

      
    },[artilceinputs])

    useEffect(()=>{
        
        if(barcodes.length){
            let totals = 0;
            barcodes.forEach((a,b)=> {
                 totals += parseInt( a.qty)
            });
            if(qty > totals)
            {
                setInputsEnable(true)
            }else{ 
                setInputsEnable(false)
            }

        }else{
            setInputsEnable(true)
        }
        
    },[barcodes,qty])

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            dimmer='blurring'
            size="large"
        >
            <Modal.Header>Add/View Barcode ({articleNo})  </Modal.Header>

            <Modal.Content >

                <Modal.Description>

                    <Grid columns={2}>
                        <GridColumn>
                       { isInputEnable && ( <Card >
                                <Card.Content>
                                    <Card.Header>
                                    <Button color="purple" size="mini"  onClick={handleAddWithArticle}> Add Purchase Purchase to Serve</Button>
                                    </Card.Header>

                                    <Divider></Divider>
                                    <Form >
                                    <Form.Group widths={1}>
                                            <Form.Field>
                                                <label>Product Qty : </label>
                                                <Input
                                                    type={'input'}

                                                    placeholder='Enter qty'
                                                    name={'qty'}
                                                    value={inputs.qty}
                                                    onChange={handleUpdateFunction}
                                                />
                                            </Form.Field>
                                        </Form.Group>
                                        <Form.Group widths={1}>
                                            <Form.Field>
                                                <label>Add With Article no :</label>
                                                <Input
                                                    type={'input'}
                                                    autoFocus={true}
                                                    placeholder='Enter Barcode'
                                                    name={'barcode'}
                                                    value={inputs.barcode}
                                                    onChange={handleAddbarcode}
                                                />

                                            </Form.Field>

                                        </Form.Group>
                                        
                                        <Form.Group widths={1} >
                                            <Button color="blue"  onClick={handleAddbarcode}><Icon name="save"></Icon> Save</Button>
                                        </Form.Group>
                                    </Form>

                                </Card.Content>

                            </Card >)}
                            
                        </GridColumn>
                        <GridColumn>
                            <Card fluid>
                                <Card.Content>
                                    <Card.Description>


                                        <Table celled>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHeaderCell>Code/ArtcleNo</TableHeaderCell>
                                                    <TableHeaderCell>Qty</TableHeaderCell>
                                                    <TableHeaderCell>Action</TableHeaderCell>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {barcodes.map(x => (<TableRow key={`barcodes-${x._id}`}>
                                                    <TableCell>{x.barcode}</TableCell>
                                                    <TableCell>{x.qty}</TableCell>
                                                    <TableCell>  <Icon name='delete' onClick={() => handleDeletebarcode(x._id)} /></TableCell>

                                                </TableRow>))}
                                            </TableBody>

                                        </Table>

                                    </Card.Description>
                                </Card.Content>

                            </Card>
                        </GridColumn>
                    </Grid>



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

export default connect(mapStateToProps, mapDispatchToProps)(AddBarcodesModal)