import React, { useEffect, useState } from "react";
import { Icon, IconGroup, Input, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import PaginationCompact from "../layout/pagination";
import _ from "lodash";
import { GET_TRANSCATION_DETAILS, GET_TRANSCATION_LIST } from "../redux/actions";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";



const Supplier = ({ getTranscations, transcations, pagination }) => {

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


    return (
        <div>
            <div className="container">
                <div className="row">
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
                                {['Id', 'Customer', 'Transaction Value', 'Discount', 'Final Amount', 'Action'].map(h => <Table.HeaderCell key={h}>{h}</Table.HeaderCell>)}
                            </Table.Row>
                        </Table.Header>

                        <TableBody>

                            {transcations
                                .map(x => (<TableRow key={'order-' + x._id} error={x.status == false}><TableCell >{x.orderId}</TableCell>
                                    <TableCell >{x.customer?x.customer.mobile:""}</TableCell>
                                    <TableCell >{x.totalPrice}</TableCell>
                                    <TableCell >{x.discount}</TableCell>
                                    <TableCell >{x.totalVal}</TableCell>

                                    <TableCell>
                                        <IconGroup>
                                            <Icon name={"file alternate"} onClick={() => handleInvoiceClick(x._id)}></Icon>
                                        </IconGroup></TableCell></TableRow>))}
                        </TableBody>

                    </Table>
                    <PaginationCompact
                        activePage={activePage}
                        totalPages={totalPages}
                        ellipsisItem={ellipsisItem}
                        handlePaginationChange={handlePaginationChange}
                    ></PaginationCompact>
                </div>



            </div>


        </div>)

}

Supplier.propTypes = {
    loading: PropTypes.bool
}



const mapStateToProps = (state) => ({
    pagination: state.transcation.pagination,
    transcations: state.transcation.transcations

})

const mapDispatchToProps = (dispatch) => ({
    getTranscations: (page, count, searchText) => dispatch({ type: GET_TRANSCATION_LIST, payload: { page, count, searchText } }),
    // getTranscation: (id) => dispatch({ type: GET_TRANSCATION_DETAILS, payload: { id } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Supplier);