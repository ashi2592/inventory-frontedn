
import React, { useEffect, useState } from "react";
import { Button, Grid, Header, Icon, Input, Label, Search, Segment, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import TableHeader from "../../layout/TableHeader";
import AddSize from "./addSize";
import SizeDetails from "./sizeDetails";
import PropTypes from 'prop-types';


// bring connect from react-redux, it's the bridge for connecting component to redux
import { connect } from 'react-redux'

import PaginationCompact from "../../layout/pagination";
import _ from "lodash";
import { GET_SIZE_DETAILS, GET_SIZE_LIST } from "../../redux/actions";


const SizeFunction = ({ getSizes, getSize, sizes, size,pagination,error }) => {

    const [createSize, setCreateSize] = useState(false)
    const [addSizeButton, setAddSizeButton] = useState(false)

    // Pagination
    const [ellipsisItem, setEllipsisItem] = useState(null);
    const [activePage, SetActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Search 
    const [searchText, setSearchText] = useState('')

    const handleAddSize = function (value = true) {
        setCreateSize(value)
        setAddSizeButton(value)
    }



    const handleViewSize = (id) => {
        getSize(id)
        setCreateSize(false)
        setAddSizeButton(false)
    }

    const handlePaginationChange = (e, { activePage }) => {
        getSizes(activePage,10,searchText)

    }
    
    useEffect(() => {
        getSizes(1,10,searchText)

    }, [])

    useEffect(() => {
        let ellipsis = pagination.totalPages > 10 ? undefined : null;
        // let activePage = 1
        setEllipsisItem(ellipsis)
        setTotalPages(pagination.totalPages)
        SetActivePage(pagination.currentPage)

    }, [sizes,pagination])

    useEffect(()=>{
        getSizes(1,10,searchText)
    },[searchText])

    const handleSearchChange = (e,data) => {
        setSearchText(data.value)
      
    }

    const handleSelectSearchedRow = (id) => {
            setSearchText('')
        handleViewSize(id)
    }

    return (<div>
        <Header>Sizes</Header>

        <Segment textAlign="right">
            <Button active={addSizeButton} onClick={handleAddSize}><Icon name="plus"></Icon> Add Size</Button>
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
                       
                        {sizes.map(x => (<TableRow key={'size-' + x._id}><TableCell >{x._id}</TableCell><TableCell >{x.sizeName}</TableCell><TableCell >{x.status ? 'Enable' : 'Disable'}</TableCell><TableCell><Icon name="edit" onClick={() => { handleViewSize(x._id) }}></Icon></TableCell></TableRow>))}
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
                {createSize ? <AddSize handleAddSize={handleAddSize}></AddSize> : Object.values(size).length ? <SizeDetails handleAddSize={handleAddSize}></SizeDetails> : <div></div>}

            </Grid.Column>
        </Grid>

    </div>)

}

SizeFunction.propTypes = {
    loading: PropTypes.bool,
    sizes: PropTypes.array,
    size: PropTypes.object,
    getSizes: PropTypes.func.isRequired,
    getSize: PropTypes.func.isRequired
}



const mapStateToProps = (state) => ({
    sizes: state.sizes.sizes,
    size: state.sizes.size,
    pagination: state.sizes.pagination,
    error: state.sizes.error,

    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getSizes: (page,count,searchText) => dispatch({ type: GET_SIZE_LIST, payload:{page,count,searchText} }),
    getSize: (id) => dispatch({ type: GET_SIZE_DETAILS, payload: { id } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(SizeFunction);