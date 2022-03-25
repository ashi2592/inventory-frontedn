
import React, { useEffect, useState } from "react";
import { Button, Grid, Header, Icon, Input, Label,  Segment, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import TableHeader from "../../layout/TableHeader";
import AddCategory from "./addCategory";
import PropTypes from 'prop-types';


// bring connect from react-redux, it's the bridge for connecting component to redux
import { connect } from 'react-redux'
import { GET_CATEGORY_DETAILS, GET_CATEGORY_LIST } from "../../redux/actions";
import CategoryDetails from "./CategoryDetails";
import PaginationCompact from "../../layout/pagination";
import _ from "lodash";


const Category = ({ getCategories, getCategory, categories, category,pagination }) => {

    const [createCategory, setCreateCategory] = useState(false)
    const [addCategoryButton, setAddCategoryButton] = useState(false)

    // Pagination
    const [ellipsisItem, setEllipsisItem] = useState(null);
    const [activePage, SetActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchResult, setSearchResult] = useState([])

    // Search 
    const [searchText, setSearchText] = useState('')

    const handleAddCategory = function (value = true) {
        setCreateCategory(value)
        setAddCategoryButton(value)
    }

    const handleViewCategory = (id) => {
        getCategory(id)
        setCreateCategory(false)
        setAddCategoryButton(false)
    }
    const handlePaginationChange = (e, { activePage }) => {
        getCategories(activePage,10,searchText)
    }

   useEffect(() => {
        getCategories(1,10,searchText)
    }, [])

    useEffect(() => {
        let ellipsis = pagination.totalPages > 10 ? undefined : null;
        setEllipsisItem(ellipsis)
        setTotalPages(pagination.totalPages)
        SetActivePage(pagination.currentPage)
    }, [categories,pagination])

    useEffect(()=>{
        getCategories(1,10,searchText)
       
    },[searchText])

    const handleSearchChange = (e,data) => {
        setSearchText(data.value)
      
    }

    const handleSelectSearchedRow = (id) => {
        setSearchResult([])
        setSearchText('')
        handleViewCategory(id)
    }

    return (<div>
        <Header>Category</Header>

        <Segment textAlign="right">
            <Button active={addCategoryButton} onClick={handleAddCategory}><Icon name="plus"></Icon> Add Category</Button>
        </Segment>

        <Grid columns={2} celled>
            <Grid.Column>
              
                <Input onChange={_.debounce(handleSearchChange, 500, {
                        leading: true,
                    })} icon="search" value={searchText}></Input>
               

               <p >
                  {  searchText && `Search Results of  ${searchText}`} 
               </p>
                <Table celled>
                    <TableHeader Headers={['Id', 'Name', 'Status', 'Action']}></TableHeader>


                    <TableBody>
                        { categories.map(x => (<TableRow key={'category-' + x._id}><TableCell >{x._id}</TableCell><TableCell >{x.categoryName}</TableCell><TableCell >{x.status ? 'Enable' : 'Disable'}</TableCell><TableCell><Icon name="edit" onClick={() => { handleViewCategory(x._id) }}></Icon></TableCell></TableRow>))}
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
                {createCategory ? <AddCategory handleAddCategory={handleAddCategory}></AddCategory> : Object.values(category).length ? <CategoryDetails handleAddCategory={handleAddCategory}></CategoryDetails> : <div></div>}

            </Grid.Column>
        </Grid>

    </div>)

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
    pagination: state.category.pagination
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getCategories: (page,count,searchText) => dispatch({ type: GET_CATEGORY_LIST, payload:  {page,count,searchText}}),
    getCategory: (id) => dispatch({ type: GET_CATEGORY_DETAILS, payload: { id } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Category);