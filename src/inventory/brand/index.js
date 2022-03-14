
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


const Brand = ({ getBrands, getBrand, brands, brand }) => {

    const [createBrand, setCreateBrand] = useState(false)
    const [addBrandButton, setAddBrandButton] = useState(false)

    // Pagination
    const [ellipsisItem, setEllipsisItem] = useState(null);
    const [activePage, SetActivePage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [searchResult, setSearchResult] = useState([])

    // Search 
    const [searchText, setSearchText] = useState('')

    const handleAddBrand = function (value = true) {
        setCreateBrand(value)
        setAddBrandButton(value)
    }



    const handleViewBrand = (id) => {
        getBrand(id)
        setCreateBrand(false)
        setAddBrandButton(false)
    }

    const handlePaginationChange = (e, { activePage }) => {
        SetActivePage(activePage)
        setStartIndex((activePage - 1) * 10 + 1)
        setEndIndex((activePage - 1) * 10 + 10)

    }

    useEffect(() => {
        getBrands()

    }, [])

    useEffect(() => {

        let totalcount = brands.length;
        let totalPages = Math.ceil(totalcount / 10);
        let ellipsis = totalPages > 10 ? undefined : null;
        // let activePage = 1
        setEllipsisItem(ellipsis)
        setTotalPages(totalPages)
        setSearchResult(brands)

    }, [brands])

    useEffect(()=>{
        if(searchText)
        {
            const re = new RegExp(_.escapeRegExp(searchText), 'i')
            const searchResult1 = brands.filter(result => re.test(result.brandName))
            setSearchResult(searchResult1)
        }
       
    },[searchText])

    const handleSearchChange = (e,data) => {
        setSearchText(data.value)
      
    }

    const handleSelectSearchedRow = (id) => {
        setSearchResult([])
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
                        {
                            searchText && 
                           searchResult.filter((x, i) => i >= startIndex && i <= endIndex)
                          .map(x => (<TableRow  onClick={()=>{ handleSelectSearchedRow(x.id)}} key={'brand-' + x.id}><TableCell >{x.id}</TableCell><TableCell >{x.brandName}</TableCell><TableCell >{x.status ? 'Enable' : 'Disable'}</TableCell></TableRow>))}
                        
                        {!searchText && brands.filter((x, i) => i >= startIndex && i <= endIndex)
                            .map(x => (<TableRow key={'brand-' + x.id}><TableCell >{x.id}</TableCell><TableCell >{x.brandName}</TableCell><TableCell >{x.status ? 'Enable' : 'Disable'}</TableCell><TableCell><Icon name="edit" onClick={() => { handleViewBrand(x.id) }}></Icon></TableCell></TableRow>))}
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
    brand: state.brand.brand
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getBrands: () => dispatch({ type: GET_BRAND_LIST }),
    getBrand: (id) => dispatch({ type: GET_BRAND_DETAILS, payload: { id } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Brand);