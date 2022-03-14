
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


const Category = ({ getCategories, getCategory, categories, category }) => {

    const [createCategory, setCreateCategory] = useState(false)
    const [addCategoryButton, setAddCategoryButton] = useState(false)

    // Pagination
    const [ellipsisItem, setEllipsisItem] = useState(null);
    const [activePage, SetActivePage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(10);
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
        SetActivePage(activePage)
        setStartIndex((activePage - 1) * 10 + 1)
        setEndIndex((activePage - 1) * 10 + 10)

    }

    useEffect(() => {
        getCategories()

    }, [])

    useEffect(() => {

        let totalcount = categories.length;
        let totalPages = Math.ceil(totalcount / 10);
        let ellipsis = totalPages > 10 ? undefined : null;
        // let activePage = 1
        setEllipsisItem(ellipsis)
        setTotalPages(totalPages)
        setSearchResult(categories)

    }, [categories])

    useEffect(()=>{
        if(searchText)
        {
            const re = new RegExp(_.escapeRegExp(searchText), 'i')
            const searchResult1 = categories.filter(result => re.test(result.categoryName))
            setSearchResult(searchResult1)
        }
       
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
                        {
                            searchText && 
                           searchResult.filter((x, i) => i >= startIndex && i <= endIndex)
                          .map(x => (<TableRow  onClick={()=>{ handleSelectSearchedRow(x.id)}} key={'category-' + x.id}><TableCell >{x.id}</TableCell><TableCell >{x.categoryName}</TableCell><TableCell >{x.status ? 'Enable' : 'Disable'}</TableCell></TableRow>))}
                        
                        {!searchText && categories.filter((x, i) => i >= startIndex && i <= endIndex)
                            .map(x => (<TableRow key={'category-' + x.id}><TableCell >{x.id}</TableCell><TableCell >{x.categoryName}</TableCell><TableCell >{x.status ? 'Enable' : 'Disable'}</TableCell><TableCell><Icon name="edit" onClick={() => { handleViewCategory(x.id) }}></Icon></TableCell></TableRow>))}
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
    category: state.category.category
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getCategories: () => dispatch({ type: GET_CATEGORY_LIST }),
    getCategory: (id) => dispatch({ type: GET_CATEGORY_DETAILS, payload: { id } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Category);