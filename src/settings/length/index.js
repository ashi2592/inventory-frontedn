
import React, { useEffect, useState } from "react";
import { Button, Container, Grid, GridColumn, GridRow, Header, Icon, Image, Input, Label, Search, Segment, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import TableHeader from "../../layout/TableHeader";
import AddProductLenghtPage from "./addLength";
import ColorDetails from "./lengthDetails";
import PropTypes from 'prop-types';


// bring connect from react-redux, it's the bridge for connecting component to redux
import { connect } from 'react-redux'
import { GET_COLOR_DETAILS, GET_COLOR_LIST, GET_LENGTH_DETAILS, GET_LENGTH_LIST } from "../../redux/actions";

import PaginationCompact from "../../layout/pagination";
import _ from "lodash";
import SettingSidebarPage from "../settingSidebar";
import { useParams } from "react-router-dom";
import TableLoaderPage from "../../components/TableLoader";
import TableNoRecordFound from "../../components/TableNoRecordFound";
import { useHistory } from "react-router-dom";


const LenghtPage = ({ getLenghts, getLenght, productLengths, productLength, pagination, error,loading }) => {


const history = useHistory()
    const [createcolor, setCreateColor] = useState(false)
    const [addcolorButton, setAddColorButton] = useState(false)

    // Pagination
    const [ellipsisItem, setEllipsisItem] = useState(null);
    const [activePage, SetActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Search 
    const [searchText, setSearchText] = useState('')

    const handleAddLength = function (value = true) {
        history.push(`/length/add`)
    }

    const handleViewColors = (id) => {
        history.push(`/length/${id}`)
    }

    const handlePaginationChange = (e, { activePage }) => {
        getLenghts(activePage, 10, searchText)

    }

    useEffect(() => {
        getLenghts(1, 10, searchText)

    }, [])

    useEffect(() => {

        let ellipsis = pagination.totalPages > 10 ? undefined : null;
        // let activePage = 1
        setEllipsisItem(ellipsis)
        setTotalPages(pagination.totalPages)
        SetActivePage(pagination.currentPage)

    }, [productLengths, pagination])

    useEffect(() => {
        getLenghts(1, 10, searchText)

    }, [searchText])

    const handleSearchChange = (e, data) => {
        setSearchText(data.value)

    }

    const handleSelectSearchedRow = (id) => {

        setSearchText('')
        handleViewColors(id)
    }

    return (<Container>
        <Header textAlign="left">Length</Header>
       
            <Grid>
            <GridRow columns={2}>
                <GridColumn>
                <SettingSidebarPage activeItem={'length'}></SettingSidebarPage>
                </GridColumn>
                <GridColumn textAlign="right">
                <Button active={addcolorButton} color="green" onClick={handleAddLength}><Icon name="plus"></Icon> Add Length</Button>
         </GridColumn>
            </GridRow>
        </Grid>
        <Grid columns={1} celled>
            <Grid.Column>

                <Input onChange={_.debounce(handleSearchChange, 500, {
                    leading: true,
                })} placeholder="Search Length.." icon="search" value={searchText}></Input>


                <p >
                    {searchText && `Search Results of  ${searchText}`}
                </p>
                <Table celled>
                    <TableHeader Headers={['Id', 'Name', 'Status', 'Action']}></TableHeader>


                    <TableBody>
                    {loading && <TableLoaderPage colSpan={4}></TableLoaderPage>}
                        {(loading == false && productLengths.length == 0) && (<TableNoRecordFound></TableNoRecordFound>)}
                    
                        {!loading && productLengths.map(x => (<TableRow key={'color-' + x._id}><TableCell >{x._id}</TableCell><TableCell >{x.lengthName}</TableCell><TableCell >{x.status ? 'Enable' : 'Disable'}</TableCell><TableCell><Icon name="eye" onClick={() => { handleViewColors(x._id) }}></Icon></TableCell></TableRow>))}
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



const mapStateToProps = (state) => ({
    productLengths: state.productLengths.productLengths,
    productLength: state.productLengths.productLength,
    pagination: state.productLengths.pagination,
    error: state.productLengths.error,
    loading: state.productLengths.loading

    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getLenghts: (page, count, searchText) => dispatch({ type: GET_LENGTH_LIST, payload: { page, count, searchText } }),
 
})

export default connect(mapStateToProps, mapDispatchToProps)(LenghtPage);