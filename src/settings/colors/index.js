
import React, { useEffect, useState } from "react";
import { Button, Container, Grid, GridColumn, GridRow, Header, Icon, Image, Input, Label, Search, Segment, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import TableHeader from "../../layout/TableHeader";
import AddColor from "./addColors";
import ColorDetails from "./colorDetails";
import PropTypes from 'prop-types';


// bring connect from react-redux, it's the bridge for connecting component to redux
import { connect } from 'react-redux'
import { GET_COLOR_DETAILS, GET_COLOR_LIST } from "../../redux/actions";

import PaginationCompact from "../../layout/pagination";
import _ from "lodash";
import SettingSidebarPage from "../settingSidebar";
import { useParams } from "react-router-dom";
import TableLoaderPage from "../../components/TableLoader";
import TableNoRecordFound from "../../components/TableNoRecordFound";
import { useHistory } from "react-router-dom";


const Color = ({ getColors, colors, color, pagination, error, loading }) => {

    const history = useHistory()


    const [createcolor, setCreateColor] = useState(false)
    const [addcolorButton, setAddColorButton] = useState(false)

    // Pagination
    const [ellipsisItem, setEllipsisItem] = useState(null);
    const [activePage, SetActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Search 
    const [searchText, setSearchText] = useState('')

    const handleAddColor = function (value = true) {
        history.push(`/colors/add`)
    }

    const handleViewColors = (id) => {
        history.push(`/colors/${id}`)
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


    return (<Container>
        <Header textAlign="left">Colors</Header>


        <Grid>
            <GridRow columns={2}>
                <GridColumn >
                    <SettingSidebarPage activeItem={'color'}></SettingSidebarPage>
                </GridColumn>
                <GridColumn textAlign="right"  >

                    <Button active={addcolorButton} color="green" onClick={handleAddColor}><Icon name="plus"></Icon> Add color</Button>
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
                    <TableHeader Headers={['Id', 'image', 'Name', 'Status', 'Action']}></TableHeader>

                    <TableBody>
                        {loading && <TableLoaderPage colSpan={4}></TableLoaderPage>}

                        {(loading == false && colors.length == 0) && (<TableNoRecordFound></TableNoRecordFound>)}
                        {!loading && colors.map(x => (<TableRow key={'color-' + x._id}>
                            <TableCell >{x._id}</TableCell>
                            <TableCell><button class="circular ui icon button"  style={{'background':x.colorCode || 'grey'}}>
                               
                            </button>
                            </TableCell>
                            <TableCell >{x.colorName}</TableCell><TableCell >{x.status ? 'Enable' : 'Disable'}</TableCell><TableCell><Icon name="eye" onClick={() => { handleViewColors(x._id) }}></Icon></TableCell></TableRow>))}
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

    </Container>
    )

}

Color.propTypes = {
    loading: PropTypes.bool,
    colors: PropTypes.array,
    color: PropTypes.object,
    getColors: PropTypes.func.isRequired,
}



const mapStateToProps = (state) => ({
    colors: state.colors.colors,
    color: state.colors.color,
    pagination: state.colors.pagination,
    error: state.colors.error,
    loading: state.colors.loading
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getColors: (page, count, searchText) => dispatch({ type: GET_COLOR_LIST, payload: { page, count, searchText } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Color);