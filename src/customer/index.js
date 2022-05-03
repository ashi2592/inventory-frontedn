
import React, { useEffect, useState } from "react";
import { Button, Container, Grid, GridColumn, GridRow, Header, Icon, Image, Input, Label, Search, Segment, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import TableHeader from "../layout/TableHeader";
import PropTypes from 'prop-types';


// bring connect from react-redux, it's the bridge for connecting component to redux
import { connect } from 'react-redux'
import PaginationCompact from "../layout/pagination";
import _ from "lodash";
import { GET_CUSTOMER_LIST } from "../redux/actions";
import { useHistory } from "react-router-dom";
import TableLoaderPage from "../components/TableLoader";
import TableNoRecordFound from "../components/TableNoRecordFound";


const CustomersListPage = ({ getCustomers, customers, pagination, loading }) => {

    // Pagination
    const [ellipsisItem, setEllipsisItem] = useState(null);
    const [activePage, SetActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchResult, setSearchResult] = useState([])
    // Search 
    const [searchText, setSearchText] = useState('')

    const history = useHistory()

    const handlePaginationChange = (e, { activePage }) => {
        getCustomers(activePage, 10, searchText)
    }


    useEffect(() => {
        getCustomers(1, 10, searchText)

    }, [])

    useEffect(() => {
        // let activePage = 1
        // setEllipsisItem()
        setTotalPages(pagination.totalPages)
        SetActivePage(pagination.currentPage)

    }, [customers, pagination])

    useEffect(() => {
        getCustomers(1, 10, searchText)
    }, [searchText])

    const handleSearchChange = (e, data) => {
        setSearchText(data.value)

    }

    const handleSelectSearchedRow = (id) => {
        setSearchResult([])
        setSearchText('')
    }


    const handleViewCustomer = id => {
        history.push(`/customer/${id}`)
    }

    const handleAddOther = id => {
        history.push(`/order`)
    }


    return (
        <Container>
            <Header>Customers</Header>
            <Grid stackable>
                <GridRow columns={2}>
                    <GridColumn>
                    </GridColumn>
                    <GridColumn textAlign="right">

                        <Button onClick={handleAddOther} color="green"><Icon name="plus"></Icon> Add New Order</Button>
                    </GridColumn>
                </GridRow>
            </Grid>

            <Grid stackable>
                <GridRow stretched>
                    <GridColumn>
                        <Input onChange={_.debounce(handleSearchChange, 500, {
                            leading: true,
                        })} icon="search" placeholder="Search Customer" value={searchText}></Input>


                        <p >
                            {searchText && `Search Results of  ${searchText}`}
                        </p>
                        <Table celled>
                            <TableHeader Headers={['Id', 'Name', 'Contact', 'Action']}></TableHeader>



                            <TableBody>
                                {loading && <TableLoaderPage colSpan={4}></TableLoaderPage>}
                                {(loading == false && customers.length == 0) && (<TableNoRecordFound></TableNoRecordFound>)}
                                {!loading && (customers|| [])
                                    .map(x => (<TableRow key={'supplier-' + x._id}><TableCell >{x._id}</TableCell>
                                        <TableCell >{x.customerName}</TableCell>
                                        <TableCell >{x.mobile}</TableCell>

                                        <TableCell>
                                            <Icon name="eye" onClick={() => { handleViewCustomer(x._id) }}></Icon>
                                        </TableCell>
                                    </TableRow>))}
                            </TableBody>

                        </Table>
                        <PaginationCompact
                            activePage={activePage}
                            totalPages={totalPages}
                            ellipsisItem={ellipsisItem}
                            handlePaginationChange={handlePaginationChange}
                        ></PaginationCompact>
                    </GridColumn>
                </GridRow>
            </Grid>
        </Container>)

}

CustomersListPage.propTypes = {
    loading: PropTypes.bool
}



const mapStateToProps = (state) => ({
    customers: state.customers.customers,
    pagination: state.customers.pagination,
    loading: state.customers.loading
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getCustomers: (page, count, searchText) => dispatch({ type: GET_CUSTOMER_LIST, payload: { page, count, searchText } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomersListPage);