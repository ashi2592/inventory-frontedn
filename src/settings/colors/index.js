
import React, { useEffect, useState } from "react";
import { Button, Grid, Header, Icon, Input, Label, Search, Segment, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import TableHeader from "../../layout/TableHeader";
import AddColor from "./addColors";
import ColorDetails from "./colorDetails";
import PropTypes from 'prop-types';


// bring connect from react-redux, it's the bridge for connecting component to redux
import { connect } from 'react-redux'
import { GET_COLOR_DETAILS, GET_COLOR_LIST } from "../../redux/actions";

import PaginationCompact from "../../layout/pagination";
import _ from "lodash";


const Color = ({ getColors, getColor, colors, color,pagination,error }) => {

    const [createcolor, setCreateColor] = useState(false)
    const [addcolorButton, setAddColorButton] = useState(false)

    // Pagination
    const [ellipsisItem, setEllipsisItem] = useState(null);
    const [activePage, SetActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Search 
    const [searchText, setSearchText] = useState('')

    const handleAddColor = function (value = true) {
        setCreateColor(value)
        setAddColorButton(value)
    }



    const handleViewColors = (id) => {
        getColor(id)
        setCreateColor(false)
        setAddColorButton(false)
    }

    const handlePaginationChange = (e, { activePage }) => {
        getColors(activePage, 10, searchText)

    }

    useEffect(() => {
        getColors(1, 10, searchText)

    }, [])

    useEffect(() => {

        let ellipsis = pagination.totalPages > 10 ? undefined : null;
        // let activePage = 1
        setEllipsisItem(ellipsis)
        setTotalPages(pagination.totalPages)
        SetActivePage(pagination.currentPage)

    }, [colors, pagination])

    useEffect(() => {
        getColors(1, 10, searchText)

    }, [searchText])

    const handleSearchChange = (e, data) => {
        setSearchText(data.value)

    }

    const handleSelectSearchedRow = (id) => {

        setSearchText('')
        handleViewColors(id)
    }

    return (<div>

        <Segment textAlign="right">
            <Header textAlign="left">Colors</Header>

            <Button active={addcolorButton} onClick={handleAddColor}><Icon name="plus"></Icon> Add color</Button>
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
                    <TableHeader Headers={['Id', 'Name', 'Status', 'Action']}></TableHeader>


                    <TableBody>

                        {!searchText && colors.map(x => (<TableRow key={'color-' + x._id}><TableCell >{x._id}</TableCell><TableCell >{x.colorName}</TableCell><TableCell >{x.status ? 'Enable' : 'Disable'}</TableCell><TableCell><Icon name="edit" onClick={() => { handleViewColors(x._id) }}></Icon></TableCell></TableRow>))}
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
                {createcolor ? <AddColor handleAddColor={handleAddColor}></AddColor> : Object.values(color).length ? <ColorDetails handleAddColor={handleAddColor}></ColorDetails> : <div></div>}

            </Grid.Column>
        </Grid>

    </div>)

}

Color.propTypes = {
    loading: PropTypes.bool,
    colors: PropTypes.array,
    color: PropTypes.object,
    getColors: PropTypes.func.isRequired,
    getColor: PropTypes.func.isRequired
}



const mapStateToProps = (state) => ({
    colors: state.colors.colors,
    color: state.colors.color,
    pagination: state.colors.pagination,
    error:state.colors.error
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getColors: (page, count, searchText) => dispatch({ type: GET_COLOR_LIST, payload: { page, count, searchText } }),
    getColor: (id) => dispatch({ type: GET_COLOR_DETAILS, payload: { id } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Color);