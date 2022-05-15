
import React, { useEffect, useState } from "react";
import { Button, Container, Grid, GridColumn, GridRow, Header, Icon, Image, Input, Label, Search, Segment, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import TableHeader from "../../layout/TableHeader";

// bring connect from react-redux, it's the bridge for connecting component to redux
import { connect } from 'react-redux'

import PaginationCompact from "../../layout/pagination";
import _ from "lodash";
import {  GET_PATTERN_LIST } from "../../redux/actions";
import SettingSidebarPage from "../settingSidebar";
import TableLoaderPage from "../../components/TableLoader";
import TableNoRecordFound from "../../components/TableNoRecordFound";
import { useHistory } from "react-router-dom";


const PatternListPage = ({ getPatterns, patterns, pagination, error, loading }) => {

    const history = useHistory();
    // Pagination
    const [ellipsisItem, setEllipsisItem] = useState(null);
    const [activePage, SetActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Search 
    const [searchText, setSearchText] = useState('')

    const handleAddPattern = function (value = true) {
        history.push(`/pattern/add`)
    }



    const handleViewPattern = (id) => {
        history.push(`/pattern/${id}`)

    }

    const handlePaginationChange = (e, { activePage }) => {
        getPatterns(activePage, 10, searchText)

    }

    useEffect(() => {
        getPatterns(1, 10, searchText)
        console.log("I am starter")
    }, [])

    useEffect(() => {
        let ellipsis = pagination.totalPages > 10 ? undefined : null;
        // let activePage = 1
        setEllipsisItem(ellipsis)
        setTotalPages(pagination.totalPages)
        SetActivePage(pagination.currentPage)

    }, [patterns, pagination])

    useEffect(() => {
        getPatterns(1, 10, searchText)
    }, [searchText])

    const handleSearchChange = (e, data) => {
        setSearchText(data.value)

    }

    return (<Container>
        <Header>patterns</Header>

        <Grid>
            <GridRow columns={2}>
                <GridColumn>
                    <SettingSidebarPage activeItem={'pattern'}></SettingSidebarPage>
                </GridColumn>
                <GridColumn textAlign="right">
                    <Button  onClick={handleAddPattern} color="green"><Icon name="plus"></Icon> Add Pattern</Button>

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
                        {(loading == false && patterns.length == 0) && (<TableNoRecordFound></TableNoRecordFound>)}
                        {!loading && (patterns || []).map(x => (<TableRow key={'size-' + x._id}><TableCell >{x._id}</TableCell>
                            <TableCell >{x.patternName}</TableCell>
                            <TableCell >{x.status ? 'Enable' : 'Disable'}</TableCell>
                            <TableCell><Icon name="eye" onClick={() => { handleViewPattern(x._id) }}></Icon></TableCell>
                        </TableRow>))}
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



const mapStateToProps = (state) => ({
    patterns: state.patterns.patterns,
    pagination: state.patterns.pagination,
    error: state.patterns.error,
    loading: state.patterns.loading

    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getPatterns: (page, count, searchText) => dispatch({ type: GET_PATTERN_LIST, payload: { page, count, searchText } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(PatternListPage);