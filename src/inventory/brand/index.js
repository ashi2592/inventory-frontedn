import React, { useEffect, useState } from "react";
import { Button, Grid, Header, Icon, Input,  Segment, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import TableHeader from "../../layout/TableHeader";
import AddBrand from "./addBrand";
import BrandDetails from "./brandDetails";
import PropTypes from 'prop-types';


// bring connect from react-redux, it's the bridge for connecting component to redux
import { connect } from 'react-redux'
import { GET_BRAND_DETAILS, GET_BRAND_LIST } from "../../redux/actions";

import PaginationCompact from "../../layout/pagination";
import _ from "lodash";


const Brand = ({ getBrands, getBrand, brands, brand, pagination}) => {

    const [createBrand, setCreateBrand] = useState(false)
    const [addBrandButton, setAddBrandButton] = useState(false)

    // Pagination
    const [ellipsisItem, setEllipsisItem] = useState(null);
    const [activePage, SetActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Search 
    const [searchText, setSearchText] = useState('')

    const handleAddBrand = function (value = true) {
        setCreateBrand(value)
        setAddBrandButton(value)
    }



    const handleViewBrand = (id) => {
        console.log(id)
        getBrand(id)
        setCreateBrand(false)
        setAddBrandButton(false)
    }

    const handlePaginationChange = (e, { activePage }) => {
        getBrands(activePage,10,searchText)
      
    }

    useEffect(() => {
        getBrands(1,10,searchText)

    }, [])

    useEffect(() => {
        let ellipsis = pagination.totalPages > 10 ? undefined : null;
        setEllipsisItem(ellipsis)
        setTotalPages(pagination.totalPages)
        SetActivePage(pagination.currentPage)

    }, [brands,pagination])

    useEffect(()=>{
        getBrands(1,10,searchText)
       
    },[searchText])

    const handleSearchChange = (e,data) => {
        setSearchText(data.value)
      
    }

    const handleSelectSearchedRow = (id) => {
        setSearchText('')
        handleViewBrand(id)
    }

    return (<div>
        <Header>Brands</Header>

        <Segment textAlign="right">
            <Button active={addBrandButton} onClick={handleAddBrand}><Icon name="plus"></Icon> Add Brand</Button>
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
                  
                        { brands.map(x => (<TableRow key={'brand-' + x._id}><TableCell >{x._id}</TableCell><TableCell >{x.brandName}</TableCell><TableCell >{x.status ? 'Enable' : 'Disable'}</TableCell><TableCell><Icon name="edit" onClick={() => { handleViewBrand(x._id) }}></Icon></TableCell></TableRow>))}
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
                {createBrand ? <AddBrand handleAddBrand={handleAddBrand}></AddBrand> : Object.values(brand).length ? <BrandDetails handleAddBrand={handleAddBrand}></BrandDetails> : <div></div>}

            </Grid.Column>
        </Grid>

    </div>)

}

Brand.propTypes = {
    loading: PropTypes.bool,
    brands: PropTypes.array,
    brand: PropTypes.object,
    getBrands: PropTypes.func.isRequired,
    getBrand: PropTypes.func.isRequired
}



const mapStateToProps = (state) => ({
    brands: state.brand.brands,
    brand: state.brand.brand,
    pagination: state.brand.pagination
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getBrands: (page,count,searchText) => dispatch({ type: GET_BRAND_LIST , payload:  {page,count,searchText}}),
    getBrand: (id) => dispatch({ type: GET_BRAND_DETAILS, payload: { id } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Brand);