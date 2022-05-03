
import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { GET_TRANSCATION_DETAILS } from "../redux/actions";

import ReactToPrint from 'react-to-print';
import InvoiceTemplaate from "./invoice";
import "./order-print.css";
import { Button, Card, Container, Grid, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import TwoInchInvoiceTemplaate from "./twoinchinvoice";

const OrderPrint = ({
    transcation,
    getTranscation
}) => {
    const history = useHistory()
    const { orderId } = useParams()
    const componentRef = useRef();
    const samllInvoicecomponentRef = useRef()
    useEffect(() => {

        getTranscation(orderId)
    }, [])

    useEffect(() => {
        console.log(transcation)

    }, [transcation])

    
    const handleAddOrder = (id) => {
        history.push(`/order/`)
    }
    const handleViewOrder = (id) => {
        history.push(`/transcation/${id}`)
    }


    return (<Container>


        <Grid>
            <Grid.Row>
                <Grid.Column widescreen={4}>
                  
                </Grid.Column>
               
                <Grid.Column widescreen={12} textAlign={"right"}>
                   
                    <Button color="green" onClick={() => handleAddOrder()} > <Icon name={'plus'}></Icon>  Add New Order</Button>
                    <Button color="orange" onClick={() => handleViewOrder(orderId)} > <Icon name={'eye'}></Icon>  View Order</Button>
                    <ReactToPrint
                        trigger={() => <Button  color={"red"}> <Icon name={'print'}></Icon> Print</Button>}
                        content={() => componentRef.current}
                    />
                     <ReactToPrint
                        trigger={() => <Button  color={"red"}> <Icon name={'print'}></Icon> Print 2 inch Invoice</Button>}
                        content={() => samllInvoicecomponentRef.current}
                    />
                </Grid.Column>
            </Grid.Row>

        </Grid>

        <Card fluid>
            <Card.Content>
                <InvoiceTemplaate transcation={transcation} ref={componentRef}></InvoiceTemplaate>
            </Card.Content>
            <Card.Content>
                <TwoInchInvoiceTemplaate transcation={transcation} ref={samllInvoicecomponentRef}></TwoInchInvoiceTemplaate>
            </Card.Content>
        </Card>
    </Container>)
}


const mapStateToProps = (state) => ({
    transcation: state.transcation.transcation
})

const mapDispatchToProps = (dispatch) => ({
    getTranscation: (id) => dispatch({ type: GET_TRANSCATION_DETAILS, payload: { id } })

})
export default connect(mapStateToProps, mapDispatchToProps)(OrderPrint);
