
import React, { useEffect, useState } from "react";
import { Button, Container, Grid, GridColumn, GridRow, Header, Icon, Image, Input, Label, Search, Segment, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import TableHeader from "../../layout/TableHeader";
import AddOther from "./addOther";
import OtherDetails from "./otherDetails";
import PropTypes from 'prop-types';


// bring connect from react-redux, it's the bridge for connecting component to redux
import { connect } from 'react-redux'
import { GET_OTHER_DETAILS, GET_OTHER_LIST } from "../../redux/actions";

import PaginationCompact from "../../layout/pagination";
import _ from "lodash";
import SettingSidebarPage from "../settingSidebar";
import TableLoaderPage from "../../components/TableLoader";
import TableNoRecordFound from "../../components/TableNoRecordFound";
import { useHistory } from "react-router-dom";


const Color = ({ getOther, getOthers, others, other, pagination, error, loading }) => {

    const history = useHistory()
    const [createcolor, setCreateOther] = useState(false)
    const [addOtherButton, setAddOtherButton] = useState(false)

    // Pagination
    const [ellipsisItem, setEllipsisItem] = useState(null);
    const [activePage, SetActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Search 
    const [searchText, setSearchText] = useState('')

    const handleAddOther = function (value = true) {
        history.push(`/others/add`)
    }



    const handleViewOther = (id) => {
        history.push(`/others/${id}`)
    }

    const handlePaginationChange = (e, { activePage }) => {
        getOthers(activePage, 10, searchText)

    }

    useEffect(() => {
        getOthers(1, 10, searchText)

    }, [])

    useEffect(() => {

        let ellipsis = pagination.totalPages > 10 ? undefined : null;
        // let activePage = 1
        setEllipsisItem(ellipsis)
        setTotalPages(pagination.totalPages)
        SetActivePage(pagination.currentPage)

    }, [others, pagination])

    useEffect(() => {
        getOthers(1, 10, searchText)

    }, [searchText])

    const handleSearchChange = (e, data) => {
        setSearchText(data.value)

    }

    const handleSelectSearchedRow = (id) => {

        setSearchText('')
        handleViewOther(id)
    }

    return (<Container>
        <Header textAlign="left">Other Information</Header>


        <Grid>
            <GridRow columns={2}>
                <GridColumn>
                    <SettingSidebarPage activeItem={'others'}></SettingSidebarPage>
                </GridColumn>
                <GridColumn textAlign="right">

                    <Button active={addOtherButton} onClick={handleAddOther} color="green"><Icon name="plus"></Icon> Add Other Values</Button>
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
                    <TableHeader Headers={['Id', 'Key', 'Value', 'Status', 'Action']}></TableHeader>


                    <TableBody>
                        {loading && <TableLoaderPage colSpan={4}></TableLoaderPage>}
                        {(loading == false && others.length == 0) && (<TableNoRecordFound></TableNoRecordFound>)}
                        {!loading && (others || []).map(x => (<TableRow key={'color-' + x._id}><TableCell >{x._id}</TableCell><TableCell >{x.keyName}</TableCell><TableCell >{x.value}</TableCell><TableCell >{x.status ? 'Enable' : 'Disable'}</TableCell><TableCell><Icon name="eye" onClick={() => { handleViewOther(x._id) }}></Icon></TableCell></TableRow>))}
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

Color.propTypes = {
    loading: PropTypes.bool,
    others: PropTypes.array,
    static: PropTypes.object,
    getOthers: PropTypes.func.isRequired,
    getOther: PropTypes.func.isRequired
}



const mapStateToProps = (state) => ({
    others: state.others.others,
    other: state.others.other,
    pagination: state.others.pagination,
    error: state.others.error,
    loading: state.others.loading
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getOthers: (page, count, searchText) => dispatch({ type: GET_OTHER_LIST, payload: { page, count, searchText } }),
    getOther: (id) => dispatch({ type: GET_OTHER_DETAILS, payload: { id } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Color);