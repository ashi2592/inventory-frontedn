import React, { useEffect, useState } from "react";
import { Button, Card, Checkbox, Container, Divider, Grid, GridColumn, GridRow, Header, Icon, Input, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import { connect } from "react-redux";
import { GET_CATEGORY_DETAILS, GET_CUSTOMER_DETAILS, GET_CUSTOMER_STATS, GET_TRANSCATION_CUSTOMER_LIST, UPDATE_CUSTOMER } from "../redux/actions";
import { useParams } from "react-router-dom";
import _, { startCase } from "lodash";
import { useHistory } from "react-router-dom";
import PaginationCompact from "../layout/pagination";
import { dateFormat } from "../constant/global";
import CustomerCard from "./customer-card";

const CustomerDetailsPage = ({ customer,
    getCustomer,
    updateCustomer,
    getCustomerWiseTransction,
    transcations,
    pagination,
    loading,
    customerDetailloading,
    getCustomerStats,
    customerStats
}) => {
    const [searchText, setSearchText] = useState('');
    const { id } = useParams()
    const [ellipsisItem, setEllipsisItem] = useState(null);
    const [activePage, SetActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchResult, setSearchResult] = useState([])
    const history = useHistory()
    const [sortData, setSortData] = useState({createdAt: 'Asc'})



    useEffect(() => {
        getCustomer(id)
        getCustomerStats(id)
    }, [])


    useEffect(() => {
        // let activePage = 1
        // setEllipsisItem()
        setTotalPages(pagination.totalPages)
        SetActivePage(pagination.currentPage)

    }, [transcations, pagination])

    useEffect(() => {
        getCustomerWiseTransction(1, 10, searchText, id)
    }, [searchText])

    const handleSearchChange = (e, data) => {
        setSearchText(data.value)

    }

    const handleInvoiceClick = (id) => {
        history.push(`/order/print/${id}`)
    }

    const handleOrderDetails = (id) => {
        history.push(`/transcation/${id}`)
    }

    const handlePaginationChange = (e, { activePage }) => {
        getCustomerWiseTransction(1, 10, searchText, id)
    }

    const handleNavigateList = () => {
        history.push('/customer')
    }

    const handlesortbyname = (keyName,value) => {
        let val = '';
        if(value === 'ASC'){
            val = 'DSC'
        }
        setSortData({sortData,val})
    }

    useEffect(()=>{
        console.log(customerStats)
    },[customerStats])

    
    return (
        <Container>

            <Header>Customer Details</Header>
            <Grid stackable>
                <GridRow>
                    <GridColumn largeScreen={6}>
                        <Button color='orange' onClick={() => { handleNavigateList() }}> <Icon name="arrow left"></Icon> Back to Customer List</Button>
                    </GridColumn>
                    <GridColumn largeScreen={8} textAlign="right">
                    </GridColumn>
                </GridRow>
            </Grid>
            <Divider></Divider>

            <Card.Group itemsPerRow={4} stackable>
            <CustomerCard title={"Today Transaction "}  color={'orange'} amount={ customerStats[0] && customerStats[0].totalTranscation}></CustomerCard>
            <CustomerCard title={"Today Purchase "}  color={'orange'} amount={ customerStats[0] && customerStats[0].totalValue}></CustomerCard>
            <CustomerCard title={"Today Discount "}  color={'orange'} amount={ customerStats[0] && customerStats[0].totalDiscount}></CustomerCard>
            <CustomerCard title={"Today Credit Amount "}  color={'red'} amount={ customerStats[0] && customerStats[0].totalCreditAmount}></CustomerCard>
             </Card.Group> 

           

            <Divider></Divider>
            <Grid stackable>
                <GridRow>
                    <GridColumn>
                        <Table>
                            <Table.Header>
                                <Table.Row>

                                    <Table.HeaderCell colSpan={2} warning={true}>{customer.mobile}</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        Customer ID
                                    </Table.Cell>
                                    <Table.Cell>
                                        {customer._id}
                                    </Table.Cell>

                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                    Customer Name
                                    </Table.Cell>
                                    <Table.Cell>
                                        {customer.customerName}
                                    </Table.Cell>
                                    
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        Customer Contact
                                    </Table.Cell>
                                    <Table.Cell>
                                        {customer.mobile}
                                    </Table.Cell>
                                    
                                </Table.Row>


                            </Table.Body>

                        </Table>
                    </GridColumn>
                </GridRow>

                <GridRow>
                    <GridColumn>
                        <Container>
                            <Header> Transaction History</Header>
                            <Input onChange={_.debounce(handleSearchChange, 500, {
                                leading: true,
                            })} icon="search" value={searchText}></Input>

                            <p >
                                {searchText && `Search Results of  ${searchText}`}
                            </p>

                            <Table celled>
                                {/* <TableHeader Headers={}></TableHeader> */}
                                <Table.Header>
                                    <Table.Row>
                                      
                                        <Table.HeaderCell  >Id</Table.HeaderCell>
                                        <Table.HeaderCell  >Customer</Table.HeaderCell>
                                        <Table.HeaderCell  >Transaction Value</Table.HeaderCell>
                                        <Table.HeaderCell  >Discount</Table.HeaderCell>
                                        <Table.HeaderCell  >Final Amount</Table.HeaderCell>
                                        <Table.HeaderCell  >Credit Amount</Table.HeaderCell>
                                        <Table.HeaderCell onClick={()=>{ handlesortbyname('createdAt',sortData.createdAt)}} >Created At</Table.HeaderCell>
                                        <Table.HeaderCell  >Action</Table.HeaderCell>

                                    </Table.Row>
                                </Table.Header>

                                <TableBody>

                                    {!loading && (transcations || [])
                                        .map(x => (<TableRow key={'order-' + x._id} error={x.status == false}><TableCell >{x.orderId}</TableCell>
                                            <TableCell >{x.customer ? x.customer.mobile : ""}</TableCell>
                                            <TableCell >{x.totalPrice}</TableCell>
                                            <TableCell >{x.discount}</TableCell>
                                            <TableCell >{x.totalVal}</TableCell>
                                            <TableCell warning={x.creditAmount}>{x.creditAmount}</TableCell>

                                            <TableCell >{dateFormat(x.createdAt)}</TableCell>

                                            <TableCell>
                                                <Icon name={"file alternate"} onClick={() => handleInvoiceClick(x._id)}></Icon>
                                                <Icon name={"eye"} onClick={() => handleOrderDetails(x._id)}></Icon>

                                            </TableCell></TableRow>))}
                                </TableBody>

                            </Table>
                            <PaginationCompact
                                activePage={activePage}
                                totalPages={totalPages}
                                ellipsisItem={ellipsisItem}
                                handlePaginationChange={handlePaginationChange}
                            ></PaginationCompact>

                        </Container>
                    </GridColumn>
                </GridRow>
            </Grid>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    customer: state.customers.customer,
    pagination: state.transcation.pagination,
    transcations: state.transcation.transcations,
    loading: state.transcation.loading,
    customerDetailloading:  state.customers.loading,
    customerStats: state.customers.stats
})
const mapDispatchToProps = (dispatch) => ({
    getCustomer: (id) => dispatch({ type: GET_CUSTOMER_DETAILS, payload: { id } }),
    updateCustomer: (id, data) => dispatch({ type: UPDATE_CUSTOMER, payload: { id, data } }),
    getCustomerWiseTransction: (page, count, search, customerId) => dispatch({ type: GET_TRANSCATION_CUSTOMER_LIST, payload: { page, count, search, customer: customerId } }),
    getCustomerStats: (id) => dispatch({type: GET_CUSTOMER_STATS,payload: {id}})
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailsPage);