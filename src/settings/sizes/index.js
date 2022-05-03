
import React, { useEffect, useState } from "react";
import { Button, Container, Grid, GridColumn, GridRow, Header, Icon, Image, Input, Label, Search, Segment, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import TableHeader from "../../layout/TableHeader";
import AddSize from "./addSize";
import SizeDetails from "./sizeDetails";
import PropTypes from 'prop-types';


// bring connect from react-redux, it's the bridge for connecting component to redux
import { connect } from 'react-redux'

import PaginationCompact from "../../layout/pagination";
import _ from "lodash";
import { GET_SIZE_DETAILS, GET_SIZE_LIST } from "../../redux/actions";
import SettingSidebarPage from "../settingSidebar";
import TableLoaderPage from "../../components/TableLoader";
import TableNoRecordFound from "../../components/TableNoRecordFound";
import { useHistory } from "react-router-dom";


const SizeFunction = ({ getSizes, getSize, sizes, size, pagination, error, loading }) => {

    const history = useHistory();
    const [createSize, setCreateSize] = useState(false)
    const [addSizeButton, setAddSizeButton] = useState(false)

    // Pagination
    const [ellipsisItem, setEllipsisItem] = useState(null);
    const [activePage, SetActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Search 
    const [searchText, setSearchText] = useState('')

    const handleAddSize = function (value = true) {
        history.push(`/sizes/add`)
    }



    const handleViewSize = (id) => {
        // getSize(id)
        // setCreateSize(false)
        // setAddSizeButton(false)
        history.push(`/sizes/${id}`)

    }

    const handlePaginationChange = (e, { activePage }) => {
        getSizes(activePage, 10, searchText)

    }

    useEffect(() => {
        getSizes(1, 10, searchText)

    }, [])

    useEffect(() => {
        let ellipsis = pagination.totalPages > 10 ? undefined : null;
        // let activePage = 1
        setEllipsisItem(ellipsis)
        setTotalPages(pagination.totalPages)
        SetActivePage(pagination.currentPage)

    }, [sizes, pagination])

    useEffect(() => {
        getSizes(1, 10, searchText)
    }, [searchText])

    const handleSearchChange = (e, data) => {
        setSearchText(data.value)

    }

    const handleSelectSearchedRow = (id) => {
        setSearchText('')
        handleViewSize(id)
    }

    return (<Container>
        <Header>Sizes</Header>

        <Grid>
            <GridRow columns={2}>
                <GridColumn>
                    <SettingSidebarPage activeItem={'sizes'}></SettingSidebarPage>
                </GridColumn>
                <GridColumn textAlign="right">
                    <Button active={addSizeButton} onClick={handleAddSize} color="green"><Icon name="plus"></Icon> Add Size</Button>

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
                        {(loading == false && sizes.length == 0) && (<TableNoRecordFound></TableNoRecordFound>)}
                        {!loading && (sizes || []).map(x => (<TableRow key={'size-' + x._id}><TableCell >{x._id}</TableCell><TableCell >{x.sizeName}</TableCell><TableCell >{x.status ? 'Enable' : 'Disable'}</TableCell><TableCell><Icon name="eye" onClick={() => { handleViewSize(x._id) }}></Icon></TableCell></TableRow>))}
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

SizeFunction.propTypes = {
    loading: PropTypes.bool,
    sizes: PropTypes.array,
    size: PropTypes.object,
    getSizes: PropTypes.func.isRequired,
    getSize: PropTypes.func.isRequired
}



const mapStateToProps = (state) => ({
    sizes: state.sizes.sizes,
    size: state.sizes.size,
    pagination: state.sizes.pagination,
    error: state.sizes.error,
    loading: state.sizes.loading

    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getSizes: (page, count, searchText) => dispatch({ type: GET_SIZE_LIST, payload: { page, count, searchText } }),
    getSize: (id) => dispatch({ type: GET_SIZE_DETAILS, payload: { id } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(SizeFunction);