
import React, { useEffect, useState } from "react";
import { Button, Container, Grid, GridColumn, GridRow, Header, Icon, Input, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import TableHeader from "../../layout/TableHeader";
import PropTypes from 'prop-types';


// bring connect from react-redux, it's the bridge for connecting component to redux
import { connect } from 'react-redux'
import { GET_CATEGORY_DETAILS, GET_CATEGORY_LIST } from "../../redux/actions";
import PaginationCompact from "../../layout/pagination";
import _ from "lodash";
import TableLoaderPage from "../../components/TableLoader";
import TableNoRecordFound from "../../components/TableNoRecordFound";
import { useHistory } from "react-router-dom";
import SettingSidebarPage from "../settingSidebar";


const Category = ({ getCategories, getCategory, categories, category, pagination, loading, error }) => {

    const history = useHistory()

    // Pagination
    const [ellipsisItem, setEllipsisItem] = useState(null);
    const [activePage, SetActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchResult, setSearchResult] = useState([])

    // Search 
    const [searchText, setSearchText] = useState('')

    const handleAddCategory = function (value = true) {
        history.push(`/category/add`)
    }

    const handleViewCategory = (id) => {
        history.push(`/category/${id}`)
    }
    const handlePaginationChange = (e, { activePage }) => {
        getCategories(activePage, 10, searchText)
    }

    useEffect(() => {
        getCategories(1, 10, searchText)
    }, [])

    useEffect(() => {
        let ellipsis = pagination.totalPages > 10 ? undefined : null;
        setEllipsisItem(ellipsis)
        setTotalPages(pagination.totalPages)
        SetActivePage(pagination.currentPage)
    }, [categories, pagination])

    useEffect(() => {
        getCategories(1, 10, searchText)

    }, [searchText])

    const handleSearchChange = (e, data) => {
        setSearchText(data.value)

    }

    const handleSelectSearchedRow = (id) => {
        setSearchResult([])
        setSearchText('')
        handleViewCategory(id)
    }

    return (<Container>
        <Header>Category</Header>

        <Grid>
            <GridRow columns={2}>
                <GridColumn>
                    <SettingSidebarPage activeItem={'category'} ></SettingSidebarPage>
                </GridColumn>
                <GridColumn textAlign="right">
                    <Button onClick={handleAddCategory} color="green"><Icon name="plus"></Icon> Add Category</Button>
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
                    <TableHeader Headers={['Id', 'Name', 'Parent', 'TAX (Gst)', 'HSN Code','Status', 'Action']}></TableHeader>
                    <TableBody>
                        {loading && <TableLoaderPage colSpan={4}></TableLoaderPage>}
                        {(loading == false && categories.length == 0) && (<TableNoRecordFound></TableNoRecordFound>)}
                        {categories.map(x => (<TableRow key={'category-' + x._id}>
                            <TableCell >{x._id}</TableCell>
                            <TableCell >{x.categoryName}</TableCell>
                            <TableCell >{x.parent?x.parent:''}</TableCell>
                            <TableCell >{x.taxPercent}</TableCell>
                            <TableCell >{x.hsncode}</TableCell>
                        

                            <TableCell >{x.status ? 'Enable' : 'Disable'}</TableCell>
                            <TableCell><Icon name="eye" onClick={() => { handleViewCategory(x._id) }}></Icon></TableCell>
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

Category.propTypes = {
    loading: PropTypes.bool,
    categories: PropTypes.array,
    category: PropTypes.object,
    getCategories: PropTypes.func.isRequired,
    getCategory: PropTypes.func.isRequired
}



const mapStateToProps = (state) => ({
    categories: state.category.categories,
    category: state.category.category,
    pagination: state.category.pagination,
    loading: state.category.loading,
    error: state.category.error,
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getCategories: (page, count, searchText) => dispatch({ type: GET_CATEGORY_LIST, payload: { page, count, searchText } }),
    getCategory: (id) => dispatch({ type: GET_CATEGORY_DETAILS, payload: { id } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Category);