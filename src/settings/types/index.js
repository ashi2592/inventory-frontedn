
import React, { useEffect, useState } from "react";
import { Button, Grid, Header, Icon, Input, Label, Search, Segment, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import TableHeader from "../../layout/TableHeader";
import AddType from "./addType";
import TypeDetails from "./typeDetails";
import PropTypes from 'prop-types';


// bring connect from react-redux, it's the bridge for connecting component to redux
import { connect } from 'react-redux'
import { GET_TYPE_LIST, GET_TYPE_DETAILS } from "../../redux/actions";

import PaginationCompact from "../../layout/pagination";
import _ from "lodash";


const Types = ({ getTypes, getType, types, type }) => {

    const [createtype, setCreatetype] = useState(false)
    const [addtypeButton, setAddtypeButton] = useState(false)

    // Pagination
    const [ellipsisItem, setEllipsisItem] = useState(null);
    const [activePage, SetActivePage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [searchResult, setSearchResult] = useState([])

    // Search 
    const [searchText, setSearchText] = useState('')

    const handleAddType = function (value = true) {
        setCreatetype(value)
        setAddtypeButton(value)
    }



    const handleViewType = (id) => {
        getType(id)
        setCreatetype(false)
        setAddtypeButton(false)
    }

    const handlePaginationChange = (e, { activePage }) => {
        SetActivePage(activePage)
        setStartIndex((activePage - 1) * 10 + 1)
        setEndIndex((activePage - 1) * 10 + 10)

    }
    
    useEffect(() => {
        getTypes()

    }, [])

    useEffect(() => {

        let totalcount = types.length;
        let totalPages = Math.ceil(totalcount / 10);
        let ellipsis = totalPages > 10 ? undefined : null;
        // let activePage = 1
        setEllipsisItem(ellipsis)
        setTotalPages(totalPages)
        setSearchResult(types)

    }, [types])

    useEffect(()=>{
        if(searchText)
        {
            const re = new RegExp(_.escapeRegExp(searchText), 'i')
            const searchResult1 = types.filter(result => re.test(result.type))
            setSearchResult(searchResult1)
        }
       
    },[searchText])

    const handleSearchChange = (e,data) => {
        setSearchText(data.value)
      
    }

    const handleSelectSearchedRow = (id) => {
        setSearchResult([])
        setSearchText('')
        handleViewType(id)
    }

    return (<div>
        <Header>types</Header>

        <Segment textAlign="right">
            <Button active={addtypeButton} onClick={handleAddType}><Icon name="plus"></Icon> Add type</Button>
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
                          .map(x => (<TableRow  onClick={()=>{ handleSelectSearchedRow(x.id)}} key={'type-' + x.id}><TableCell >{x.id}</TableCell><TableCell >{x.type}</TableCell><TableCell >{x.status ? 'Enable' : 'Disable'}</TableCell></TableRow>))}
                        
                        {!searchText && types.filter((x, i) => i >= startIndex && i <= endIndex)
                            .map(x => (<TableRow key={'type-' + x.id}><TableCell >{x.id}</TableCell><TableCell >{x.type}</TableCell><TableCell >{x.status ? 'Enable' : 'Disable'}</TableCell><TableCell><Icon name="edit" onClick={() => { handleViewType(x.id) }}></Icon></TableCell></TableRow>))}
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
                {createtype ? <AddType handleAddType={handleAddType}></AddType> : Object.values(type).length ? <TypeDetails handleAddType={handleAddType}></TypeDetails> : <div></div>}

            </Grid.Column>
        </Grid>

    </div>)

}

Types.propTypes = {
    loading: PropTypes.bool,
    types: PropTypes.array,
    type: PropTypes.object,
    getTypes: PropTypes.func.isRequired,
    getType: PropTypes.func.isRequired
}



const mapStateToProps = (state) => ({
    types: state.types.types,
    type: state.types.type
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getTypes: () => dispatch({ type: GET_TYPE_LIST }),
    getType: (id) => dispatch({ type: GET_TYPE_DETAILS, payload: { id } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Types);