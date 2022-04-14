
import React, { useEffect, useState } from "react";
import { Button, Grid, Header, Icon, Input, Label, Search, Segment, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import TableHeader from "../../layout/TableHeader";
import AddSupplier from "./addSupplier";
import PropTypes from 'prop-types';


// bring connect from react-redux, it's the bridge for connecting component to redux
import { connect } from 'react-redux'
import { GET_SUPPLIER_DETAILS, GET_SUPPLIER_LIST } from "../../redux/actions";
import SupplierDetails from "./SupplierDetails";
import PaginationCompact from "../../layout/pagination";
import _ from "lodash";


const Supplier = ({ getSuppliers, getSupplier, suppliers, supplier, pagination }) => {

    const [createsupplier, setCreatesupplier] = useState(false)
    const [addSupplierButton, setAddSupplierButton] = useState(false)

    // Pagination
    const [ellipsisItem, setEllipsisItem] = useState(null);
    const [activePage, SetActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchResult, setSearchResult] = useState([])

    // Search 
    const [searchText, setSearchText] = useState('')

    const handleAddSupplier = function (value = true) {
        setCreatesupplier(value)
        setAddSupplierButton(value)
    }



    const handleViewSupplier = (id) => {
        getSupplier(id)
        setCreatesupplier(false)
        setAddSupplierButton(false)
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
        <div>
<Header>Supplier</Header>
            <Segment textAlign="right">
                <Button active={addSupplierButton} onClick={handleAddSupplier}><Icon name="plus"></Icon> Add Supplier</Button>
            </Segment>


            <div className="row">
                <div className="col-6">
                    <Input onChange={_.debounce(handleSearchChange, 500, {
                        leading: true,
                    })} icon="search" value={searchText}></Input>


                    <p >
                        {searchText && `Search Results of  ${searchText}`}
                    </p>
                    <Table celled>
                        <TableHeader Headers={['Id', 'Name', 'Contact', 'Location', 'Address', 'Action']}></TableHeader>


                        <TableBody>

                            {suppliers
                                .map(x => (<TableRow key={'supplier-' + x._id}><TableCell >{x._id}</TableCell>
                                    <TableCell >{x.supplierName}</TableCell>
                                    <TableCell >{x.contact}</TableCell>
                                    <TableCell >{x.location}</TableCell>
                                    <TableCell >{x.address}</TableCell>

                                    <TableCell><Icon name="edit" onClick={() => { handleViewSupplier(x._id) }}></Icon></TableCell></TableRow>))}
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
            <div className="row">
                <div className="col">
                    {createsupplier ? <AddSupplier handleAddSupplier={handleAddSupplier}></AddSupplier> : Object.values(supplier).length ? <SupplierDetails handleAddSupplier={handleAddSupplier}></SupplierDetails> : <div></div>}

                </div>

            </div>

        </div>)

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
    pagination: state.suppliers.pagination
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getSuppliers: (page, count, searchText) => dispatch({ type: GET_SUPPLIER_LIST, payload: { page, count, searchText } }),
    getSupplier: (id) => dispatch({ type: GET_SUPPLIER_DETAILS, payload: { id } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Supplier);