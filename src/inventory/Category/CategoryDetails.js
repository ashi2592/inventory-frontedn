import React, { useEffect } from "react";
import { Button, Checkbox, Icon, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { DELETE_CATEGORY, UPDATE_CATEGORY } from "../../redux/actions";

const CustomerDetails = ({ category, handleAddCategory, deleteCategory,updateCategory }) => {

    useEffect(() => {
        handleAddCategory(false)
    },[])

      
    const handleDeleteCategory = (id) =>{
        deleteCategory(id)
    }

    const handleUpdateFunction = (id,key,value) =>{
        updateCategory(id,{...category, [key]:value})
    }



    return (
        <div >
            <Table>
                <Table.Header>
                    <Table.Row>
                    
                          <Table.HeaderCell>{category.categoryName}</Table.HeaderCell>
                         <Table.HeaderCell textAlign="right"> <Button color='red' onClick={()=>{ handleDeleteCategory(category.id)}}> <Icon name="delete"></Icon> Delete</Button></Table.HeaderCell> 
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        Category ID
                    </Table.Cell>
                    <Table.Cell>
                        {category.id}
                    </Table.Cell>
                   
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        Category Name
                    </Table.Cell>
                    <Table.Cell>
                        {category.categoryName}
                    </Table.Cell>
                    <Table.Cell>
                        <Icon name="edit" onClick={{}}></Icon>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        Category Status
                    </Table.Cell>
                    <Table.Cell>
                    <Checkbox
                    toggle
                    checked={category.status}
                    label='is Active'
                    onChange={() => handleUpdateFunction(category.id, 'status',!category.status)}
                />
                    </Table.Cell>
                </Table.Row>
                </Table.Body>
               
            </Table>
        </div>
    )
}

CustomerDetails.propTypes ={
    deleteCategory: PropTypes.func.isRequired,
    updateCategory: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    category: state.category.category
})
const mapDispatchToProps = (dispatch) => ({
    deleteCategory: (id) => dispatch({type: DELETE_CATEGORY, payload: id}),
    updateCategory: (id,data) => dispatch({type: UPDATE_CATEGORY,payload:{id,data}})
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetails);