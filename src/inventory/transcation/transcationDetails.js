import React, { useEffect, useState } from "react";
import { Button, Checkbox, Container, Divider, Grid, Header, Icon, Menu, Table, TableBody, TableCell, TableHeaderCell, TableRow } from "semantic-ui-react";
import { connect } from "react-redux";
import { GET_TRANSCATION_DETAILS, UPDATE_TRANSCATION, UPDATE_TRANSCATION_STATUS } from "../../redux/actions";
import OrderCustomerCard from "../../components/customer-card";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import TableHeader from "../../layout/TableHeader";
import TableLoaderPage from "../../components/TableLoader";
import TableNoRecordFound from "../../components/TableNoRecordFound";

const TranscationDetails = ({ transcation, getTransaction, updateTranscationStatus, error, loading }) => {

    const history = useHistory();
    const { id } = useParams();

    const [address, setAddress] = useState('')
    const [mobile, setMobile] = useState('')
    const [logo, setLogo] = useState('')


    useEffect(() => {
        setAddress(localStorage.getItem('address'))
        setMobile(localStorage.getItem('mobile'))
        setLogo(localStorage.getItem('logo'))

    }, [])
    useEffect(() => {
        getTransaction(id)
    }, [])


    useEffect(() => {
        console.log(transcation)
    }, [transcation])


    const handleViewOrder = (id) => {
        history.push(`/order/print/${id}`)
    }

    const handleAddOrder = (id) => {
        history.push(`/order/`)
    }

    const handleCancelOrder = (id) => {
        updateTranscationStatus(id, false)
    }
    const handleSettleAmount = (id) => {
        updateTranscationStatus(id, true,transcation.totalVal, 0, 0 )
    }



    return (
        <Container>
            <Header>Order ID:  #{transcation.orderId}</Header>


            <Grid>
                <Grid.Row>
                    <Grid.Column widescreen={4}>
                        <OrderCustomerCard customer={transcation.customer} ></OrderCustomerCard>
                    </Grid.Column>
                    <Grid.Column widescreen={3} textAlign={"right"}>
                        {transcation.status == false && (<img src="/cancelled.png" width="100" alt="" />)}

                        {transcation.status == true && (<img src="/paid.webp" width="100" alt="" />)}

                    </Grid.Column>
                    <Grid.Column widescreen={9} textAlign={"right"}>
                        <Button color="yellow" onClick={() => handleViewOrder(transcation._id)}> <Icon name="eye"></Icon>  View </Button>
                        <Button color="green" onClick={() => handleAddOrder()} > <Icon name="plus"></Icon> New Order</Button>
                        {transcation.status == true && (<Button color="red" onClick={() => handleCancelOrder(transcation._id)} > <Icon name="delete"></Icon> Cancel </Button>)}
                        { transcation.creditAmount!== 0  && (<Button color="pink" onClick={() => handleSettleAmount(transcation._id)} > <Icon name="setting"></Icon> Settel </Button>)}

                    </Grid.Column>
                </Grid.Row>

            </Grid>

            <Divider></Divider>
            <Header>Product Information</Header>
            <Table celled>
                <TableHeader Headers={["Product Name", "codes", "Qty", "Price", "Total Value", "Action"]}></TableHeader>
                <TableBody>
                    {loading && <TableLoaderPage colSpan={4}></TableLoaderPage>}
                    {(loading == false && transcation.length == 0) && (<TableNoRecordFound></TableNoRecordFound>)}
                    {!loading &&(transcation.products || []).map((prod) => (<TableRow key={`ordered-products-${prod._id}`}>
                        <TableCell ><Link to={`/product/${prod._id}`}>{prod.productName}</Link></TableCell>
                        <TableCell>{prod.codes}</TableCell>
                        <TableCell>{prod.productQty}</TableCell>
                        <TableCell>{prod.productPrice}</TableCell>
                        <TableCell>{prod.productQty * prod.productPrice}</TableCell>

                        <TableCell></TableCell>

                    </TableRow>))}

                   { !loading &&( <TableRow>

                        <TableHeaderCell colSpan={3}></TableHeaderCell>
                        <TableCell>Discount</TableCell>
                        <TableCell>{transcation.discount}</TableCell>
                        <TableCell></TableCell>

                    </TableRow>)}
                    {!loading &&(<TableRow active={true}>
                        <TableHeaderCell colSpan={3}></TableHeaderCell>
                        <TableCell>Final Amount</TableCell>
                        <TableCell>{transcation.totalVal}</TableCell>
                        <TableCell></TableCell>

                    </TableRow>)}
                    {!loading && transcation.paidAmount !== 0 && (<TableRow>
                        <TableHeaderCell colSpan={3}></TableHeaderCell>
                        <TableCell>Paid Amount</TableCell>
                        <TableCell>{transcation.paidAmount}</TableCell>
                        <TableCell></TableCell>

                    </TableRow>)}
                    { !loading && transcation.creditAmount!== 0 && (<TableRow error={true}>
                        <TableHeaderCell colSpan={3}></TableHeaderCell>
                        <TableCell>Credit Amount</TableCell>
                        <TableCell>{transcation.creditAmount}</TableCell>
                        <TableCell></TableCell>

                    </TableRow>)}
                    { !loading&& transcation.returnAmount !== 0 && (<TableRow active={true}>
                        <TableHeaderCell colSpan={3}></TableHeaderCell>
                        <TableCell>Return Amount</TableCell>
                        <TableCell>{transcation.returnAmount}</TableCell>
                        <TableCell></TableCell>

                    </TableRow>)}
                </TableBody>
            </Table>

        </Container>

    )
}



const mapStateToProps = (state) => ({
    transcation: state.transcation.transcation,
    loading: state.transcation.loading,
    error: state.transcation.error,

})
const mapDispatchToProps = (dispatch) => ({
    updateTranscationStatus: (id, status,paidAmount,returnAmount,creditAmount) => dispatch({ type: UPDATE_TRANSCATION_STATUS, payload: { id, data: { status,creditAmount ,paidAmount,returnAmount} } }),
    getTransaction: (id) => dispatch({ type: GET_TRANSCATION_DETAILS, payload: { id } })

})

export default connect(mapStateToProps, mapDispatchToProps)(TranscationDetails);