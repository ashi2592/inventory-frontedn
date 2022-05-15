
import React, { useEffect, useState } from "react";
import { Button, Container, Grid, GridColumn, GridRow, Header, Icon, Input,  Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import TableHeader from "../../layout/TableHeader";

import PropTypes from 'prop-types';


// bring connect from react-redux, it's the bridge for connecting component to redux
import { connect } from 'react-redux'
import { GET_SUPPLIER_DETAILS, GET_SUPPLIER_LIST } from "../../redux/actions";
import SupplierDetails from "./SupplierDetails";
import PaginationCompact from "../../layout/pagination";
import _ from "lodash";
import TableLoaderPage from "../../components/TableLoader";
import TableNoRecordFound from "../../components/TableNoRecordFound";
import { useHistory } from "react-router-dom";
import SettingSidebarPage from "../settingSidebar";


const Supplier = ({ getSuppliers,  suppliers,  pagination, loading }) => {

    const history = useHistory()
    const [addSupplierButton, setAddSupplierButton] = useState(false)

    // Pagination
    const [ellipsisItem, setEllipsisItem] = useState(null);
    const [activePage, SetActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchResult, setSearchResult] = useState([])

    // Search 
    const [searchText, setSearchText] = useState('')

    const handleAddSupplier = function (value = true) {
        history.push(`/supplier/add`)
    }



    const handleViewSupplier = (id) => {
        history.push(`/supplier/${id}`)
    }

    const handlePaginationChange = (e, { activePage }) => {
        getSuppliers(activePage, 10, searchText)
    }


    useEffect(() => {
        getSuppliers(1, 10, searchText)

    }, [])

    useEffect(() => {
        // let activePage = 1
        // setEllipsisItem()
        setTotalPages(pagination.totalPages)
        SetActivePage(pagination.currentPage)

    }, [suppliers, pagination])

    useEffect(() => {
        getSuppliers(1, 10, searchText)
    }, [searchText])

    const handleSearchChange = (e, data) => {
        setSearchText(data.value)

    }

    const handleSelectSearchedRow = (id) => {
        setSearchResult([])
        setSearchText('')
        handleViewSupplier(id)
    }

    return (
        <Container>
            <Header>Supplier</Header>


            <Grid>
                <GridRow columns={2}>
                    <GridColumn>
                        <SettingSidebarPage activeItem={'supplier'} ></SettingSidebarPage>
                    </GridColumn>
                    <GridColumn textAlign="right">
                        <Button active={addSupplierButton} onClick={handleAddSupplier} color="green"><Icon name="plus"></Icon> Add Supplier</Button>
                    </GridColumn>
                </GridRow>
            </Grid>

            <Grid celled>
                <GridRow columns={1}>
                    <GridColumn>
                        <Input onChange={_.debounce(handleSearchChange, 500, {
                            leading: true,
                        })} icon="search" value={searchText}></Input>


                        <p >
                            {searchText && `Search Results of  ${searchText}`}
                        </p>
                        <Table celled>
                            <TableHeader Headers={['Id', 'Name', 'Contact', 'Location', 'Action']}></TableHeader>

                            <TableBody>

                                {loading && <TableLoaderPage colSpan={4}></TableLoaderPage>}
                                {(loading === false && suppliers.length === 0) && (<TableNoRecordFound></TableNoRecordFound>)}

                                {suppliers
                                    .map(x => (<TableRow key={'supplier-' + x._id}><TableCell >{x._id}</TableCell>
                                        <TableCell >{x.supplierName}</TableCell>
                                        <TableCell >{x.contact}</TableCell>
                                        <TableCell >{x.location}</TableCell>
                                        {/* <TableCell >{x.address}</TableCell> */}

                                        <TableCell><Icon name="eye" onClick={() => { handleViewSupplier(x._id) }}></Icon></TableCell></TableRow>))}
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

Supplier.propTypes = {
    loading: PropTypes.bool,
    suppliers: PropTypes.array,
    supplier: PropTypes.object,
    getSuppliers: PropTypes.func.isRequired,
    getSupplier: PropTypes.func.isRequired
}



const mapStateToProps = (state) => ({
    suppliers: state.suppliers.suppliers,
    supplier: state.suppliers.supplier,
    pagination: state.suppliers.pagination,
    loading: state.suppliers.loading
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getSuppliers: (page, count, searchText) => dispatch({ type: GET_SUPPLIER_LIST, payload: { page, count, searchText } }),
    getSupplier: (id) => dispatch({ type: GET_SUPPLIER_DETAILS, payload: { id } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Supplier);