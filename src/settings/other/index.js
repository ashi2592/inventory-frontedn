
import React, { useEffect, useState } from "react";
import { Button, Grid, Header, Icon, Input, Label, Search, Segment, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import TableHeader from "../../layout/TableHeader";
import AddOther from "./addOther";
import OtherDetails from "./otherDetails";
import PropTypes from 'prop-types';


// bring connect from react-redux, it's the bridge for connecting component to redux
import { connect } from 'react-redux'
import { GET_OTHER_DETAILS, GET_OTHER_LIST } from "../../redux/actions";

import PaginationCompact from "../../layout/pagination";
import _ from "lodash";


const Color = ({ getOther, getOthers, others, other , pagination, error }) => {

    const [createcolor, setCreateOther] = useState(false)
    const [addOtherButton, setAddOtherButton] = useState(false)

    // Pagination
    const [ellipsisItem, setEllipsisItem] = useState(null);
    const [activePage, SetActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Search 
    const [searchText, setSearchText] = useState('')

    const handleAddOther = function (value = true) {
        setCreateOther(value)
        setAddOtherButton(value)
    }



    const handleViewOther = (id) => {
        getOther(id)
        setCreateOther(false)
        setAddOtherButton(false)
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

    return (<div>

        <Segment textAlign="right">
            <Header textAlign="left">Colors</Header>

            <Button active={addOtherButton} onClick={handleAddOther}><Icon name="plus"></Icon> Add Other Values</Button>
        </Segment>

        <Grid columns={2} celled>
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

                        {others && others.map(x => (<TableRow key={'color-' + x._id}><TableCell >{x._id}</TableCell><TableCell >{x.keyName}</TableCell><TableCell >{x.value}</TableCell><TableCell >{x.status ? 'Enable' : 'Disable'}</TableCell><TableCell><Icon name="edit" onClick={() => { handleViewOther(x._id) }}></Icon></TableCell></TableRow>))}
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
                {createcolor ? <AddOther handleAddOther={handleAddOther}></AddOther> : Object.values(other).length ? <OtherDetails handleAddOther={handleAddOther}></OtherDetails> : <div></div>}

            </Grid.Column>
        </Grid>

    </div>)

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
    error: state.others.error
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getOthers: (page, count, searchText) => dispatch({ type: GET_OTHER_LIST, payload: { page, count, searchText } }),
    getOther: (id) => dispatch({ type: GET_OTHER_DETAILS, payload: { id } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Color);