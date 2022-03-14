
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


const Supplier = ({ getSuppliers, getSupplier, suppliers, supplier }) => {

    const [createsupplier, setCreatesupplier] = useState(false)
    const [addSupplierButton, setAddSupplierButton] = useState(false)

    // Pagination
    const [ellipsisItem, setEllipsisItem] = useState(null);
    const [activePage, SetActivePage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(10);
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
        SetActivePage(activePage)
        setStartIndex((activePage - 1) * 10 + 1)
        setEndIndex((activePage - 1) * 10 + 10)

    }

    const resultRenderer = ({ supplier }) => <Label content={supplier} />


    useEffect(() => {
        getSuppliers()

    }, [])

    useEffect(() => {

        let totalcount = suppliers.length;
        let totalPages = Math.ceil(totalcount / 10);
        let ellipsis = totalPages > 10 ? undefined : null;
        // let activePage = 1
        setEllipsisItem(ellipsis)
        setTotalPages(totalPages)
        setSearchResult(suppliers)

    }, [suppliers])

    useEffect(()=>{
        if(searchText)
        {
            const re = new RegExp(_.escapeRegExp(searchText), 'i')
            const searchResult1 = suppliers.filter(result => re.test(result.supplierName))
            setSearchResult(searchResult1)
        }
       
    },[searchText])

    const handleSearchChange = (e,data) => {
        setSearchText(data.value)
      
    }

    const handleSelectSearchedRow = (id) => {
        setSearchResult([])
        setSearchText('')
        handleViewSupplier(id)
    }

    return (<div>
        <Header>Supplier</Header>

        <Segment textAlign="right">
            <Button active={addSupplierButton} onClick={handleAddSupplier}><Icon name="plus"></Icon> Add Supplier</Button>
        </Segment>

        <Grid columns={2} celled>
            <Grid.Column>
              
                <Input onChange={_.debounce(handleSearchChange, 500, {
                        leading: true,
                    })} icon="search" value={searchText}></Input>
               

               <p >
                  {  searchText && `Search Results of  ${searchText}`} 
               </p>
                <Table celled>
                    <TableHeader Headers={['Id', 'Name', 'Status', 'Action']}></TableHeader>


                    <TableBody>
                        {
                            searchText && 
                           searchResult.filter((x, i) => i >= startIndex && i <= endIndex)
                          .map(x => (<TableRow  onClick={()=>{ handleSelectSearchedRow(x.id)}} key={'supplier-' + x.id}><TableCell >{x.id}</TableCell><TableCell >{x.supplierName}</TableCell><TableCell >{x.status ? 'Enable' : 'Disable'}</TableCell></TableRow>))}
                        
                        {!searchText && suppliers.filter((x, i) => i >= startIndex && i <= endIndex)
                            .map(x => (<TableRow key={'supplier-' + x.id}><TableCell >{x.id}</TableCell><TableCell >{x.supplierName}</TableCell><TableCell >{x.status ? 'Enable' : 'Disable'}</TableCell><TableCell><Icon name="edit" onClick={() => { handleViewSupplier(x.id) }}></Icon></TableCell></TableRow>))}
                    </TableBody>
                  
                </Table>
                <PaginationCompact
                    activePage={activePage}
                    totalPages={totalPages}
                    ellipsisItem={ellipsisItem}
                    handlePaginationChange={handlePaginationChange}
                ></PaginationCompact>
            </Grid.Column>
            <Grid.Column>
                {createsupplier ? <AddSupplier handleAddSupplier={handleAddSupplier}></AddSupplier> : Object.values(supplier).length ? <SupplierDetails handleAddSupplier={handleAddSupplier}></SupplierDetails> : <div></div>}

            </Grid.Column>
        </Grid>

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
    supplier: state.suppliers.supplier
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getSuppliers: () => dispatch({ type: GET_SUPPLIER_LIST }),
    getSupplier: (id) => dispatch({ type: GET_SUPPLIER_DETAILS, payload: { id } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Supplier);