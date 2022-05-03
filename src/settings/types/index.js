
import React, { useEffect, useState } from "react";
import { Button, Container, Grid, GridColumn, GridRow, Header, Icon, Input, Label, Search, Segment, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import TableHeader from "../../layout/TableHeader";
import AddType from "./addType";
import TypeDetails from "./typeDetails";
import PropTypes from 'prop-types';


// bring connect from react-redux, it's the bridge for connecting component to redux
import { connect } from 'react-redux'
import { GET_TYPE_LIST, GET_TYPE_DETAILS } from "../../redux/actions";

import PaginationCompact from "../../layout/pagination";
import _ from "lodash";
import SettingSidebarPage from "../settingSidebar";
import TableLoaderPage from "../../components/TableLoader";
import TableNoRecordFound from "../../components/TableNoRecordFound";
import { useHistory } from "react-router-dom";


const Types = ({ getTypes, getType, types, type, pagination, error, loading }) => {

        const history = useHistory()
    const [createtype, setCreatetype] = useState(false)
    const [addtypeButton, setAddtypeButton] = useState(false)

    // Pagination
    const [ellipsisItem, setEllipsisItem] = useState(null);
    const [activePage, SetActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Search 
    const [searchText, setSearchText] = useState('')

    const handleAddType = function (value = true) {
        history.push(`/types/add`)
    }



    const handleViewType = (id) => {
        history.push(`/types/${id}`)
    }

    const handlePaginationChange = (e, { activePage }) => {
        getTypes(activePage, 10, searchText)

    }

    useEffect(() => {
        getTypes(1, 10, searchText)

    }, [])

    useEffect(() => {
        let ellipsis = pagination.totalPages > 10 ? undefined : null;
        // let activePage = 1
        setEllipsisItem(ellipsis)
        setTotalPages(pagination.totalPages)
        SetActivePage(pagination.currentPage)
        setCreatetype(false)
        setAddtypeButton(false)


    }, [types, pagination])

    useEffect(() => {
        getTypes(1, 10, searchText)

    }, [searchText])

    const handleSearchChange = (e, data) => {
        setSearchText(data.value)

    }

    const handleSelectSearchedRow = (id) => {
        setSearchText('')
        handleViewType(id)
    }

    return (<Container>
        <Header>Types</Header>

        <Grid>
            <GridRow columns={2}>
                <GridColumn>
                    <SettingSidebarPage activeItem={'types'}></SettingSidebarPage>
                </GridColumn>
                <GridColumn textAlign="right">

                    <Button active={addtypeButton} onClick={handleAddType} color="green"><Icon name="plus"></Icon> Add type</Button>
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
                        {(loading == false && types.length == 0) && (<TableNoRecordFound></TableNoRecordFound>)}
                        {!loading && (types || []).map(x => (<TableRow key={'type-' + x._id}><TableCell >{x._id}</TableCell><TableCell >{x.typeName}</TableCell><TableCell >{x.status ? 'Enable' : 'Disable'}</TableCell><TableCell><Icon name="eye" onClick={() => { handleViewType(x._id) }}></Icon></TableCell></TableRow>))}
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

Types.propTypes = {
    loading: PropTypes.bool,
    types: PropTypes.array,
    type: PropTypes.object,
    getTypes: PropTypes.func.isRequired,
    getType: PropTypes.func.isRequired
}



const mapStateToProps = (state) => ({
    types: state.types.types,
    type: state.types.type,
    pagination: state.types.pagination,
    error: state.types.error,
    loading: state.types.loading

    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getTypes: (page, count, searchText) => dispatch({ type: GET_TYPE_LIST, payload: { page, count, searchText } }),
    getType: (id) => dispatch({ type: GET_TYPE_DETAILS, payload: { id } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Types);