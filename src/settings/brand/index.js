import React, { useEffect, useState } from "react";
import { Button, Container, Grid, GridColumn, GridRow, Header, Icon, Input, Segment, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import TableHeader from "../../layout/TableHeader";
import AddBrand from "./addBrand";
import BrandDetails from "./brandDetails";
import PropTypes from 'prop-types';


// bring connect from react-redux, it's the bridge for connecting component to redux
import { connect } from 'react-redux'
import { GET_BRAND_DETAILS, GET_BRAND_LIST } from "../../redux/actions";

import PaginationCompact from "../../layout/pagination";
import _ from "lodash";
import TableLoaderPage from "../../components/TableLoader";
import TableNoRecordFound from "../../components/TableNoRecordFound";
import { useHistory } from "react-router-dom";
import SettingSidebarPage from "../settingSidebar";


const Brand = ({ getBrands, getBrand, brands, brand, pagination, loading }) => {

    const history = useHistory()
    const [createBrand, setCreateBrand] = useState(false)
    const [addBrandButton, setAddBrandButton] = useState(false)

    // Pagination
    const [ellipsisItem, setEllipsisItem] = useState(null);
    const [activePage, SetActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Search 
    const [searchText, setSearchText] = useState('')

    const handleAddBrand = function (value = true) {
        history.push(`/brand/add`)
    }



    const handleViewBrand = (id) => {
        history.push(`/brand/${id}`)
    }

    const handlePaginationChange = (e, { activePage }) => {
        getBrands(activePage, 10, searchText)

    }

    useEffect(() => {
        getBrands(1, 10, searchText)

    }, [])

    useEffect(() => {
        let ellipsis = pagination.totalPages > 10 ? undefined : null;
        setEllipsisItem(ellipsis)
        setTotalPages(pagination.totalPages)
        SetActivePage(pagination.currentPage)

    }, [brands, pagination])

    useEffect(() => {
        getBrands(1, 10, searchText)

    }, [searchText])

    const handleSearchChange = (e, data) => {
        setSearchText(data.value)

    }

    const handleSelectSearchedRow = (id) => {
        setSearchText('')
        handleViewBrand(id)
    }

    return (<Container>
        <Header>Brands</Header>

        <Grid>
            <GridRow columns={2}>
                <GridColumn>
                    <SettingSidebarPage activeItem={'brand'} ></SettingSidebarPage>
                </GridColumn>
                <GridColumn textAlign="right">
                    <Button active={addBrandButton} onClick={handleAddBrand} color="green"><Icon name="plus"></Icon> Add Brand</Button>
                </GridColumn>
            </GridRow>
        </Grid>

        <Grid columns={1} celled>
            <Grid.Column>

                <Input onChange={_.debounce(handleSearchChange, 500, {
                    leading: true,
                })} icon="search" value={searchText}></Input>


                <p >
                    {searchText && `Search Results of  ${searchText}`}
                </p>
                <Table celled>
                    <TableHeader Headers={['Id', 'Name', 'Status', 'Action']}></TableHeader>


                    <TableBody>
                        {loading && <TableLoaderPage colSpan={4}></TableLoaderPage>}
                        {(loading == false && brands.length == 0) && (<TableNoRecordFound></TableNoRecordFound>)}
                        {!loading && (brands || []).map(x => (<TableRow key={'brand-' + x._id}><TableCell >{x._id}</TableCell><TableCell >{x.brandName}</TableCell><TableCell >{x.status ? 'Enable' : 'Disable'}</TableCell><TableCell><Icon name="eye" onClick={() => { handleViewBrand(x._id) }}></Icon></TableCell></TableRow>))}
                    </TableBody>

                </Table>
                <PaginationCompact
                    activePage={activePage}
                    totalPages={totalPages}
                    ellipsisItem={ellipsisItem}
                    handlePaginationChange={handlePaginationChange}
                ></PaginationCompact>
            </Grid.Column>
         
        </Grid>

    </Container>)

}

Brand.propTypes = {
    loading: PropTypes.bool,
    brands: PropTypes.array,
    brand: PropTypes.object,
    getBrands: PropTypes.func.isRequired,
    getBrand: PropTypes.func.isRequired
}



const mapStateToProps = (state) => ({
    brands: state.brands.brands,
    brand: state.brands.brand,
    pagination: state.brands.pagination,
    loading: state.brands.loading
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getBrands: (page, count, searchText) => dispatch({ type: GET_BRAND_LIST, payload: { page, count, searchText } }),
    getBrand: (id) => dispatch({ type: GET_BRAND_DETAILS, payload: { id } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Brand);