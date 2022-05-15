import React, { useEffect, useState } from "react";
import { Button, Container, Grid, GridColumn, GridRow, Header, Icon, IconGroup, Input, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import PaginationCompact from "../../layout/pagination";
import _ from "lodash";
import { GET_TRANSCATION_DETAILS, GET_TRANSCATION_LIST } from "../../redux/actions";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { dateFormat } from "../../constant/global";
import TableLoaderPage from "../../components/TableLoader";
import TableNoRecordFound from "../../components/TableNoRecordFound";



const TransactionPage = ({ getTranscations, transcations, pagination, loading }) => {

    // Pagination
    const [ellipsisItem, setEllipsisItem] = useState(null);
    const [activePage, SetActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchResult, setSearchResult] = useState([])
    const history = useHistory()
    // Search 
    const [searchText, setSearchText] = useState('')



    const handlePaginationChange = (e, { activePage }) => {
        getTranscations(activePage, 10, searchText)
    }


    useEffect(() => {
        getTranscations(1, 10, searchText)
    }, [])

    useEffect(() => {
        // let activePage = 1
        // setEllipsisItem()
        setTotalPages(pagination.totalPages)
        SetActivePage(pagination.currentPage)

    }, [transcations, pagination])

    useEffect(() => {
        getTranscations(1, 10, searchText)
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

    const handleAddOther = (id) => {
        history.push(`/order`)
    }


    return (
        <Container>

            <Header> Transaction History</Header>

            <Grid>
                <GridRow columns={2}>
                    <GridColumn>
                    </GridColumn>
                    <GridColumn textAlign="right">

                        <Button onClick={handleAddOther} color="green"><Icon name="plus"></Icon> Add New Order</Button>
                    </GridColumn>
                </GridRow>
            </Grid>

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
                        {['Id', 'Customer', 'Transaction Value', 'Discount', 'Final Amount','Credit Amount', 'Created At', 'Action'].map(h => <Table.HeaderCell key={h}>{h}</Table.HeaderCell>)}
                    </Table.Row>
                </Table.Header>

                <TableBody>
                    {loading && <TableLoaderPage colSpan={9}></TableLoaderPage>}
                    {(loading == false && transcations.length == 0) && (<TableNoRecordFound></TableNoRecordFound>)}
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

    )

}

TransactionPage.propTypes = {
    loading: PropTypes.bool
}



const mapStateToProps = (state) => ({
    pagination: state.transcation.pagination,
    transcations: state.transcation.transcations,
    loading: state.transcation.loading,



})

const mapDispatchToProps = (dispatch) => ({
    getTranscations: (page, count, searchText) => dispatch({ type: GET_TRANSCATION_LIST, payload: { page, count, searchText } }),
    // getTranscation: (id) => dispatch({ type: GET_TRANSCATION_DETAILS, payload: { id } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPage);