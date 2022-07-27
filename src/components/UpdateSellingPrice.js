import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Form, Icon, Input, Modal } from 'semantic-ui-react';


const UpdateSellingPrice = ({ setOpen, open, sellPrice, purchaseProductId }) => {

    const [inputs, setInputs] = useState({})

    const handleUpdateSellPrice = (event) => {
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.name;
        setInputs(values=> ({...values,[name]:value}))
    }




    return (<Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        dimmer='blurring'
    >
        <Modal.Header>Selling Price  </Modal.Header>



        <Modal.Content image>

            <Modal.Description>

                <Card fluid>
                    <Card.Content>
                        <Card.Description>
                            <Form.Group>
                                <Form.Field>
                                    <label>Sell Price : </label>

                                    <Input
                                        autoFocus={true}
                                        placeholder='Enter New Price'
                                        name={'sellPrice'}
                                        value={sellPrice}
                                        onChange={handleUpdateSellPrice}
                                        
                                    />
                                </Form.Field>


                            </Form.Group>

                        </Card.Description>
                    </Card.Content>

                </Card>
            </Modal.Description>

        </Modal.Content>
        <Modal.Actions>
       

            <Button color='black' onClick={() => setOpen(false)}>
                Close
            </Button>
            <Button color='blue' onClick={() => setOpen(false)}>
               <Icon name="save"></Icon> Save
            </Button>

        </Modal.Actions>

    </Modal>)
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(UpdateSellingPrice)